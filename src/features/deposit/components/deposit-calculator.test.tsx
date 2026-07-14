import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DepositCalculator } from "./deposit-calculator";

describe("DepositCalculator", () => {
  it("renders accessible defaults and all required outputs", () => {
    render(<DepositCalculator />);
    expect(screen.getByLabelText("예치 금액 *")).toHaveValue("10000000");
    expect(screen.getByLabelText("이자 방식 *")).toHaveValue("simple");
    expect(screen.getByLabelText("일반과세 15.4%")).toBeChecked();
    const result = screen.getByRole("region", { name: "예상 세후 만기액" });
    for (const label of [
      "원금",
      "세전 이자",
      "예상 세금",
      "세후 이자",
      "세전 만기액",
      "세후 만기액",
      "실효 수익",
    ])
      expect(within(result).getByText(label)).toBeVisible();
  });

  it("updates compound and tax-free results with a polite announcement", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await user.selectOptions(screen.getByLabelText("이자 방식 *"), "compound");
    await user.click(screen.getByLabelText("비과세"));
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByText(/월복리 · 1년/)).toBeVisible();
    expect(screen.getByText(/적용 간이 세율 0%/)).toBeVisible();
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("supports custom tax", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    await user.click(screen.getByLabelText("사용자 지정"));
    await user.type(screen.getByLabelText("사용자 지정 간이 세율 *"), "10");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByText(/적용 간이 세율 10%/)).toBeVisible();
  });

  it("associates errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<DepositCalculator />);
    const amount = screen.getByLabelText("예치 금액 *");
    await user.clear(amount);
    await user.type(amount, "0");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(amount).toHaveFocus());
    expect(amount).toHaveAccessibleDescription(/1만원 이상/);
  });
});

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SavingsCalculator } from "./savings-calculator";

describe("SavingsCalculator", () => {
  async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("정기 납입액 *"), "100000");
    await user.type(screen.getByLabelText("저축 기간 *"), "1");
    await user.type(screen.getByLabelText("연 이자율 *"), "3.5");
  }
  it("renders empty numeric inputs and no schedule", () => {
    render(<SavingsCalculator />);
    expect(screen.getByLabelText("정기 납입액 *")).toHaveValue("");
    expect(screen.getByLabelText("이자 방식 *")).toHaveValue("simple");
    expect(screen.getByLabelText("일반과세 15.4%")).toBeChecked();
    expect(
      screen.getByRole("heading", { name: "예상 세후 만기액" }),
    ).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("updates compound, beginning, and tax-free results", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    await user.selectOptions(screen.getByLabelText("이자 방식 *"), "compound");
    await user.click(screen.getByLabelText("기간 초"));
    await user.click(screen.getByLabelText("비과세"));
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    const result = screen.getByRole("region", { name: "예상 세후 만기액" });
    expect(within(result).getByText(/월복리 · 기간 초 납입/)).toBeVisible();
    expect(within(result).getByText(/적용 간이 세율 0%/)).toBeVisible();
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("supports a custom tax rate", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    await fillRequired(user);
    await user.click(screen.getByLabelText("사용자 지정"));
    const rate = screen.getByLabelText("사용자 지정 간이 세율 *");
    await user.type(rate, "10");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByText(/적용 간이 세율 10%/)).toBeVisible();
  });

  it("associates errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<SavingsCalculator />);
    const deposit = screen.getByLabelText("정기 납입액 *");
    await user.clear(deposit);
    await user.type(deposit, "0");
    await user.click(
      screen.getByRole("button", { name: "만기 결과 계산하기" }),
    );
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(deposit).toHaveFocus());
    expect(deposit).toHaveAccessibleDescription(/1천원 이상/);
  });
});

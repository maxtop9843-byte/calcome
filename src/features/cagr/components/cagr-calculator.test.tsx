import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CagrCalculator } from "./cagr-calculator";

describe("CagrCalculator", () => {
  it("renders accessible defaults and required outputs", () => {
    render(<CagrCalculator />);
    expect(screen.getByLabelText("시작값 *")).toHaveValue("10000000");
    expect(screen.getByLabelText("기간 단위 *")).toHaveValue("years");
    const result = screen.getByRole("region", {
      name: "연평균 복합성장률(CAGR)",
    });
    expect(within(result).getByText("총수익률")).toBeVisible();
    expect(within(result).getByText("절대 손익")).toBeVisible();
    expect(within(result).getByText("연환산 성장 요약")).toBeVisible();
  });

  it("renders a loss summary and polite announcement", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    const finalValue = screen.getByLabelText("종료값 *");
    await user.clear(finalValue);
    await user.type(finalValue, "8100000");
    const period = screen.getByLabelText("투자 기간 *");
    await user.clear(period);
    await user.type(period, "2");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByText(/연평균 감소/)).toBeVisible();
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("associates errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    const initial = screen.getByLabelText("시작값 *");
    await user.clear(initial);
    await user.type(initial, "0");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(initial).toHaveFocus());
    expect(initial).toHaveAccessibleDescription(/0보다 크고/);
  });
});

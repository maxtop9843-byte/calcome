import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoanCalculator } from "./loan-calculator";

describe("LoanCalculator", () => {
  it("renders defaults, results, and the amortization schedule", () => {
    render(<LoanCalculator />);
    expect(screen.getByLabelText("대출 금액 *")).toHaveValue("100000000");
    expect(screen.getByRole("heading", { name: "월 납부액" })).toBeVisible();
    expect(
      screen.getByRole("table", { name: "월별 대출 원금과 이자 상환 일정" }),
    ).toBeVisible();
    expect(screen.getByText("실질 상환 요약")).toBeVisible();
  });
  it("calculates equal principal and labels the first and last payments", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await user.selectOptions(
      screen.getByLabelText("상환 방식 *"),
      "equal-principal",
    );
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    expect(screen.getByRole("heading", { name: "첫 달 납부액" })).toBeVisible();
    expect(screen.getByText("마지막 달 납부액")).toBeVisible();
  });
  it("hides the schedule for bullet repayment and explains maturity principal", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    await user.selectOptions(screen.getByLabelText("상환 방식 *"), "bullet");
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    expect(
      screen.getByRole("heading", { name: "매월 이자 납부액" }),
    ).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText(/마지막 달에 원금 전액/)).toBeVisible();
  });
  it("announces errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<LoanCalculator />);
    const amount = screen.getByLabelText("대출 금액 *");
    await user.clear(amount);
    await user.type(amount, "0");
    await user.click(
      screen.getByRole("button", { name: "상환 결과 계산하기" }),
    );
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(amount).toHaveFocus());
    expect(amount).toHaveAccessibleDescription(/1만원 이상/);
  });
});

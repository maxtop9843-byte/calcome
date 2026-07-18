import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SalaryRaiseCalculator } from "./salary-raise-calculator";
Element.prototype.scrollIntoView = vi.fn();
describe("SalaryRaiseCalculator", () => {
  it("starts empty, calculates, and resets", () => {
    render(<SalaryRaiseCalculator locale="ko" />);
    const salary = screen.getByLabelText("현재 급여");
    expect(salary).toHaveValue("");
    expect(salary).toHaveClass("text-base");
    fireEvent.change(salary, { target: { value: "50000000" } });
    fireEvent.change(screen.getByLabelText("인상률"), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "인상 급여 계산하기" }));
    expect(screen.getByText("현재 연봉")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(salary).toHaveValue("");
    expect(screen.getByRole("radio", { name: /연봉/ })).toBeChecked();
  });
  it("renders localized validation errors", () => {
    render(<SalaryRaiseCalculator locale="en" />);
    fireEvent.change(screen.getByLabelText("Raise rate"), {
      target: { value: "." },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate raised salary" }),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Check the highlighted values.",
    );
  });
});

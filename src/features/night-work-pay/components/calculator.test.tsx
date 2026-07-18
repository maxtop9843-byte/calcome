import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NightWorkPayCalculator } from "./calculator";

Element.prototype.scrollIntoView = vi.fn();

describe("NightWorkPayCalculator", () => {
  it("uses a 50% default for five or more employees and resets to it", () => {
    render(<NightWorkPayCalculator locale="en" />);

    const rate = screen.getByLabelText("Night-work premium rate");
    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    expect(rate).toHaveValue("50");

    fireEvent.click(screen.getByRole("radio", { name: /fewer than five/i }));
    expect(rate).toHaveValue("0");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByRole("radio", { name: /five or more/i })).toBeChecked();
    expect(rate).toHaveValue("50");
  });

  it("shows the payroll-period and overlap guidance in English", () => {
    render(<NightWorkPayCalculator locale="en" />);
    expect(
      screen.getByLabelText(/Total night-work hours in the payroll period/),
    ).toBeVisible();

    fireEvent.change(screen.getByLabelText("Ordinary hourly wage"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText(/Total night-work hours/), {
      target: { value: "7.5" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calculate night-work pay" }),
    );

    expect(
      screen.getByText(/not automatically included in this result/i),
    ).toBeVisible();
  });

  it("shows the Korean under-five legal notice", () => {
    render(<NightWorkPayCalculator locale="ko" />);
    fireEvent.click(screen.getByRole("radio", { name: "상시 5인 미만" }));
    fireEvent.change(screen.getByLabelText("통상 시급"), {
      target: { value: "12000" },
    });
    fireEvent.change(screen.getByLabelText(/급여 정산기간의 총 야간근로시간/), {
      target: { value: "1.5" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "야간근로수당 계산하기" }),
    );

    expect(screen.getByText(/근로기준법 제56조/)).toBeVisible();
  });
});

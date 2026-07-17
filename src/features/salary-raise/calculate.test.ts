import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateSalaryRaise } from "./calculate";
describe("calculateSalaryRaise", () => {
  it("calculates an annual raise without premature rounding", () => {
    const result = calculateSalaryRaise({
      salary: new Decimal(50_000_000),
      raiseRate: new Decimal(5),
      period: "annual",
    });
    expect(result.newAnnualSalary.toNumber()).toBe(52_500_000);
    expect(result.annualIncrease.toNumber()).toBe(2_500_000);
    expect(result.monthlyIncrease.mul(12).eq(result.annualIncrease)).toBe(true);
  });
  it("annualizes monthly salary consistently", () => {
    expect(
      calculateSalaryRaise({
        salary: new Decimal(4_000_000),
        raiseRate: new Decimal("3.5"),
        period: "monthly",
      }).newMonthlySalary.toNumber(),
    ).toBe(4_140_000);
  });
});

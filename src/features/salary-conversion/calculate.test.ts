import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateSalaryConversion } from "./calculate";

describe("calculateSalaryConversion", () => {
  it("converts annual salary without premature rounding", () => {
    const result = calculateSalaryConversion({
      salary: new Decimal(50_000_000),
      period: "annual",
    });
    expect(result.monthlySalary.mul(12).eq(result.annualSalary)).toBe(true);
    expect(result.weeklySalary.mul(52).eq(result.annualSalary)).toBe(true);
  });
  it("annualizes monthly salary", () => {
    expect(
      calculateSalaryConversion({
        salary: new Decimal(4_000_000),
        period: "monthly",
      }).annualSalary.toNumber(),
    ).toBe(48_000_000);
  });
});

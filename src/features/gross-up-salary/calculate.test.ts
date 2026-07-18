import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateGrossUpSalary } from "./calculate";

describe("calculateGrossUpSalary", () => {
  it("grosses up an annual target without premature rounding", () => {
    const result = calculateGrossUpSalary({
      targetNetSalary: new Decimal(45_000_000),
      deductionRate: new Decimal(10),
      period: "annual",
    });
    expect(result.requiredAnnualGross.toNumber()).toBe(50_000_000);
    expect(result.annualDeductions.toNumber()).toBe(5_000_000);
    expect(
      result.requiredAnnualGross.minus(result.annualDeductions).eq(45_000_000),
    ).toBe(true);
  });

  it("annualizes a monthly target consistently", () => {
    const result = calculateGrossUpSalary({
      targetNetSalary: new Decimal(3_000_000),
      deductionRate: new Decimal(20),
      period: "monthly",
    });
    expect(result.requiredMonthlyGross.toNumber()).toBe(3_750_000);
    expect(result.targetAnnualNet.toNumber()).toBe(36_000_000);
  });
});

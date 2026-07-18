import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateLoanRefinancingSavings } from "./calculate";

describe("calculateLoanRefinancingSavings", () => {
  it("calculates interest, net savings, and break-even without premature rounding", () => {
    const result = calculateLoanRefinancingSavings({
      remainingBalance: new Decimal(300_000_000),
      currentAnnualRate: new Decimal(4.8),
      newAnnualRate: new Decimal(3.7),
      remainingMonths: 240,
      refinancingCosts: new Decimal(2_000_000),
    });
    expect(result.currentMonthlyPayment.toDecimalPlaces(2).toString()).toBe(
      "1946872.41",
    );
    expect(result.newMonthlyPayment.toDecimalPlaces(2).toString()).toBe(
      "1770868.45",
    );
    expect(result.monthlySavings.gt(0)).toBe(true);
    expect(
      result.netSavings.eq(result.grossInterestSavings.minus(2_000_000)),
    ).toBe(true);
    expect(result.breakEvenMonths?.toDecimalPlaces(2).toString()).toBe("11.36");
  });
  it("handles a zero-percent new loan", () => {
    const result = calculateLoanRefinancingSavings({
      remainingBalance: new Decimal(12_000_000),
      currentAnnualRate: new Decimal(5),
      newAnnualRate: new Decimal(0),
      remainingMonths: 12,
      refinancingCosts: new Decimal(0),
    });
    expect(result.newMonthlyPayment.toString()).toBe("1000000");
    expect(result.newTotalInterest.toString()).toBe("0");
  });
  it("reports no break-even when monthly payments do not decrease", () => {
    const result = calculateLoanRefinancingSavings({
      remainingBalance: new Decimal(100_000_000),
      currentAnnualRate: new Decimal(3),
      newAnnualRate: new Decimal(4),
      remainingMonths: 120,
      refinancingCosts: new Decimal(1_000_000),
    });
    expect(result.monthlySavings.lt(0)).toBe(true);
    expect(result.netSavings.lt(0)).toBe(true);
    expect(result.breakEvenMonths).toBeNull();
  });
});

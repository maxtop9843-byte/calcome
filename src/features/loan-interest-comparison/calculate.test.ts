import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateLoanInterestComparison } from "./calculate";

describe("calculateLoanInterestComparison", () => {
  it("compares amortizing loans and identifies the lower-interest option", () => {
    const result = calculateLoanInterestComparison({
      principal: new Decimal(300_000_000),
      annualRateA: new Decimal(4.5),
      annualRateB: new Decimal(3.8),
      termMonths: 360,
    });

    expect(result.lowerCostOption).toBe("B");
    expect(result.optionA.monthlyPayment.toNumber()).toBeGreaterThan(
      result.optionB.monthlyPayment.toNumber(),
    );
    expect(result.interestSavings.toNumber()).toBeGreaterThan(0);
  });

  it("handles zero-interest loans without division by zero", () => {
    const result = calculateLoanInterestComparison({
      principal: new Decimal(12_000_000),
      annualRateA: new Decimal(0),
      annualRateB: new Decimal(0),
      termMonths: 12,
    });

    expect(result.optionA.monthlyPayment.toNumber()).toBe(1_000_000);
    expect(result.optionA.totalInterest.toNumber()).toBe(0);
    expect(result.lowerCostOption).toBe("same");
  });
});

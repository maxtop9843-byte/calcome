import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateCreditLoanInterest } from "./calculate";

describe("calculateCreditLoanInterest", () => {
  it("calculates interest-only credit loan costs without premature rounding", () => {
    const result = calculateCreditLoanInterest({
      loanAmount: new Decimal(50_000_000),
      annualRate: new Decimal(6),
      termMonths: 24,
      monthlyFees: new Decimal(10_000),
    });
    expect(result.monthlyInterest.toString()).toBe("250000");
    expect(result.monthlyCost.toString()).toBe("260000");
    expect(result.totalInterest.toString()).toBe("6000000");
    expect(result.totalFees.toString()).toBe("240000");
    expect(result.totalCost.toString()).toBe("6240000");
  });

  it("handles a zero-percent loan", () => {
    const result = calculateCreditLoanInterest({
      loanAmount: new Decimal(10_000_000),
      annualRate: new Decimal(0),
      termMonths: 12,
      monthlyFees: new Decimal(0),
    });
    expect(result.monthlyInterest.toString()).toBe("0");
    expect(result.totalCost.toString()).toBe("0");
  });
});

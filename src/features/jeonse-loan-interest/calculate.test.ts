import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateJeonseLoanInterest } from "./calculate";

describe("calculateJeonseLoanInterest", () => {
  it("calculates interest-only jeonse loan costs without premature rounding", () => {
    const result = calculateJeonseLoanInterest({
      deposit: new Decimal(500_000_000),
      ownFunds: new Decimal(200_000_000),
      annualRate: new Decimal(4.2),
      termYears: 2,
      monthlyFees: new Decimal(50_000),
    });
    expect(result.loanAmount.toString()).toBe("300000000");
    expect(result.monthlyInterest.toString()).toBe("1050000");
    expect(result.monthlyCost.toString()).toBe("1100000");
    expect(result.totalInterest.toString()).toBe("25200000");
    expect(result.loanRatio.toString()).toBe("60");
  });

  it("handles a zero-percent loan", () => {
    const result = calculateJeonseLoanInterest({
      deposit: new Decimal(100_000_000),
      ownFunds: new Decimal(0),
      annualRate: new Decimal(0),
      termYears: 2,
      monthlyFees: new Decimal(0),
    });
    expect(result.monthlyInterest.toString()).toBe("0");
    expect(result.totalInterest.toString()).toBe("0");
  });
});

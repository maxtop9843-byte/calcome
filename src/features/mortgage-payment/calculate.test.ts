import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateMortgagePayment } from "./calculate";

describe("calculateMortgagePayment", () => {
  it("calculates a fully amortizing mortgage without premature rounding", () => {
    const result = calculateMortgagePayment({
      homePrice: new Decimal(500_000_000),
      downPayment: new Decimal(100_000_000),
      annualRate: new Decimal(5),
      termYears: 30,
      monthlyCosts: new Decimal(300_000),
    });
    expect(result.loanAmount.toString()).toBe("400000000");
    expect(
      result.monthlyPrincipalAndInterest.toDecimalPlaces(2).toString(),
    ).toBe("2147286.49");
    expect(
      result.estimatedMonthlyPayment
        .minus(result.monthlyPrincipalAndInterest)
        .toString(),
    ).toBe("300000");
    expect(
      result.totalInterest.eq(result.totalLoanPayments.minus(400_000_000)),
    ).toBe(true);
    expect(result.downPaymentRatio.toString()).toBe("20");
  });

  it("handles a zero-percent mortgage", () => {
    const result = calculateMortgagePayment({
      homePrice: new Decimal(120_000_000),
      downPayment: new Decimal(0),
      annualRate: new Decimal(0),
      termYears: 10,
      monthlyCosts: new Decimal(0),
    });
    expect(result.monthlyPrincipalAndInterest.toString()).toBe("1000000");
    expect(result.totalInterest.toString()).toBe("0");
  });
});

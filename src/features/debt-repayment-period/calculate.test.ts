import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDebtRepaymentPeriod } from "./calculate";

describe("calculateDebtRepaymentPeriod", () => {
  it("calculates the payoff period and final partial payment", () => {
    const result = calculateDebtRepaymentPeriod({
      balance: new Decimal(10_000_000),
      annualInterestRate: new Decimal(6),
      monthlyPayment: new Decimal(500_000),
    });
    expect(result?.payoffMonths).toBe(22);
    expect(result?.totalRepayment.toDecimalPlaces(0).toNumber()).toBe(
      10_562_506,
    );
    expect(result?.totalInterest.toDecimalPlaces(0).toNumber()).toBe(562_506);
    expect(result?.finalPayment.lt(500_000)).toBe(true);
  });

  it("supports zero interest and identifies a payment that cannot reduce debt", () => {
    expect(
      calculateDebtRepaymentPeriod({
        balance: new Decimal(1_000_000),
        annualInterestRate: new Decimal(0),
        monthlyPayment: new Decimal(300_000),
      })?.payoffMonths,
    ).toBe(4);
    expect(
      calculateDebtRepaymentPeriod({
        balance: new Decimal(10_000_000),
        annualInterestRate: new Decimal(12),
        monthlyPayment: new Decimal(100_000),
      }),
    ).toBeNull();
  });
});

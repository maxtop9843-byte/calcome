import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateLoanAffordability } from "./calculate";

describe("calculateLoanAffordability", () => {
  it("converts the available debt-service budget into an amortizing principal", () => {
    const result = calculateLoanAffordability({
      annualIncome: new Decimal(60_000_000),
      otherMonthlyDebt: new Decimal(500_000),
      debtServiceLimit: new Decimal(40),
      annualInterestRate: new Decimal(4.5),
      termYears: new Decimal(30),
    });
    expect(result.maximumMonthlyDebt.toNumber()).toBe(2_000_000);
    expect(result.availableMonthlyPayment.toNumber()).toBe(1_500_000);
    expect(result.maximumLoan.toDecimalPlaces(0).toNumber()).toBe(296_041_739);
    expect(result.totalInterest.toDecimalPlaces(0).toNumber()).toBe(
      243_958_261,
    );
  });

  it("supports zero interest and never returns a negative loan", () => {
    expect(
      calculateLoanAffordability({
        annualIncome: new Decimal(48_000_000),
        otherMonthlyDebt: new Decimal(0),
        debtServiceLimit: new Decimal(30),
        annualInterestRate: new Decimal(0),
        termYears: new Decimal(10),
      }).maximumLoan.toNumber(),
    ).toBe(144_000_000);
    expect(
      calculateLoanAffordability({
        annualIncome: new Decimal(30_000_000),
        otherMonthlyDebt: new Decimal(2_000_000),
        debtServiceLimit: new Decimal(40),
        annualInterestRate: new Decimal(5),
        termYears: new Decimal(20),
      }).maximumLoan.toNumber(),
    ).toBe(0);
  });
});

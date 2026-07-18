import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDti } from "./calculate";

describe("calculateDti", () => {
  it("combines an amortizing mortgage with other monthly debt", () => {
    const result = calculateDti({
      annualIncome: new Decimal(60_000_000),
      mortgagePrincipal: new Decimal(300_000_000),
      annualInterestRate: new Decimal(4.5),
      termYears: new Decimal(30),
      otherMonthlyDebt: new Decimal(500_000),
    });
    expect(result.mortgageMonthlyPayment.toDecimalPlaces(0).toNumber()).toBe(
      1_520_056,
    );
    expect(result.totalMonthlyDebt.toDecimalPlaces(0).toNumber()).toBe(
      2_020_056,
    );
    expect(result.dtiRate.toDecimalPlaces(2).toNumber()).toBe(40.4);
  });

  it("supports a zero-interest mortgage", () => {
    const result = calculateDti({
      annualIncome: new Decimal(120_000_000),
      mortgagePrincipal: new Decimal(120_000_000),
      annualInterestRate: new Decimal(0),
      termYears: new Decimal(10),
      otherMonthlyDebt: new Decimal(0),
    });
    expect(result.mortgageMonthlyPayment.toNumber()).toBe(1_000_000);
    expect(result.dtiRate.toNumber()).toBe(10);
  });
});

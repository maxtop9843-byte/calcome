import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateCompoundInterest } from "./calculate";
import type { CompoundInterestInput } from "./types";

const baseInput: CompoundInterestInput = {
  initialPrincipal: "1000",
  recurringContribution: "0",
  contributionFrequency: "yearly",
  durationYears: 2,
  annualInterestRate: "5",
  compoundingFrequency: "yearly",
  contributionTiming: "end",
  inflationRate: null,
  taxRate: null,
};

function expectClose(actual: string, expected: Decimal.Value, places = 10) {
  expect(new Decimal(actual).toDecimalPlaces(places).toString()).toBe(
    new Decimal(expected).toDecimalPlaces(places).toString(),
  );
}

describe("calculateCompoundInterest", () => {
  it("compounds an initial principal and produces yearly records", () => {
    const result = calculateCompoundInterest(baseInput);

    expectClose(result.grossFinalBalance, "1102.5");
    expectClose(result.grossInterest, "102.5");
    expect(result.yearlyData).toHaveLength(2);
    expectClose(result.yearlyData[0].grossBalance, "1050");
    expectClose(result.yearlyData[1].openingBalance, "1050");
  });

  it("uses the effective contribution-period rate for recurring deposits", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      initialPrincipal: "0",
      recurringContribution: "250",
      contributionFrequency: "monthly",
      durationYears: 8,
      annualInterestRate: "3.75",
      compoundingFrequency: "monthly",
    });

    expectClose(result.grossFinalBalance, "27938.2019248499", 8);
    expectClose(result.totalContributedPrincipal, "24000");
  });

  it("gives beginning-of-period deposits one additional growth period", () => {
    const ending = calculateCompoundInterest({
      ...baseInput,
      initialPrincipal: "0",
      recurringContribution: "100",
      durationYears: 10,
    });
    const beginning = calculateCompoundInterest({
      ...baseInput,
      initialPrincipal: "0",
      recurringContribution: "100",
      durationYears: 10,
      contributionTiming: "beginning",
    });

    expect(
      new Decimal(beginning.grossFinalBalance).gt(ending.grossFinalBalance),
    ).toBe(true);
    expectClose(
      beginning.grossFinalBalance,
      new Decimal(ending.grossFinalBalance).mul("1.05"),
    );
  });

  it("handles a zero rate without dividing by zero", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      recurringContribution: "100",
      durationYears: 3,
      annualInterestRate: "0",
    });

    expectClose(result.grossFinalBalance, "1300");
    expectClose(result.grossInterest, "0");
  });

  it("applies tax once to positive interest at the horizon, then inflation", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      durationYears: 1,
      annualInterestRate: "10",
      taxRate: "20",
      inflationRate: "8",
    });

    expectClose(result.grossFinalBalance, "1100");
    expectClose(result.estimatedTax, "20");
    expectClose(result.estimatedFinalBalance, "1080");
    expectClose(result.inflationAdjustedValue, "1000");
    expect(result.taxEnabled).toBe(true);
    expect(result.inflationEnabled).toBe(true);
  });

  it("keeps tax at zero when modeled interest is not positive", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      annualInterestRate: "0",
      taxRate: "100",
    });

    expectClose(result.estimatedTax, "0");
    expectClose(result.estimatedFinalBalance, "1000");
  });

  it.each(["yearly", "semiannually", "quarterly", "monthly", "daily"] as const)(
    "supports yearly deposits with %s compounding",
    (compoundingFrequency) => {
      const result = calculateCompoundInterest({
        ...baseInput,
        recurringContribution: "100",
        durationYears: 5,
        compoundingFrequency,
      });

      expect(new Decimal(result.grossFinalBalance).gt("1500")).toBe(true);
      expect(result.yearlyData).toHaveLength(5);
      expect(result.yearlyData.at(-1)?.cumulativePrincipal).toBe("1500");
    },
  );

  it("keeps very small positive rates numerically stable", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      initialPrincipal: "0",
      recurringContribution: "100",
      contributionFrequency: "monthly",
      durationYears: 100,
      annualInterestRate: "0.000001",
      compoundingFrequency: "daily",
    });

    expect(new Decimal(result.grossFinalBalance).isFinite()).toBe(true);
    expect(new Decimal(result.grossFinalBalance).gt("120000")).toBe(true);
  });

  it("keeps approved maximum inputs finite and reconciles the terminal row", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      initialPrincipal: "100000000000",
      recurringContribution: "1000000000",
      contributionFrequency: "monthly",
      durationYears: 100,
      annualInterestRate: "100",
      compoundingFrequency: "daily",
      inflationRate: "100",
      taxRate: "100",
    });
    const terminal = result.yearlyData.at(-1)!;

    expect(new Decimal(result.grossFinalBalance).isFinite()).toBe(true);
    expect(terminal.grossBalance).toBe(result.grossFinalBalance);
    expect(terminal.netBalance).toBe(result.estimatedFinalBalance);
    expect(terminal.cumulativePrincipal).toBe(result.totalContributedPrincipal);
  });

  it("treats explicit zero inflation and tax as active no-op assumptions", () => {
    const result = calculateCompoundInterest({
      ...baseInput,
      inflationRate: "0",
      taxRate: "0",
    });

    expect(result.taxEnabled).toBe(true);
    expect(result.inflationEnabled).toBe(true);
    expect(result.estimatedFinalBalance).toBe(result.grossFinalBalance);
    expect(result.inflationAdjustedValue).toBe(result.estimatedFinalBalance);
  });
});

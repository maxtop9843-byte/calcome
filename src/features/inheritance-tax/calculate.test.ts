import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateInheritanceTax } from "./calculate";

describe("calculateInheritanceTax", () => {
  it("calculates the taxable estate, credit, and estate after tax", () => {
    const result = calculateInheritanceTax({
      grossEstate: new Decimal(2_000_000_000),
      debts: new Decimal(200_000_000),
      funeralExpenses: new Decimal(20_000_000),
      deductibleAmount: new Decimal(500_000_000),
      taxRate: new Decimal(40),
      progressiveDeduction: new Decimal(160_000_000),
      filingCreditRate: new Decimal(3),
    });
    expect(result.netEstate.toNumber()).toBe(1_780_000_000);
    expect(result.taxableEstate.toNumber()).toBe(1_280_000_000);
    expect(result.taxBeforeCredit.toNumber()).toBe(352_000_000);
    expect(result.estimatedTax.toNumber()).toBe(341_440_000);
    expect(result.estateAfterTax.toNumber()).toBe(1_438_560_000);
  });
  it("floors the tax base and tax at zero", () => {
    const result = calculateInheritanceTax({
      grossEstate: new Decimal(100),
      debts: new Decimal(20),
      funeralExpenses: new Decimal(10),
      deductibleAmount: new Decimal(100),
      taxRate: new Decimal(50),
      progressiveDeduction: new Decimal(1_000),
      filingCreditRate: new Decimal(3),
    });
    expect(result.taxableEstate.toNumber()).toBe(0);
    expect(result.estimatedTax.toNumber()).toBe(0);
  });
});

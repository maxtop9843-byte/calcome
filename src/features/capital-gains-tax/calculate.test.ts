import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateCapitalGainsTax } from "./calculate";

describe("calculateCapitalGainsTax", () => {
  it("calculates gain, national tax, local tax, and net proceeds", () => {
    const result = calculateCapitalGainsTax({
      salePrice: new Decimal(800_000_000),
      acquisitionPrice: new Decimal(500_000_000),
      deductibleExpenses: new Decimal(20_000_000),
      basicDeduction: new Decimal(2_500_000),
      incomeTaxRate: new Decimal(20),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.grossGain.toNumber()).toBe(280_000_000);
    expect(result.taxableGain.toNumber()).toBe(277_500_000);
    expect(result.incomeTax.toNumber()).toBe(55_500_000);
    expect(result.localIncomeTax.toNumber()).toBe(5_550_000);
    expect(result.totalTax.toNumber()).toBe(61_050_000);
    expect(result.netProceeds.toNumber()).toBe(718_950_000);
    expect(result.afterTaxProfit.toNumber()).toBe(218_950_000);
  });

  it("floors taxable gain and taxes at zero for a loss", () => {
    const result = calculateCapitalGainsTax({
      salePrice: new Decimal(400),
      acquisitionPrice: new Decimal(500),
      deductibleExpenses: new Decimal(10),
      basicDeduction: new Decimal(20),
      incomeTaxRate: new Decimal(40),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.grossGain.toNumber()).toBe(-110);
    expect(result.taxableGain.toNumber()).toBe(0);
    expect(result.totalTax.toNumber()).toBe(0);
    expect(result.effectiveTaxRate.toNumber()).toBe(0);
  });
});

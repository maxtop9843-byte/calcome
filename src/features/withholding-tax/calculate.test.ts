import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateWithholdingTax } from "./calculate";

describe("calculateWithholdingTax", () => {
  it("applies national and local withholding to the taxable payment", () => {
    const result = calculateWithholdingTax({
      grossPayment: new Decimal(5_000_000),
      nonTaxableAmount: new Decimal(500_000),
      nationalTaxRate: new Decimal(8),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.taxablePayment.toNumber()).toBe(4_500_000);
    expect(result.nationalIncomeTax.toNumber()).toBe(360_000);
    expect(result.localIncomeTax.toNumber()).toBe(36_000);
    expect(result.totalWithholding.toNumber()).toBe(396_000);
    expect(result.netPayment.toNumber()).toBe(4_604_000);
    expect(result.effectiveTaxRate.toNumber()).toBe(7.92);
  });

  it("returns zero withholding when the whole payment is non-taxable", () => {
    const result = calculateWithholdingTax({
      grossPayment: new Decimal(1_000_000),
      nonTaxableAmount: new Decimal(1_000_000),
      nationalTaxRate: new Decimal(20),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.taxablePayment.toNumber()).toBe(0);
    expect(result.totalWithholding.toNumber()).toBe(0);
    expect(result.netPayment.toNumber()).toBe(1_000_000);
  });
});

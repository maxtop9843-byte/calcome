import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculatePropertyTax } from "./calculate";
describe("calculatePropertyTax", () => {
  it("calculates the tax base, property tax, and related local taxes", () => {
    const result = calculatePropertyTax({
      assessedValue: new Decimal(600_000_000),
      taxBaseRate: new Decimal(60),
      propertyTaxRate: new Decimal(0.4),
      progressiveDeduction: new Decimal(630_000),
      cityAreaTaxRate: new Decimal(0.14),
    });
    expect(result.taxBase.toNumber()).toBe(360_000_000);
    expect(result.propertyTax.toNumber()).toBe(810_000);
    expect(result.cityAreaTax.toNumber()).toBe(504_000);
    expect(result.localEducationTax.toNumber()).toBe(162_000);
    expect(result.totalTax.toNumber()).toBe(1_476_000);
  });
  it("does not allow the progressive deduction to create negative tax", () => {
    const result = calculatePropertyTax({
      assessedValue: new Decimal(100_000_000),
      taxBaseRate: new Decimal(60),
      propertyTaxRate: new Decimal(0.1),
      progressiveDeduction: new Decimal(100_000),
      cityAreaTaxRate: new Decimal(0),
    });
    expect(result.propertyTax.toNumber()).toBe(0);
    expect(result.totalTax.toNumber()).toBe(0);
  });
});

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateAcquisitionTax } from "./calculate";

describe("calculateAcquisitionTax", () => {
  it("calculates entered tax components and total acquisition cost", () => {
    const result = calculateAcquisitionTax({
      acquisitionPrice: new Decimal(500_000_000),
      acquisitionTaxRate: new Decimal(1),
      localEducationTaxRate: new Decimal(0.1),
      ruralSpecialTaxRate: new Decimal(0.2),
      otherCosts: new Decimal(2_000_000),
    });
    expect(result.acquisitionTax.toNumber()).toBe(5_000_000);
    expect(result.totalTax.toNumber()).toBe(6_500_000);
    expect(result.totalAcquisitionCost.toNumber()).toBe(508_500_000);
    expect(result.effectiveTaxRate.toNumber()).toBe(1.3);
  });

  it("supports zero optional rates and costs", () => {
    const result = calculateAcquisitionTax({
      acquisitionPrice: new Decimal(100_000_000),
      acquisitionTaxRate: new Decimal(2),
      localEducationTaxRate: new Decimal(0),
      ruralSpecialTaxRate: new Decimal(0),
      otherCosts: new Decimal(0),
    });
    expect(result.totalTax.toNumber()).toBe(2_000_000);
    expect(result.totalAcquisitionCost.toNumber()).toBe(102_000_000);
  });
});

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateComprehensiveRealEstateHoldingTax } from "./calculate";

describe("calculateComprehensiveRealEstateHoldingTax", () => {
  it("calculates the tax base, property-tax credit, and special rural tax", () => {
    const result = calculateComprehensiveRealEstateHoldingTax({
      aggregateAssessedValue: new Decimal(1_500_000_000),
      basicDeduction: new Decimal(900_000_000),
      fairMarketValueRate: new Decimal(60),
      taxRate: new Decimal(0.7),
      progressiveDeduction: new Decimal(600_000),
      deductiblePropertyTax: new Decimal(300_000),
    });

    expect(result.amountAfterDeduction.toNumber()).toBe(600_000_000);
    expect(result.taxBase.toNumber()).toBe(360_000_000);
    expect(result.taxBeforePropertyTaxCredit.toNumber()).toBe(1_920_000);
    expect(result.comprehensiveTax.toNumber()).toBe(1_620_000);
    expect(result.specialRuralTax.toNumber()).toBe(324_000);
    expect(result.totalTax.toNumber()).toBe(1_944_000);
  });

  it("does not allow deductions or credits to create negative tax", () => {
    const result = calculateComprehensiveRealEstateHoldingTax({
      aggregateAssessedValue: new Decimal(500_000_000),
      basicDeduction: new Decimal(900_000_000),
      fairMarketValueRate: new Decimal(60),
      taxRate: new Decimal(0.5),
      progressiveDeduction: new Decimal(0),
      deductiblePropertyTax: new Decimal(100_000),
    });

    expect(result.taxBase.toNumber()).toBe(0);
    expect(result.comprehensiveTax.toNumber()).toBe(0);
    expect(result.totalTax.toNumber()).toBe(0);
  });
});

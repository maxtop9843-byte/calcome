import { describe, expect, it } from "vitest";
import {
  validateComprehensiveRealEstateHoldingTax,
  type ComprehensiveRealEstateHoldingTaxValues,
} from "./validation";

const valid: ComprehensiveRealEstateHoldingTaxValues = {
  aggregateAssessedValue: "1,500,000,000",
  basicDeduction: "900,000,000",
  fairMarketValueRate: "60",
  taxRate: "0.7",
  progressiveDeduction: "600,000",
  deductiblePropertyTax: "300,000",
};

describe("validateComprehensiveRealEstateHoldingTax", () => {
  it("parses formatted values", () => {
    const result = validateComprehensiveRealEstateHoldingTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.aggregateAssessedValue.toNumber()).toBe(1_500_000_000);
  });

  it("rejects invalid values", () => {
    const result = validateComprehensiveRealEstateHoldingTax(
      { ...valid, aggregateAssessedValue: "0", taxRate: "101" },
      "en",
    );
    expect(result.errors.aggregateAssessedValue).toBeTruthy();
    expect(result.errors.taxRate).toBeTruthy();
  });
});

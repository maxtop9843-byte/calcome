import { describe, expect, it } from "vitest";
import { validatePropertyTax, type PropertyTaxValues } from "./validation";
const valid: PropertyTaxValues = {
  assessedValue: "600,000,000",
  taxBaseRate: "60",
  propertyTaxRate: "0.4",
  progressiveDeduction: "630,000",
  cityAreaTaxRate: "0.14",
};
describe("validatePropertyTax", () => {
  it("parses formatted values", () => {
    const result = validatePropertyTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.assessedValue.toNumber()).toBe(600_000_000);
  });
  it("rejects invalid values", () => {
    const result = validatePropertyTax(
      { ...valid, assessedValue: "0", propertyTaxRate: "101" },
      "en",
    );
    expect(result.errors.assessedValue).toBeTruthy();
    expect(result.errors.propertyTaxRate).toBeTruthy();
  });
});

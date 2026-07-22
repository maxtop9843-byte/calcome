import { describe, expect, it } from "vitest";
import {
  validateCapitalGainsTax,
  type CapitalGainsTaxValues,
} from "./validation";

const valid: CapitalGainsTaxValues = {
  salePrice: "800,000,000",
  acquisitionPrice: "500,000,000",
  deductibleExpenses: "20,000,000",
  basicDeduction: "2,500,000",
  incomeTaxRate: "20",
  localIncomeTaxRate: "10",
};
describe("validateCapitalGainsTax", () => {
  it("parses grouped money and percentage inputs", () => {
    const result = validateCapitalGainsTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.salePrice.toNumber()).toBe(800_000_000);
    expect(result.data?.localIncomeTaxRate.toNumber()).toBe(10);
  });
  it("accepts zero costs, deductions, and rates", () => {
    const result = validateCapitalGainsTax(
      {
        ...valid,
        deductibleExpenses: "0",
        basicDeduction: "0",
        incomeTaxRate: "0",
        localIncomeTaxRate: "0",
      },
      "en",
    );
    expect(result.data).toBeDefined();
  });
  it("rejects missing, negative, malformed, and excessive values", () => {
    const result = validateCapitalGainsTax(
      {
        ...valid,
        salePrice: "",
        acquisitionPrice: "-1",
        deductibleExpenses: "abc",
        basicDeduction: "10000000000001",
        incomeTaxRate: "101",
        localIncomeTaxRate: "-1",
      },
      "en",
    );
    expect(Object.keys(result.errors)).toHaveLength(6);
    expect(result.data).toBeUndefined();
  });
});

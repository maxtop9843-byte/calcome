import { describe, expect, it } from "vitest";
import {
  validateInheritanceTax,
  type InheritanceTaxValues,
} from "./validation";
const valid: InheritanceTaxValues = {
  grossEstate: "2,000,000,000",
  debts: "200,000,000",
  funeralExpenses: "20,000,000",
  deductibleAmount: "500,000,000",
  taxRate: "40",
  progressiveDeduction: "160,000,000",
  filingCreditRate: "3",
};
describe("validateInheritanceTax", () => {
  it("parses grouped money and rates", () => {
    const result = validateInheritanceTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.grossEstate.toNumber()).toBe(2_000_000_000);
  });
  it("accepts zero optional amounts and rates", () => {
    expect(
      validateInheritanceTax(
        {
          ...valid,
          debts: "0",
          funeralExpenses: "0",
          deductibleAmount: "0",
          taxRate: "0",
          progressiveDeduction: "0",
          filingCreditRate: "0",
        },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects invalid values and deductions above the estate", () => {
    const result = validateInheritanceTax(
      {
        ...valid,
        grossEstate: "100",
        debts: "91",
        funeralExpenses: "10",
        deductibleAmount: "abc",
        taxRate: "101",
        progressiveDeduction: "-1",
        filingCreditRate: "-1",
      },
      "en",
    );
    expect(Object.keys(result.errors)).toHaveLength(5);
    expect(result.data).toBeUndefined();
  });
});

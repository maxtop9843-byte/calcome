import { describe, expect, it } from "vitest";
import { validateGiftTax, type GiftTaxValues } from "./validation";

const valid: GiftTaxValues = {
  giftValue: "500,000,000",
  assumedDebt: "50,000,000",
  deductibleAmount: "50,000,000",
  taxRate: "20",
  progressiveDeduction: "10,000,000",
  filingCreditRate: "3",
};
describe("validateGiftTax", () => {
  it("parses grouped money and rates", () => {
    const result = validateGiftTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.giftValue.toNumber()).toBe(500_000_000);
  });
  it("accepts zero optional amounts and rates", () => {
    const result = validateGiftTax(
      {
        ...valid,
        assumedDebt: "0",
        deductibleAmount: "0",
        taxRate: "0",
        progressiveDeduction: "0",
        filingCreditRate: "0",
      },
      "en",
    );
    expect(result.data).toBeDefined();
  });
  it("rejects invalid values and debt above the gift", () => {
    const result = validateGiftTax(
      {
        ...valid,
        giftValue: "100",
        assumedDebt: "101",
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

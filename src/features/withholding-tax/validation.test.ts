import { describe, expect, it } from "vitest";
import { validateWithholdingTax } from "./validation";

const valid = {
  grossPayment: "5,000,000",
  nonTaxableAmount: "500,000",
  nationalTaxRate: "8",
  localIncomeTaxRate: "10",
};

describe("validateWithholdingTax", () => {
  it("parses formatted amounts and rates", () => {
    const result = validateWithholdingTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.grossPayment.toNumber()).toBe(5_000_000);
  });

  it("rejects non-taxable payment above gross and invalid rates", () => {
    const result = validateWithholdingTax(
      { ...valid, nonTaxableAmount: "5,000,001", nationalTaxRate: "101" },
      "en",
    );
    expect(result.errors.nonTaxableAmount).toBeTruthy();
    expect(result.errors.nationalTaxRate).toBeTruthy();
  });
});

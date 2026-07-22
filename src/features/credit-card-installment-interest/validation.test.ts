import { describe, expect, it } from "vitest";
import { validateCreditCardInstallmentInterest } from "./validation";

const valid = {
  purchaseAmount: "1,200,000",
  installmentMonths: "12",
  annualFeeRate: "12",
};

describe("validateCreditCardInstallmentInterest", () => {
  it("parses valid localized form values", () => {
    const result = validateCreditCardInstallmentInterest(valid, "en");
    expect(result.errors).toEqual({});
    expect(result.data?.purchaseAmount.toNumber()).toBe(1_200_000);
    expect(result.data?.installmentMonths).toBe(12);
  });

  it("rejects invalid amounts, terms, and rates", () => {
    const result = validateCreditCardInstallmentInterest(
      { purchaseAmount: "0", installmentMonths: "2.5", annualFeeRate: "31" },
      "ko",
    );
    expect(result.errors).toHaveProperty("purchaseAmount");
    expect(result.errors).toHaveProperty("installmentMonths");
    expect(result.errors).toHaveProperty("annualFeeRate");
  });
});

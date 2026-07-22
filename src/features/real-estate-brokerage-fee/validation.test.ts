import { describe, expect, it } from "vitest";
import { validateRealEstateBrokerageFee } from "./validation";

describe("validateRealEstateBrokerageFee", () => {
  it("parses confirmed localized inputs", () => {
    const result = validateRealEstateBrokerageFee(
      { transactionAmount: "500,000,000", feeRate: "0.4", vatRate: "10" },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.transactionAmount.toNumber()).toBe(500_000_000);
  });
  it("rejects missing, non-positive, and excessive values", () => {
    const result = validateRealEstateBrokerageFee(
      { transactionAmount: "0", feeRate: "11", vatRate: "101" },
      "ko",
    );
    expect(result.errors).toHaveProperty("transactionAmount");
    expect(result.errors).toHaveProperty("feeRate");
    expect(result.errors).toHaveProperty("vatRate");
  });
});

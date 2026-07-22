import { describe, expect, it } from "vitest";
import { validateStockProfitLoss } from "./validation";

describe("validateStockProfitLoss", () => {
  it("parses localized quantities and prices", () => {
    const result = validateStockProfitLoss(
      {
        shares: "10.5",
        averagePurchasePrice: "40,000",
        currentPrice: "50,000",
      },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.averagePurchasePrice.toNumber()).toBe(40_000);
  });

  it("rejects missing, non-positive, and excessive values", () => {
    const result = validateStockProfitLoss(
      {
        shares: "0",
        averagePurchasePrice: "",
        currentPrice: "1000000000001",
      },
      "ko",
    );
    expect(result.errors).toHaveProperty("shares");
    expect(result.errors).toHaveProperty("averagePurchasePrice");
    expect(result.errors).toHaveProperty("currentPrice");
  });
});

import { describe, expect, it } from "vitest";
import { validateStockAverageCost } from "./validation";

describe("validateStockAverageCost", () => {
  it("parses localized quantities and prices", () => {
    const result = validateStockAverageCost(
      {
        currentShares: "10.5",
        currentAveragePrice: "50,000",
        additionalShares: "20",
        additionalPrice: "35,000",
      },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.currentAveragePrice.toNumber()).toBe(50_000);
  });
  it("rejects missing, non-positive, and excessive values", () => {
    const result = validateStockAverageCost(
      {
        currentShares: "0",
        currentAveragePrice: "",
        additionalShares: "1000000001",
        additionalPrice: "-1",
      },
      "ko",
    );
    expect(result.errors).toHaveProperty("currentShares");
    expect(result.errors).toHaveProperty("currentAveragePrice");
    expect(result.errors).toHaveProperty("additionalShares");
    expect(result.errors).toHaveProperty("additionalPrice");
  });
});

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateStockAverageCost } from "./calculate";

describe("calculateStockAverageCost", () => {
  it("weights the existing holding and additional purchase by share count", () => {
    const result = calculateStockAverageCost({
      currentShares: new Decimal(10),
      currentAveragePrice: new Decimal(50_000),
      additionalShares: new Decimal(20),
      additionalPrice: new Decimal(35_000),
    });
    expect(result.currentCost.toNumber()).toBe(500_000);
    expect(result.additionalCost.toNumber()).toBe(700_000);
    expect(result.totalShares.toNumber()).toBe(30);
    expect(result.totalCost.toNumber()).toBe(1_200_000);
    expect(result.averagePrice.toNumber()).toBe(40_000);
  });
});

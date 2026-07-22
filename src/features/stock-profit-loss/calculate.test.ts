import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateStockProfitLoss } from "./calculate";

describe("calculateStockProfitLoss", () => {
  it("calculates a gain from share count and prices", () => {
    const result = calculateStockProfitLoss({
      shares: new Decimal(10),
      averagePurchasePrice: new Decimal(40_000),
      currentPrice: new Decimal(50_000),
    });
    expect(result.costBasis.toNumber()).toBe(400_000);
    expect(result.currentValue.toNumber()).toBe(500_000);
    expect(result.profitLoss.toNumber()).toBe(100_000);
    expect(result.returnRate.toNumber()).toBe(25);
  });

  it("preserves a negative result for a loss", () => {
    const result = calculateStockProfitLoss({
      shares: new Decimal("2.5"),
      averagePurchasePrice: new Decimal(100),
      currentPrice: new Decimal(80),
    });
    expect(result.profitLoss.toNumber()).toBe(-50);
    expect(result.returnRate.toNumber()).toBe(-20);
  });
});

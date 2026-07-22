import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateRentConversionRate } from "./calculate";

describe("calculateRentConversionRate", () => {
  it("calculates the annual conversion rate from equivalent deposits", () => {
    const result = calculateRentConversionRate({
      jeonseDeposit: new Decimal(300_000_000),
      monthlyDeposit: new Decimal(100_000_000),
      monthlyRent: new Decimal(1_000_000),
    });
    expect(result.convertedDeposit.toNumber()).toBe(200_000_000);
    expect(result.annualRent.toNumber()).toBe(12_000_000);
    expect(result.conversionRate.toNumber()).toBe(6);
    expect(result.monthlyConversionRate.toNumber()).toBe(0.5);
  });
});

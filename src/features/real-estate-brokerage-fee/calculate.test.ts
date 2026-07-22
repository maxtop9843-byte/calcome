import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateRealEstateBrokerageFee } from "./calculate";

describe("calculateRealEstateBrokerageFee", () => {
  it("calculates the confirmed fee and VAT", () => {
    const result = calculateRealEstateBrokerageFee({
      transactionAmount: new Decimal(500_000_000),
      feeRate: new Decimal("0.4"),
      vatRate: new Decimal(10),
    });
    expect(result.brokerageFee.toNumber()).toBe(2_000_000);
    expect(result.vat.toNumber()).toBe(200_000);
    expect(result.totalFee.toNumber()).toBe(2_200_000);
    expect(result.effectiveRate.toNumber()).toBeCloseTo(0.44);
  });
});

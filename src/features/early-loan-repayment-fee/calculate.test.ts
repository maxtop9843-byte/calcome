import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateEarlyRepaymentFee } from "./calculate";

describe("calculateEarlyRepaymentFee", () => {
  it("prorates the fee by the remaining contract term", () => {
    const result = calculateEarlyRepaymentFee({
      repaymentAmount: new Decimal(100_000_000),
      feeRate: new Decimal(1.2),
      originalTermMonths: 36,
      elapsedMonths: 12,
    });
    expect(result.estimatedFee.toNumber()).toBe(800_000);
    expect(result.remainingMonths).toBe(24);
    expect(result.effectiveFeeRate.toNumber()).toBeCloseTo(0.8);
    expect(result.netRepaymentAmount.toNumber()).toBe(100_800_000);
  });

  it("returns zero fee at the end of the term", () => {
    const result = calculateEarlyRepaymentFee({
      repaymentAmount: new Decimal(50_000_000),
      feeRate: new Decimal(1.5),
      originalTermMonths: 36,
      elapsedMonths: 36,
    });
    expect(result.estimatedFee.isZero()).toBe(true);
  });
});

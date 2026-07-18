import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateLtv } from "./calculate";

describe("calculateLtv", () => {
  it("calculates the current LTV and target-based capacity", () => {
    const result = calculateLtv({
      propertyValue: new Decimal(500_000_000),
      loanAmount: new Decimal(300_000_000),
      targetLtvRate: new Decimal(70),
    });

    expect(result.ltvRate.toNumber()).toBe(60);
    expect(result.ownerEquity.toNumber()).toBe(200_000_000);
    expect(result.maximumLoanAtTarget.toNumber()).toBe(350_000_000);
    expect(result.remainingLoanCapacity.toNumber()).toBe(50_000_000);
  });

  it("does not report negative equity or remaining capacity", () => {
    const result = calculateLtv({
      propertyValue: new Decimal(100_000_000),
      loanAmount: new Decimal(120_000_000),
      targetLtvRate: new Decimal(80),
    });

    expect(result.ltvRate.toNumber()).toBe(120);
    expect(result.ownerEquity.toNumber()).toBe(0);
    expect(result.remainingLoanCapacity.toNumber()).toBe(0);
  });
});

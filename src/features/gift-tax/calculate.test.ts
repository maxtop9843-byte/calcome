import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateGiftTax } from "./calculate";

describe("calculateGiftTax", () => {
  it("calculates the taxable gift, credit, and net receipt", () => {
    const result = calculateGiftTax({
      giftValue: new Decimal(500_000_000),
      assumedDebt: new Decimal(50_000_000),
      deductibleAmount: new Decimal(50_000_000),
      taxRate: new Decimal(20),
      progressiveDeduction: new Decimal(10_000_000),
      filingCreditRate: new Decimal(3),
    });
    expect(result.netGift.toNumber()).toBe(450_000_000);
    expect(result.taxableGift.toNumber()).toBe(400_000_000);
    expect(result.taxBeforeCredit.toNumber()).toBe(70_000_000);
    expect(result.filingCredit.toNumber()).toBe(2_100_000);
    expect(result.estimatedTax.toNumber()).toBe(67_900_000);
    expect(result.netReceived.toNumber()).toBe(382_100_000);
  });
  it("floors the tax base and tax at zero", () => {
    const result = calculateGiftTax({
      giftValue: new Decimal(100),
      assumedDebt: new Decimal(20),
      deductibleAmount: new Decimal(100),
      taxRate: new Decimal(50),
      progressiveDeduction: new Decimal(1_000),
      filingCreditRate: new Decimal(3),
    });
    expect(result.taxableGift.toNumber()).toBe(0);
    expect(result.estimatedTax.toNumber()).toBe(0);
  });
});

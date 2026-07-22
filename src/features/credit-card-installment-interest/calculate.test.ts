import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateCreditCardInstallmentInterest } from "./calculate";

describe("calculateCreditCardInstallmentInterest", () => {
  it("estimates equal-principal installment fees", () => {
    const result = calculateCreditCardInstallmentInterest({
      purchaseAmount: new Decimal(1_200_000),
      installmentMonths: 12,
      annualFeeRate: new Decimal(12),
    });
    expect(result.totalFee.toNumber()).toBe(78_000);
    expect(result.totalPayment.toNumber()).toBe(1_278_000);
    expect(result.averageMonthlyPayment.toNumber()).toBe(106_500);
    expect(result.firstPayment.toNumber()).toBe(112_000);
    expect(result.lastPayment.toNumber()).toBe(101_000);
  });

  it("supports a zero-fee installment plan", () => {
    const result = calculateCreditCardInstallmentInterest({
      purchaseAmount: new Decimal(900_000),
      installmentMonths: 3,
      annualFeeRate: new Decimal(0),
    });
    expect(result.totalFee.toNumber()).toBe(0);
    expect(result.totalPayment.toNumber()).toBe(900_000);
    expect(result.firstPayment.toNumber()).toBe(300_000);
    expect(result.lastPayment.toNumber()).toBe(300_000);
  });
});

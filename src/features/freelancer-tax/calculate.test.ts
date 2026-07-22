import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateFreelancerTax } from "./calculate";

describe("calculateFreelancerTax", () => {
  it("splits the 3.3% withholding into national and local tax", () => {
    const result = calculateFreelancerTax({
      grossPayment: new Decimal(1_000_000),
      expenseAmount: new Decimal(0),
    });
    expect(result.nationalIncomeTax.toNumber()).toBe(30_000);
    expect(result.localIncomeTax.toNumber()).toBe(3_000);
    expect(result.totalWithholding.toNumber()).toBe(33_000);
    expect(result.netPayment.toNumber()).toBe(967_000);
    expect(result.effectiveTaxRate.toNumber()).toBe(3.3);
  });

  it("applies withholding only after a confirmed excluded amount", () => {
    const result = calculateFreelancerTax({
      grossPayment: new Decimal(2_000_000),
      expenseAmount: new Decimal(500_000),
    });
    expect(result.taxablePayment.toNumber()).toBe(1_500_000);
    expect(result.totalWithholding.toNumber()).toBe(49_500);
    expect(result.netPayment.toNumber()).toBe(1_950_500);
  });
});

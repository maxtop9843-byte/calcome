import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateComprehensiveIncomeTax } from "./calculate";

describe("calculateComprehensiveIncomeTax", () => {
  it("applies expenses, deductions, credits, and local income tax in order", () => {
    const result = calculateComprehensiveIncomeTax({
      grossIncome: new Decimal(100_000_000),
      necessaryExpenses: new Decimal(30_000_000),
      incomeDeduction: new Decimal(15_000_000),
      taxRate: new Decimal(24),
      progressiveDeduction: new Decimal(5_760_000),
      taxCredit: new Decimal(1_000_000),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.adjustedIncome.toNumber()).toBe(70_000_000);
    expect(result.taxableIncome.toNumber()).toBe(55_000_000);
    expect(result.nationalIncomeTax.toNumber()).toBe(6_440_000);
    expect(result.localIncomeTax.toNumber()).toBe(644_000);
    expect(result.totalTax.toNumber()).toBe(7_084_000);
  });
  it("floors taxable income and tax at zero", () => {
    const result = calculateComprehensiveIncomeTax({
      grossIncome: new Decimal(10_000_000),
      necessaryExpenses: new Decimal(5_000_000),
      incomeDeduction: new Decimal(6_000_000),
      taxRate: new Decimal(6),
      progressiveDeduction: new Decimal(0),
      taxCredit: new Decimal(0),
      localIncomeTaxRate: new Decimal(10),
    });
    expect(result.taxableIncome.toNumber()).toBe(0);
    expect(result.totalTax.toNumber()).toBe(0);
  });
});

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDividend } from "./calculate";

describe("calculateDividend", () => {
  it("calculates gross and net dividend income", () => {
    const result = calculateDividend({
      shares: new Decimal(100),
      annualDividendPerShare: new Decimal(2_000),
      paymentsPerYear: new Decimal(4),
      withholdingTaxRate: new Decimal("15.4"),
    });
    expect(result.grossAnnualDividend.toNumber()).toBe(200_000);
    expect(result.estimatedTax.toNumber()).toBe(30_800);
    expect(result.netAnnualDividend.toNumber()).toBe(169_200);
    expect(result.grossDividendPerPayment.toNumber()).toBe(50_000);
    expect(result.netMonthlyAverage.toNumber()).toBe(14_100);
  });

  it("supports fractional shares and a zero tax assumption", () => {
    const result = calculateDividend({
      shares: new Decimal("2.5"),
      annualDividendPerShare: new Decimal(120),
      paymentsPerYear: new Decimal(12),
      withholdingTaxRate: new Decimal(0),
    });
    expect(result.grossAnnualDividend.toNumber()).toBe(300);
    expect(result.netAnnualDividend.toNumber()).toBe(300);
    expect(result.grossDividendPerPayment.toNumber()).toBe(25);
  });
});

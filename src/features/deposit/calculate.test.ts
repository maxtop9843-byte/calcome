import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateDeposit } from "./calculate";
import type { DepositInput } from "./types";

const base: DepositInput = {
  principal: "1000000",
  months: 12,
  annualInterestRate: "12",
  interestMethod: "simple",
  taxRate: "0",
  taxOption: "tax-free",
};

describe("calculateDeposit", () => {
  it("calculates simple interest", () => {
    const result = calculateDeposit(base);
    expect(result.grossInterest).toBe("120000");
    expect(result.maturityBeforeTax).toBe("1120000");
  });

  it("calculates monthly compound interest", () => {
    const result = calculateDeposit({ ...base, interestMethod: "compound" });
    expect(
      new Decimal(result.grossInterest).toDecimalPlaces(2).toString(),
    ).toBe("126825.03");
    expect(
      new Decimal(result.grossInterest).gt(
        calculateDeposit(base).grossInterest,
      ),
    ).toBe(true);
  });

  it("handles zero interest and one month", () => {
    const zero = calculateDeposit({
      ...base,
      months: 1,
      annualInterestRate: "0",
      taxRate: "15.4",
      taxOption: "general",
    });
    expect(zero.grossInterest).toBe("0");
    expect(zero.estimatedTax).toBe("0");
    expect(zero.maturityAfterTax).toBe(base.principal);

    const oneMonth = calculateDeposit({ ...base, months: 1 });
    const oneMonthCompound = calculateDeposit({
      ...base,
      months: 1,
      interestMethod: "compound",
    });
    expect(oneMonth.grossInterest).toBe("10000");
    expect(oneMonthCompound.grossInterest).toBe("10000");
  });

  it("supports one hundred years with finite high-precision results", () => {
    const result = calculateDeposit({
      ...base,
      months: 1200,
      annualInterestRate: "1",
      interestMethod: "compound",
    });
    expect(new Decimal(result.maturityBeforeTax).isFinite()).toBe(true);
    expect(new Decimal(result.maturityBeforeTax).gt(base.principal)).toBe(true);
  });

  it("applies general, custom, and zero tax", () => {
    const general = calculateDeposit({
      ...base,
      taxRate: "15.4",
      taxOption: "general",
    });
    const custom = calculateDeposit({
      ...base,
      taxRate: "10",
      taxOption: "custom",
    });
    expect(general.estimatedTax).toBe("18480");
    expect(custom.estimatedTax).toBe("12000");
    expect(calculateDeposit(base).estimatedTax).toBe("0");
  });

  it("reconciles every reported result", () => {
    const result = calculateDeposit({
      ...base,
      interestMethod: "compound",
      taxRate: "15.4",
      taxOption: "general",
    });
    expect(
      new Decimal(result.principal)
        .plus(result.grossInterest)
        .equals(result.maturityBeforeTax),
    ).toBe(true);
    expect(
      new Decimal(result.grossInterest)
        .minus(result.estimatedTax)
        .equals(result.afterTaxInterest),
    ).toBe(true);
    expect(
      new Decimal(result.principal)
        .plus(result.afterTaxInterest)
        .equals(result.maturityAfterTax),
    ).toBe(true);
  });
});

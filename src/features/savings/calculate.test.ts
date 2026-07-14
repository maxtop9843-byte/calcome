import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateSavings } from "./calculate";
import type { SavingsInput } from "./types";

const base: SavingsInput = {
  regularDeposit: "100000",
  depositFrequency: "monthly",
  months: 12,
  annualInterestRate: "12",
  interestMethod: "simple",
  depositTiming: "end",
  taxRate: "0",
  taxOption: "tax-free",
};

describe("calculateSavings", () => {
  it("calculates monthly simple interest for end deposits", () => {
    const result = calculateSavings(base);
    expect(result.totalPrincipal).toBe("1200000");
    expect(result.grossInterest).toBe("66000");
    expect(result.maturityBeforeTax).toBe("1266000");
    expect(result.depositCount).toBe(12);
  });

  it("calculates monthly compound interest", () => {
    const result = calculateSavings({ ...base, interestMethod: "compound" });
    expect(
      new Decimal(result.grossInterest).toDecimalPlaces(2).toString(),
    ).toBe("68250.3");
    expect(
      new Decimal(result.grossInterest).gt(
        calculateSavings(base).grossInterest,
      ),
    ).toBe(true);
  });

  it("gives beginning deposits one more interest period", () => {
    const beginning = calculateSavings({ ...base, depositTiming: "beginning" });
    const end = calculateSavings(base);
    expect(beginning.grossInterest).toBe("78000");
    expect(
      new Decimal(beginning.maturityBeforeTax).gt(end.maturityBeforeTax),
    ).toBe(true);
  });

  it("supports yearly beginning and end deposits", () => {
    const yearly = { ...base, depositFrequency: "yearly" as const, months: 24 };
    expect(calculateSavings(yearly).grossInterest).toBe("12000");
    expect(
      calculateSavings({ ...yearly, depositTiming: "beginning" }).grossInterest,
    ).toBe("36000");
  });

  it("handles zero interest without errors", () => {
    const result = calculateSavings({
      ...base,
      annualInterestRate: "0",
      taxRate: "15.4",
      taxOption: "general",
    });
    expect(result.grossInterest).toBe("0");
    expect(result.estimatedTax).toBe("0");
    expect(result.maturityAfterTax).toBe(result.totalPrincipal);
  });

  it("applies tax-free, general, and custom tax rates", () => {
    const taxFree = calculateSavings(base);
    const general = calculateSavings({
      ...base,
      taxRate: "15.4",
      taxOption: "general",
    });
    const custom = calculateSavings({
      ...base,
      taxRate: "10",
      taxOption: "custom",
    });
    expect(taxFree.estimatedTax).toBe("0");
    expect(general.estimatedTax).toBe("10164");
    expect(custom.estimatedTax).toBe("6600");
  });

  it("reconciles principal, interest, tax, and final values", () => {
    const result = calculateSavings({
      ...base,
      interestMethod: "compound",
      taxRate: "15.4",
      taxOption: "general",
    });
    expect(
      new Decimal(result.totalPrincipal)
        .plus(result.grossInterest)
        .equals(result.maturityBeforeTax),
    ).toBe(true);
    expect(
      new Decimal(result.grossInterest)
        .minus(result.estimatedTax)
        .equals(result.afterTaxInterest),
    ).toBe(true);
    expect(
      new Decimal(result.totalPrincipal)
        .plus(result.afterTaxInterest)
        .equals(result.maturityAfterTax),
    ).toBe(true);
    expect(result.schedule.at(-1)?.grossBalance).toBe(result.maturityBeforeTax);
  });
});

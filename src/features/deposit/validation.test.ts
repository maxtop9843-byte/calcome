import { describe, expect, it } from "vitest";

import { DEFAULT_DEPOSIT_VALUES, GENERAL_INTEREST_TAX_RATE } from "./constants";
import { validateDepositForm } from "./validation";

describe("validateDepositForm", () => {
  it("normalizes years and applies the shared general rate", () => {
    expect(validateDepositForm(DEFAULT_DEPOSIT_VALUES).data).toMatchObject({
      months: 12,
      taxRate: GENERAL_INTEREST_TAX_RATE,
    });
  });

  it("accepts one month and one hundred years", () => {
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        depositPeriod: "1",
        periodUnit: "months",
      }).data?.months,
    ).toBe(1);
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        depositPeriod: "100",
        periodUnit: "years",
      }).data?.months,
    ).toBe(1200);
  });

  it.each(["", "-1", "1e6", "Infinity", "NaN", "1,00"])(
    "rejects malformed money %s",
    (depositAmount) => {
      expect(
        validateDepositForm({ ...DEFAULT_DEPOSIT_VALUES, depositAmount }).errors
          .depositAmount,
      ).toBeDefined();
    },
  );

  it("rejects out-of-range values", () => {
    expect(
      validateDepositForm({ ...DEFAULT_DEPOSIT_VALUES, depositAmount: "9999" })
        .errors.depositAmount,
    ).toBeDefined();
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        depositPeriod: "1201",
        periodUnit: "months",
      }).errors.depositPeriod,
    ).toContain("1,200개월");
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        annualInterestRate: "100.1",
      }).errors.annualInterestRate,
    ).toBeDefined();
  });

  it("supports tax-free and valid custom tax while rejecting malformed custom tax", () => {
    expect(
      validateDepositForm({ ...DEFAULT_DEPOSIT_VALUES, taxOption: "tax-free" })
        .data?.taxRate,
    ).toBe("0");
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        taxOption: "custom",
        customTaxRate: "0",
      }).data?.taxRate,
    ).toBe("0");
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        taxOption: "custom",
        customTaxRate: "7.5",
      }).data?.taxRate,
    ).toBe("7.5");
    expect(
      validateDepositForm({
        ...DEFAULT_DEPOSIT_VALUES,
        taxOption: "custom",
        customTaxRate: "",
      }).errors.customTaxRate,
    ).toBeDefined();
  });
});

import { describe, expect, it } from "vitest";

import { DEFAULT_SAVINGS_VALUES, GENERAL_SAVINGS_TAX_RATE } from "./constants";
import { validateSavingsForm } from "./validation";

describe("validateSavingsForm", () => {
  it("produces identical calculation input for Korean and English", () => {
    const values = DEFAULT_SAVINGS_VALUES;
    expect(validateSavingsForm(values, "ko").data).toEqual(
      validateSavingsForm(values, "en").data,
    );
  });
  it("normalizes years and applies the verified general rate", () => {
    const result = validateSavingsForm(DEFAULT_SAVINGS_VALUES);
    expect(result.data).toMatchObject({
      months: 12,
      taxRate: GENERAL_SAVINGS_TAX_RATE,
    });
  });

  it("accepts valid boundaries", () => {
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        regularDeposit: "1,000",
        savingsPeriod: "1",
        periodUnit: "months",
      }).data,
    ).toBeDefined();
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        regularDeposit: "1000000000",
        savingsPeriod: "100",
        periodUnit: "years",
      }).data?.months,
    ).toBe(1200);
  });

  it.each(["", "-1", "1e3", "Infinity", "NaN", "1,00"])(
    "rejects malformed money %s",
    (regularDeposit) => {
      expect(
        validateSavingsForm({ ...DEFAULT_SAVINGS_VALUES, regularDeposit })
          .errors.regularDeposit,
      ).toBeDefined();
    },
  );

  it("rejects invalid rates, periods, and incomplete yearly frequency periods", () => {
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        annualInterestRate: "100.1",
      }).errors.annualInterestRate,
    ).toBeDefined();
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        savingsPeriod: "1201",
        periodUnit: "months",
      }).errors.savingsPeriod,
    ).toContain("1,200개월");
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        depositFrequency: "yearly",
        savingsPeriod: "18",
        periodUnit: "months",
      }).errors.savingsPeriod,
    ).toContain("완전한 연 단위");
  });

  it("requires a valid rate only for custom tax", () => {
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        taxOption: "custom",
        customTaxRate: "",
      }).errors.customTaxRate,
    ).toBeDefined();
    expect(
      validateSavingsForm({
        ...DEFAULT_SAVINGS_VALUES,
        taxOption: "custom",
        customTaxRate: "7.5",
      }).data?.taxRate,
    ).toBe("7.5");
    expect(
      validateSavingsForm({ ...DEFAULT_SAVINGS_VALUES, taxOption: "tax-free" })
        .data?.taxRate,
    ).toBe("0");
  });
});

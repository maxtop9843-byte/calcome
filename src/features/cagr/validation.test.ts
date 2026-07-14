import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { DEFAULT_CAGR_VALUES } from "./constants";
import { validateCagrForm } from "./validation";

describe("validateCagrForm", () => {
  it("normalizes years and months", () => {
    expect(validateCagrForm(DEFAULT_CAGR_VALUES).data?.years).toBe("5");
    const monthYears = validateCagrForm({
      ...DEFAULT_CAGR_VALUES,
      investmentPeriod: "1",
      periodUnit: "months",
    }).data?.years;
    expect(new Decimal(monthYears!).toDecimalPlaces(10).toString()).toBe(
      "0.0833333333",
    );
  });

  it("rejects zero or negative initial values and negative final values", () => {
    expect(
      validateCagrForm({ ...DEFAULT_CAGR_VALUES, initialValue: "0" }).errors
        .initialValue,
    ).toBeDefined();
    expect(
      validateCagrForm({ ...DEFAULT_CAGR_VALUES, initialValue: "-1" }).errors
        .initialValue,
    ).toBeDefined();
    expect(
      validateCagrForm({ ...DEFAULT_CAGR_VALUES, finalValue: "-1" }).errors
        .finalValue,
    ).toBeDefined();
    expect(
      validateCagrForm({ ...DEFAULT_CAGR_VALUES, finalValue: "0" }).data,
    ).toBeDefined();
  });

  it("rejects zero, excessive, decimal, and malformed periods", () => {
    for (const investmentPeriod of ["0", "1201", "1.5", "1e2", ""]) {
      expect(
        validateCagrForm({
          ...DEFAULT_CAGR_VALUES,
          investmentPeriod,
          periodUnit: "months",
        }).errors.investmentPeriod,
      ).toBeDefined();
    }
    expect(
      validateCagrForm({
        ...DEFAULT_CAGR_VALUES,
        investmentPeriod: "100",
        periodUnit: "years",
      }).data,
    ).toBeDefined();
  });

  it("rejects malformed values and accepts valid grouping", () => {
    for (const initialValue of ["1e6", "10,00", "Infinity", "NaN", ""]) {
      expect(
        validateCagrForm({ ...DEFAULT_CAGR_VALUES, initialValue }).errors
          .initialValue,
      ).toBeDefined();
    }
    expect(
      validateCagrForm({
        ...DEFAULT_CAGR_VALUES,
        initialValue: "10,000,000.50",
      }).data?.initialValue,
    ).toBe("10000000.5");
  });
});

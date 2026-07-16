import { describe, expect, it } from "vitest";
import { DEFAULT_LOAN_VALUES } from "./constants";
import { validateLoanForm } from "./validation";

describe("validateLoanForm", () => {
  it("produces identical calculation input for Korean and English", () => {
    expect(validateLoanForm(DEFAULT_LOAN_VALUES, "ko").data).toEqual(
      validateLoanForm(DEFAULT_LOAN_VALUES, "en").data,
    );
  });
  it("converts years to months", () => {
    expect(validateLoanForm(DEFAULT_LOAN_VALUES).data?.months).toBe(360);
  });
  it("accepts months and rejects periods over 100 years", () => {
    expect(
      validateLoanForm({
        ...DEFAULT_LOAN_VALUES,
        loanPeriod: "18",
        periodUnit: "months",
      }).data?.months,
    ).toBe(18);
    expect(
      validateLoanForm({
        ...DEFAULT_LOAN_VALUES,
        loanPeriod: "1201",
        periodUnit: "months",
      }).errors.loanPeriod,
    ).toContain("1,200개월");
  });
});

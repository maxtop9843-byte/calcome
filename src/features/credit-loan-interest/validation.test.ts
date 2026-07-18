import { describe, expect, it } from "vitest";
import { validateCreditLoanInterest } from "./validation";

const valid = {
  loanAmount: "50,000,000",
  annualRate: "6.5",
  termMonths: "24",
  monthlyFees: "10,000",
};

describe("validateCreditLoanInterest", () => {
  it("parses valid localized money values", () => {
    const result = validateCreditLoanInterest(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.loanAmount.toString()).toBe("50000000");
  });
  it("accepts zero rates and fees", () => {
    expect(
      validateCreditLoanInterest(
        { ...valid, annualRate: "0", monthlyFees: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects invalid limits", () => {
    const result = validateCreditLoanInterest(
      { ...valid, loanAmount: "0", annualRate: "101", termMonths: "0" },
      "en",
    );
    expect(result.errors).toEqual(
      expect.objectContaining({
        loanAmount: expect.any(String),
        annualRate: expect.any(String),
        termMonths: expect.any(String),
      }),
    );
  });
});

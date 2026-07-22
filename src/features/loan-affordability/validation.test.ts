import { describe, expect, it } from "vitest";
import { validateLoanAffordability } from "./validation";

const valid = {
  annualIncome: "60,000,000",
  otherMonthlyDebt: "500,000",
  debtServiceLimit: "40",
  annualInterestRate: "4.5",
  termYears: "30",
};
describe("validateLoanAffordability", () => {
  it("parses valid localized form values", () => {
    const result = validateLoanAffordability(valid, "en");
    expect(result.errors).toEqual({});
    expect(result.data?.annualIncome.toNumber()).toBe(60_000_000);
  });
  it("rejects invalid limits and terms", () => {
    const result = validateLoanAffordability(
      { ...valid, debtServiceLimit: "0", termYears: "1.5" },
      "ko",
    );
    expect(result.errors).toHaveProperty("debtServiceLimit");
    expect(result.errors).toHaveProperty("termYears");
    expect(result.data).toBeUndefined();
  });
});

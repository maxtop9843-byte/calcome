import { describe, expect, it } from "vitest";
import { validateDti, type DtiValues } from "./validation";

const valid: DtiValues = {
  annualIncome: "60,000,000",
  mortgagePrincipal: "300,000,000",
  annualInterestRate: "4.5",
  termYears: "30",
  otherMonthlyDebt: "500,000",
};
describe("validateDti", () => {
  it("parses valid localized money inputs", () => {
    const result = validateDti(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.annualIncome.toNumber()).toBe(60_000_000);
  });
  it("accepts zero interest and zero other debt", () => {
    expect(
      validateDti(
        { ...valid, annualInterestRate: "0", otherMonthlyDebt: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects invalid ranges and non-whole terms", () => {
    const result = validateDti(
      {
        ...valid,
        annualIncome: "0",
        annualInterestRate: "101",
        termYears: "10.5",
        otherMonthlyDebt: "-1",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(Object.keys(result.errors)).toEqual([
      "annualIncome",
      "annualInterestRate",
      "termYears",
      "otherMonthlyDebt",
    ]);
  });
});

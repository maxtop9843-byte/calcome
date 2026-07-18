import { describe, expect, it } from "vitest";
import { validateLoanInterestComparison } from "./validation";

describe("validateLoanInterestComparison", () => {
  it("accepts comma-formatted principal and valid comparison terms", () => {
    const result = validateLoanInterestComparison(
      {
        principal: "300,000,000",
        annualRateA: "4.5",
        annualRateB: "3.8",
        termMonths: "360",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.principal.toNumber()).toBe(300_000_000);
  });

  it("rejects invalid rates and terms", () => {
    const result = validateLoanInterestComparison(
      {
        principal: "",
        annualRateA: "-1",
        annualRateB: "101",
        termMonths: "0",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(Object.keys(result.errors)).toHaveLength(4);
  });
});

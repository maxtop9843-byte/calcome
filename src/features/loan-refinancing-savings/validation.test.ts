import { describe, expect, it } from "vitest";
import { validateLoanRefinancing } from "./validation";

const valid = {
  remainingBalance: "300,000,000",
  currentAnnualRate: "4.8",
  newAnnualRate: "3.7",
  remainingMonths: "240",
  refinancingCosts: "2,000,000",
};
describe("validateLoanRefinancing", () => {
  it("parses valid localized money values", () => {
    const result = validateLoanRefinancing(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.remainingBalance.toString()).toBe("300000000");
  });
  it("accepts zero rates and zero costs", () => {
    const result = validateLoanRefinancing(
      { ...valid, newAnnualRate: "0", refinancingCosts: "0" },
      "en",
    );
    expect(result.data).toBeDefined();
  });
  it("rejects invalid and out-of-range values", () => {
    const result = validateLoanRefinancing(
      {
        remainingBalance: "",
        currentAnnualRate: "101",
        newAnnualRate: "-1",
        remainingMonths: "601",
        refinancingCosts: "-1",
      },
      "en",
    );
    expect(Object.keys(result.errors)).toHaveLength(5);
    expect(result.data).toBeUndefined();
  });
});

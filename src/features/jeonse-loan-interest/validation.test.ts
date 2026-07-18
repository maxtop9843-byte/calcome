import { describe, expect, it } from "vitest";
import { validateJeonseLoanInterest } from "./validation";

const valid = {
  deposit: "500,000,000",
  ownFunds: "200,000,000",
  annualRate: "4.2",
  termYears: "2",
  monthlyFees: "50,000",
};

describe("validateJeonseLoanInterest", () => {
  it("parses valid localized money values", () => {
    const result = validateJeonseLoanInterest(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.deposit.toString()).toBe("500000000");
  });
  it("accepts zero rates, own funds, and fees", () => {
    expect(
      validateJeonseLoanInterest(
        { ...valid, annualRate: "0", ownFunds: "0", monthlyFees: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects own funds at least as large as the deposit and invalid limits", () => {
    const result = validateJeonseLoanInterest(
      { ...valid, ownFunds: valid.deposit, annualRate: "101", termYears: "0" },
      "en",
    );
    expect(result.errors).toEqual(
      expect.objectContaining({
        ownFunds: expect.any(String),
        annualRate: expect.any(String),
        termYears: expect.any(String),
      }),
    );
    expect(result.data).toBeUndefined();
  });
});

import { describe, expect, it } from "vitest";
import { validateMortgagePayment } from "./validation";

const valid = {
  homePrice: "500,000,000",
  downPayment: "100,000,000",
  annualRate: "5",
  termYears: "30",
  monthlyCosts: "300,000",
};

describe("validateMortgagePayment", () => {
  it("parses valid localized money values", () => {
    const result = validateMortgagePayment(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.homePrice.toString()).toBe("500000000");
  });
  it("accepts zero rates, down payments, and monthly costs", () => {
    expect(
      validateMortgagePayment(
        { ...valid, annualRate: "0", downPayment: "0", monthlyCosts: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects a down payment at least as large as the price and invalid limits", () => {
    const result = validateMortgagePayment(
      {
        ...valid,
        downPayment: valid.homePrice,
        annualRate: "101",
        termYears: "0",
      },
      "en",
    );
    expect(result.errors).toEqual(
      expect.objectContaining({
        downPayment: expect.any(String),
        annualRate: expect.any(String),
        termYears: expect.any(String),
      }),
    );
    expect(result.data).toBeUndefined();
  });
});

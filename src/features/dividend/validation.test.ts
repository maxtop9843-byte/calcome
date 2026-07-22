import { describe, expect, it } from "vitest";
import { validateDividend } from "./validation";

describe("validateDividend", () => {
  it("parses localized dividend assumptions", () => {
    const result = validateDividend(
      {
        shares: "100.5",
        annualDividendPerShare: "2,000",
        paymentsPerYear: "4",
        withholdingTaxRate: "15.4",
      },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.annualDividendPerShare.toNumber()).toBe(2_000);
  });

  it("allows a zero withholding rate", () => {
    const result = validateDividend(
      {
        shares: "10",
        annualDividendPerShare: "100",
        paymentsPerYear: "12",
        withholdingTaxRate: "0",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
  });

  it("rejects invalid quantities, dividends, frequencies, and rates", () => {
    const result = validateDividend(
      {
        shares: "0",
        annualDividendPerShare: "",
        paymentsPerYear: "2.5",
        withholdingTaxRate: "101",
      },
      "ko",
    );
    expect(result.errors).toHaveProperty("shares");
    expect(result.errors).toHaveProperty("annualDividendPerShare");
    expect(result.errors).toHaveProperty("paymentsPerYear");
    expect(result.errors).toHaveProperty("withholdingTaxRate");
  });
});

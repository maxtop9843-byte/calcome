import { describe, expect, it } from "vitest";
import { validateDebtRepaymentPeriod } from "./validation";

const valid = {
  balance: "10,000,000",
  annualInterestRate: "6",
  monthlyPayment: "500,000",
};

describe("validateDebtRepaymentPeriod", () => {
  it("parses valid localized form values", () => {
    const result = validateDebtRepaymentPeriod(valid, "en");
    expect(result.errors).toEqual({});
    expect(result.data?.balance.toNumber()).toBe(10_000_000);
  });
  it("rejects invalid balances, rates, and payments", () => {
    const result = validateDebtRepaymentPeriod(
      { balance: "0", annualInterestRate: "101", monthlyPayment: "" },
      "ko",
    );
    expect(result.errors).toHaveProperty("balance");
    expect(result.errors).toHaveProperty("annualInterestRate");
    expect(result.errors).toHaveProperty("monthlyPayment");
  });
});

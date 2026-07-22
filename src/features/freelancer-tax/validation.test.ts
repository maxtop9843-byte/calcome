import { describe, expect, it } from "vitest";
import { validateFreelancerTax } from "./validation";

describe("validateFreelancerTax", () => {
  it("parses formatted amounts", () => {
    const result = validateFreelancerTax(
      { grossPayment: "1,000,000", expenseAmount: "0" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.grossPayment.toNumber()).toBe(1_000_000);
  });
  it("rejects excluded amounts above the payment", () => {
    const result = validateFreelancerTax(
      { grossPayment: "1,000", expenseAmount: "1,001" },
      "en",
    );
    expect(result.errors.expenseAmount).toBeTruthy();
  });
});

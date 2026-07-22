import { describe, expect, it } from "vitest";
import { validateComprehensiveIncomeTax } from "./validation";
const valid = {
  grossIncome: "100,000,000",
  necessaryExpenses: "30,000,000",
  incomeDeduction: "15,000,000",
  taxRate: "24",
  progressiveDeduction: "5,760,000",
  taxCredit: "1,000,000",
  localIncomeTaxRate: "10",
};
describe("validateComprehensiveIncomeTax", () => {
  it("parses formatted amounts", () => {
    const result = validateComprehensiveIncomeTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.grossIncome.toNumber()).toBe(100_000_000);
  });
  it("rejects expenses above income and invalid rates", () => {
    const result = validateComprehensiveIncomeTax(
      { ...valid, necessaryExpenses: "100,000,001", taxRate: "101" },
      "en",
    );
    expect(result.errors.necessaryExpenses).toBeTruthy();
    expect(result.errors.taxRate).toBeTruthy();
  });
});

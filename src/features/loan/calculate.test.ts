import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateLoan } from "./calculate";

const base = {
  loanAmount: "12000000",
  annualInterestRate: "6",
  months: 12,
} as const;

describe("calculateLoan", () => {
  it("calculates equal payments and fully amortizes the balance", () => {
    const result = calculateLoan({ ...base, repaymentType: "equal-payment" });
    expect(
      new Decimal(result.monthlyPayment).toDecimalPlaces(2).toString(),
    ).toBe("1032797.16");
    expect(result.schedule).toHaveLength(12);
    expect(result.schedule.at(-1)?.remainingBalance).toBe("0");
    expect(
      new Decimal(result.totalRepayment)
        .minus(base.loanAmount)
        .minus(result.totalInterest)
        .abs()
        .lt("1e-20"),
    ).toBe(true);
  });
  it("uses equal principal and decreasing payments", () => {
    const result = calculateLoan({ ...base, repaymentType: "equal-principal" });
    expect(
      result.schedule.every((row) =>
        new Decimal(row.principal).equals("1000000"),
      ),
    ).toBe(true);
    expect(
      new Decimal(result.schedule[0].payment).gt(
        result.schedule.at(-1)!.payment,
      ),
    ).toBe(true);
    expect(new Decimal(result.totalInterest).equals("390000")).toBe(true);
  });
  it("keeps principal outstanding until maturity for bullet repayment", () => {
    const result = calculateLoan({ ...base, repaymentType: "bullet" });
    expect(result.schedule[0]).toMatchObject({
      principal: "0",
      interest: "60000",
      remainingBalance: "12000000",
    });
    expect(result.schedule.at(-1)).toMatchObject({
      principal: "12000000",
      payment: "12060000",
      remainingBalance: "0",
    });
    expect(result.totalInterest).toBe("720000");
  });
  it("handles a zero interest rate without division by zero", () => {
    const result = calculateLoan({
      ...base,
      annualInterestRate: "0",
      repaymentType: "equal-payment",
    });
    expect(result.monthlyPayment).toBe("1000000");
    expect(result.totalInterest).toBe("0");
  });
});

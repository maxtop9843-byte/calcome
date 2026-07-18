import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateBalloonPayment } from "./calculate";

describe("calculateBalloonPayment", () => {
  it("calculates regular payments and the final balloon without premature rounding", () => {
    const result = calculateBalloonPayment({
      principal: new Decimal(100_000_000),
      annualRate: new Decimal(5),
      termMonths: 60,
      balloonAmount: new Decimal(40_000_000),
    });
    expect(result.monthlyPayment.toDecimalPlaces(2).toString()).toBe(
      "1298940.69",
    );
    expect(
      result.totalRepayment.eq(result.totalRegularPayments.plus(40_000_000)),
    ).toBe(true);
    expect(
      result.totalInterest.eq(result.totalRepayment.minus(100_000_000)),
    ).toBe(true);
    expect(result.balloonRatio.toString()).toBe("40");
  });

  it("handles a zero-percent loan", () => {
    const result = calculateBalloonPayment({
      principal: new Decimal(12_000_000),
      annualRate: new Decimal(0),
      termMonths: 12,
      balloonAmount: new Decimal(6_000_000),
    });
    expect(result.monthlyPayment.toString()).toBe("500000");
    expect(result.totalInterest.toString()).toBe("0");
  });

  it("supports an interest-only structure when balloon equals principal", () => {
    const result = calculateBalloonPayment({
      principal: new Decimal(120_000_000),
      annualRate: new Decimal(6),
      termMonths: 24,
      balloonAmount: new Decimal(120_000_000),
    });
    expect(result.monthlyPayment.toDecimalPlaces(2).toString()).toBe("600000");
    expect(result.balloonRatio.toString()).toBe("100");
  });
});

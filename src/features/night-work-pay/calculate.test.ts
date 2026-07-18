import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateNightWorkPay } from "./calculate";

describe("night work", () => {
  it("adds the selected premium for fractional night-work hours", () => {
    const result = calculateNightWorkPay({
      hourlyWage: new Decimal(12000),
      nightHours: new Decimal("7.5"),
      premiumRate: new Decimal(50),
      workplaceSize: "fiveOrMore",
    });

    expect(result.basePay.toNumber()).toBe(90000);
    expect(result.premiumPay.toNumber()).toBe(45000);
    expect(result.totalPay.toNumber()).toBe(135000);
  });
});

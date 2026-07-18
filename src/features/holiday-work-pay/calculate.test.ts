import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateHolidayWorkPay } from "./calculate";

describe("holiday-work calculation", () => {
  it("applies a 50% premium at exactly eight hours", () => {
    const result = calculateHolidayWorkPay({
      hourlyWage: new Decimal(10000),
      holidayHours: new Decimal(8),
      workplaceSize: "fiveOrMore",
      contractualPremiumRate: new Decimal(0),
    });
    expect(result.basePay.toNumber()).toBe(80000);
    expect(result.premiumPay.toNumber()).toBe(40000);
    expect(result.totalPay.toNumber()).toBe(120000);
  });
  it("splits ten hours into 8 hours at 50% and 2 hours at 100%", () => {
    const result = calculateHolidayWorkPay({
      hourlyWage: new Decimal(10000),
      holidayHours: new Decimal(10),
      workplaceSize: "fiveOrMore",
      contractualPremiumRate: new Decimal(0),
    });
    expect(result.withinEightPremium.toNumber()).toBe(40000);
    expect(result.overEightPremium.toNumber()).toBe(20000);
    expect(result.totalPay.toNumber()).toBe(160000);
  });
  it("splits fractional hours", () => {
    const result = calculateHolidayWorkPay({
      hourlyWage: new Decimal(10000),
      holidayHours: new Decimal("8.5"),
      workplaceSize: "fiveOrMore",
      contractualPremiumRate: new Decimal(0),
    });
    expect(result.withinEightHours.toNumber()).toBe(8);
    expect(result.overEightHours.toNumber()).toBe(0.5);
    expect(result.premiumPay.toNumber()).toBe(45000);
  });
  it("uses the contractual rate for under-five workplaces", () => {
    const result = calculateHolidayWorkPay({
      hourlyWage: new Decimal(10000),
      holidayHours: new Decimal(10),
      workplaceSize: "underFive",
      contractualPremiumRate: new Decimal(20),
    });
    expect(result.premiumPay.toNumber()).toBe(20000);
    expect(result.overEightPremium.toNumber()).toBe(0);
  });
});

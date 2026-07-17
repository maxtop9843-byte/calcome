import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateHourlyWage } from "./calculate";

describe("hourly wage calculation", () => {
  it("converts an hourly wage across pay periods with paid holiday hours", () => {
    const result = calculateHourlyWage({
      payAmount: new Decimal(10320),
      payUnit: "hourly",
      dailyHours: new Decimal(8),
      weeklyHours: new Decimal(40),
      includePaidHoliday: true,
    });

    expect(result.hourlyWage.toString()).toBe("10320");
    expect(result.paidHolidayHours.toString()).toBe("8");
    expect(result.weeklyPaidHours.toString()).toBe("48");
    expect(result.dailyPay.toString()).toBe("82560");
    expect(result.weeklyPay.toString()).toBe("495360");
    expect(result.meetsMinimumWage).toBe(true);
  });

  it("recovers the same hourly rate from a monthly amount", () => {
    const baseline = calculateHourlyWage({
      payAmount: new Decimal(12000),
      payUnit: "hourly",
      dailyHours: new Decimal(8),
      weeklyHours: new Decimal(40),
      includePaidHoliday: true,
    });
    const converted = calculateHourlyWage({
      payAmount: baseline.monthlyPay,
      payUnit: "monthly",
      dailyHours: new Decimal(8),
      weeklyHours: new Decimal(40),
      includePaidHoliday: true,
    });

    expect(converted.hourlyWage.toString()).toBe("12000");
    expect(converted.annualPay.eq(baseline.annualPay)).toBe(true);
  });

  it("supports decimal hours and excludes paid holiday time below 15 hours", () => {
    const result = calculateHourlyWage({
      payAmount: new Decimal(180000),
      payUnit: "weekly",
      dailyHours: new Decimal("7.25"),
      weeklyHours: new Decimal("14.5"),
      includePaidHoliday: true,
    });

    expect(result.paidHolidayHours.isZero()).toBe(true);
    expect(result.hourlyWage.toString()).toBe(
      new Decimal(180000).div("14.5").toString(),
    );
  });
});

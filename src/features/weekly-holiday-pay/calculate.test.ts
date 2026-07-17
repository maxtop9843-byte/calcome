import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateWeeklyHolidayPay } from "./calculate";

describe("weekly holiday pay calculation", () => {
  it("calculates eligible weekly holiday pay", () => {
    const result = calculateWeeklyHolidayPay({
      hourlyWage: new Decimal(12000),
      weeklyHours: new Decimal(40),
      completedScheduledDays: true,
    });
    expect(result.eligible).toBe(true);
    expect(result.paidHolidayHours.toNumber()).toBe(8);
    expect(result.weeklyHolidayPay.toNumber()).toBe(96000);
    expect(result.weeklyTotalPay.toNumber()).toBe(576000);
  });

  it("returns zero when under 15 hours or scheduled days are not completed", () => {
    for (const input of [
      { weeklyHours: 14.5, completedScheduledDays: true },
      { weeklyHours: 40, completedScheduledDays: false },
    ]) {
      expect(
        calculateWeeklyHolidayPay({
          hourlyWage: new Decimal(12000),
          weeklyHours: new Decimal(input.weeklyHours),
          completedScheduledDays: input.completedScheduledDays,
        }).weeklyHolidayPay.isZero(),
      ).toBe(true);
    }
  });
});

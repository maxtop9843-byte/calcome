import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import {
  AVERAGE_WEEKS_PER_MONTH,
  calculateMinimumWage,
  OFFICIAL_MONTHLY_MINIMUM_2026,
} from "./calculate";

describe("minimum wage calculation", () => {
  const calculate = (hours: string, holiday = true) =>
    calculateMinimumWage({
      weeklyHours: new Decimal(hours),
      includesPaidWeeklyHoliday: holiday,
    });
  it("applies eight paid weekly-holiday hours to 40 hours", () =>
    expect(calculate("40").paidWeeklyHolidayHours.toString()).toBe("8"));
  it("applies three paid weekly-holiday hours to 15 hours", () =>
    expect(calculate("15").paidWeeklyHolidayHours.toString()).toBe("3"));
  it.each(["14.5", "10"])(
    "applies no paid weekly-holiday hours below 15 hours: %s",
    (hours) =>
      expect(calculate(hours).paidWeeklyHolidayHours.isZero()).toBe(true),
  );
  it("applies no paid weekly-holiday hours when not selected", () =>
    expect(calculate("40", false).paidWeeklyHolidayHours.isZero()).toBe(true));
  it("uses the precise 365/7/12 monthly average and official 209-hour amount", () => {
    const result = calculate("40");
    expect(
      AVERAGE_WEEKS_PER_MONTH.equals(new Decimal(365).div(7).div(12)),
    ).toBe(true);
    expect(
      result.monthlyMinimum.equals(
        result.weeklyMinimum.mul(new Decimal(365).div(7).div(12)),
      ),
    ).toBe(true);
    expect(OFFICIAL_MONTHLY_MINIMUM_2026.toString()).toBe("2156880");
  });
});

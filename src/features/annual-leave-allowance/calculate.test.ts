import { describe, expect, it } from "vitest";
import Decimal from "decimal.js";
import { calculateAnnualLeaveAllowance } from "./calculate";

describe("calculateAnnualLeaveAllowance", () => {
  it("grants one day for each full-attendance month before one year", () => {
    const result = calculateAnnualLeaveAllowance({
      completedYears: 0,
      attendanceAtLeast80: true,
      fullAttendanceMonths: 7,
      usedDays: 2,
      hourlyWage: new Decimal(12_000),
      dailyHours: new Decimal(8),
    });
    expect(result).toMatchObject({
      grantedDays: 7,
      seniorityDays: 0,
      remainingDays: 5,
    });
    expect(result.estimatedAllowance.toNumber()).toBe(480_000);
  });

  it("adds a day every two years after the first year and caps the grant at 25", () => {
    expect(
      calculateAnnualLeaveAllowance({
        completedYears: 5,
        attendanceAtLeast80: true,
        fullAttendanceMonths: 12,
        usedDays: 3,
        hourlyWage: new Decimal(10_000),
        dailyHours: new Decimal(8),
      }),
    ).toMatchObject({ grantedDays: 17, seniorityDays: 2, remainingDays: 14 });
    expect(
      calculateAnnualLeaveAllowance({
        completedYears: 30,
        attendanceAtLeast80: true,
        fullAttendanceMonths: 12,
        usedDays: 0,
        hourlyWage: new Decimal(10_000),
        dailyHours: new Decimal(8),
      }).grantedDays,
    ).toBe(25);
  });

  it("uses full-attendance months when annual attendance is below 80 percent", () => {
    expect(
      calculateAnnualLeaveAllowance({
        completedYears: 2,
        attendanceAtLeast80: false,
        fullAttendanceMonths: 9,
        usedDays: 12,
        hourlyWage: new Decimal(10_000),
        dailyHours: new Decimal(8),
      }),
    ).toMatchObject({ grantedDays: 9, seniorityDays: 0, remainingDays: 0 });
  });
});

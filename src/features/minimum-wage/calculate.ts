import Decimal from "decimal.js";

export const MINIMUM_HOURLY_WAGE_2026 = new Decimal(10320);
export const AVERAGE_WEEKS_PER_MONTH = new Decimal(365).div(7).div(12);
export const OFFICIAL_MONTHLY_HOURS_2026 = new Decimal(209);
export const OFFICIAL_MONTHLY_MINIMUM_2026 = MINIMUM_HOURLY_WAGE_2026.mul(
  OFFICIAL_MONTHLY_HOURS_2026,
);

export type MinimumWageInput = {
  weeklyHours: Decimal;
  includesPaidWeeklyHoliday: boolean;
};

export type MinimumWageResult = {
  hourlyMinimum: Decimal;
  weeklyMinimum: Decimal;
  monthlyMinimum: Decimal;
  officialMonthlyMinimum: Decimal;
  paidWeeklyHolidayHours: Decimal;
  totalWeeklyPaidHours: Decimal;
  weeklyHolidayApplied: boolean;
};

export function calculateMinimumWage(
  input: MinimumWageInput,
): MinimumWageResult {
  const weeklyHolidayApplied =
    input.includesPaidWeeklyHoliday && input.weeklyHours.gte(15);
  const paidWeeklyHolidayHours = weeklyHolidayApplied
    ? Decimal.min(input.weeklyHours.div(5), 8)
    : new Decimal(0);
  const totalWeeklyPaidHours = input.weeklyHours.plus(paidWeeklyHolidayHours);
  const weeklyMinimum = MINIMUM_HOURLY_WAGE_2026.mul(totalWeeklyPaidHours);

  return {
    hourlyMinimum: MINIMUM_HOURLY_WAGE_2026,
    weeklyMinimum,
    monthlyMinimum: weeklyMinimum.mul(AVERAGE_WEEKS_PER_MONTH),
    officialMonthlyMinimum: OFFICIAL_MONTHLY_MINIMUM_2026,
    paidWeeklyHolidayHours,
    totalWeeklyPaidHours,
    weeklyHolidayApplied,
  };
}

import Decimal from "decimal.js";

import { MINIMUM_HOURLY_WAGE_2026, WEEKS_PER_YEAR } from "./constants";
import type { HourlyWageInput, HourlyWageResult } from "./types";

export function calculateHourlyWage(input: HourlyWageInput): HourlyWageResult {
  const weeksPerYear = new Decimal(WEEKS_PER_YEAR);
  const paidHolidayHours =
    input.includePaidHoliday && input.weeklyHours.gte(15)
      ? Decimal.min(input.weeklyHours.div(5), 8)
      : new Decimal(0);
  const weeklyPaidHours = input.weeklyHours.add(paidHolidayHours);
  const monthlyPaidHours = weeklyPaidHours.mul(weeksPerYear).div(12);
  const annualPaidHours = weeklyPaidHours.mul(weeksPerYear);
  const divisor = {
    hourly: new Decimal(1),
    daily: input.dailyHours,
    weekly: weeklyPaidHours,
    monthly: monthlyPaidHours,
    annual: annualPaidHours,
  }[input.payUnit];
  const hourlyWage = input.payAmount.div(divisor);
  const minimumWageDifference = hourlyWage.minus(MINIMUM_HOURLY_WAGE_2026);

  return {
    hourlyWage,
    dailyPay: hourlyWage.mul(input.dailyHours),
    weeklyPay: hourlyWage.mul(weeklyPaidHours),
    monthlyPay: hourlyWage.mul(monthlyPaidHours),
    annualPay: hourlyWage.mul(annualPaidHours),
    paidHolidayHours,
    weeklyPaidHours,
    monthlyPaidHours,
    minimumWageDifference,
    meetsMinimumWage: minimumWageDifference.gte(0),
  };
}

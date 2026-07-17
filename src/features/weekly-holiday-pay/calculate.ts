import Decimal from "decimal.js";

export type WeeklyHolidayPayInput = {
  hourlyWage: Decimal;
  weeklyHours: Decimal;
  completedScheduledDays: boolean;
};

export type WeeklyHolidayPayResult = {
  eligible: boolean;
  paidHolidayHours: Decimal;
  weeklyHolidayPay: Decimal;
  weeklyWorkPay: Decimal;
  weeklyTotalPay: Decimal;
  estimatedMonthlyHolidayPay: Decimal;
};

export function calculateWeeklyHolidayPay(
  input: WeeklyHolidayPayInput,
): WeeklyHolidayPayResult {
  const eligible =
    input.completedScheduledDays && input.weeklyHours.greaterThanOrEqualTo(15);
  const paidHolidayHours = eligible
    ? Decimal.min(input.weeklyHours.div(5), 8)
    : new Decimal(0);
  const weeklyHolidayPay = input.hourlyWage.mul(paidHolidayHours);
  const weeklyWorkPay = input.hourlyWage.mul(input.weeklyHours);

  return {
    eligible,
    paidHolidayHours,
    weeklyHolidayPay,
    weeklyWorkPay,
    weeklyTotalPay: weeklyWorkPay.add(weeklyHolidayPay),
    estimatedMonthlyHolidayPay: weeklyHolidayPay.mul("4.345"),
  };
}

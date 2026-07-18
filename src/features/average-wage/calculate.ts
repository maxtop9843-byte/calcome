import Decimal from "decimal.js";

export type AverageWageInput = {
  wageTotal: Decimal;
  calendarDays: Decimal;
  ordinaryDailyWage?: Decimal;
};

export type AverageWageResult = {
  wageTotal: Decimal;
  calendarDays: Decimal;
  calculatedDailyWage: Decimal;
  ordinaryDailyWage?: Decimal;
  appliedDailyWage?: Decimal;
  ordinaryWageCompared: boolean;
  thirtyDayWage: Decimal;
};

export function calculateAverageWage(
  input: AverageWageInput,
): AverageWageResult {
  const calculatedDailyWage = input.wageTotal.div(input.calendarDays);
  const appliedDailyWage = input.ordinaryDailyWage
    ? Decimal.max(calculatedDailyWage, input.ordinaryDailyWage)
    : undefined;
  return {
    ...input,
    calculatedDailyWage,
    appliedDailyWage,
    ordinaryWageCompared: Boolean(input.ordinaryDailyWage),
    thirtyDayWage: (appliedDailyWage ?? calculatedDailyWage).mul(30),
  };
}

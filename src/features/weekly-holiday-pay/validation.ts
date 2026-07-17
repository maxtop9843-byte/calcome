import Decimal from "decimal.js";

const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;
const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

export type WeeklyHolidayPayFormValues = {
  hourlyWage: string;
  weeklyHours: string;
};

export type ValidatedWeeklyHolidayPayInput = {
  hourlyWage: Decimal;
  weeklyHours: Decimal;
};

function parseDecimal(value: string, pattern: RegExp): Decimal | null {
  const trimmed = value.trim();
  if (!pattern.test(trimmed)) return null;

  try {
    const parsed = new Decimal(trimmed.replaceAll(",", ""));
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateWeeklyHolidayPayInput(
  values: WeeklyHolidayPayFormValues,
): ValidatedWeeklyHolidayPayInput | null {
  const hourlyWage = parseDecimal(values.hourlyWage, MONEY_PATTERN);
  const weeklyHours = parseDecimal(values.weeklyHours, DECIMAL_PATTERN);

  if (
    !hourlyWage ||
    hourlyWage.lte(0) ||
    !weeklyHours ||
    weeklyHours.lte(0) ||
    weeklyHours.gt(40)
  ) {
    return null;
  }

  return { hourlyWage, weeklyHours };
}

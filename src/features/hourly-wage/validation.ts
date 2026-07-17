import Decimal from "decimal.js";

import type { HourlyWageFormValues, HourlyWageInput, PayUnit } from "./types";

const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;
const PAY_UNITS: readonly PayUnit[] = [
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "annual",
];

function parse(value: string, pattern: RegExp): Decimal | null {
  const trimmed = value.trim();
  if (!pattern.test(trimmed)) return null;
  try {
    const parsed = new Decimal(trimmed.replaceAll(",", ""));
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateHourlyWageInput(
  values: HourlyWageFormValues,
): HourlyWageInput | null {
  const payAmount = parse(values.payAmount, MONEY_PATTERN);
  const dailyHours = parse(values.dailyHours, DECIMAL_PATTERN);
  const weeklyHours = parse(values.weeklyHours, DECIMAL_PATTERN);

  if (
    !payAmount ||
    payAmount.lte(0) ||
    payAmount.gt("1000000000000000") ||
    !dailyHours ||
    dailyHours.lte(0) ||
    dailyHours.gt(8) ||
    !weeklyHours ||
    weeklyHours.lte(0) ||
    weeklyHours.gt(40) ||
    !PAY_UNITS.includes(values.payUnit)
  ) {
    return null;
  }

  return {
    payAmount,
    payUnit: values.payUnit,
    dailyHours,
    weeklyHours,
    includePaidHoliday: values.includePaidHoliday,
  };
}

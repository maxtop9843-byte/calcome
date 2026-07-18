import Decimal from "decimal.js";

const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;

export function validateMinimumWageHours(value: string): Decimal | null {
  const trimmed = value.trim();
  if (!DECIMAL_PATTERN.test(trimmed)) return null;

  try {
    const hours = new Decimal(trimmed);
    return hours.isFinite() && hours.gt(0) && hours.lte(40) ? hours : null;
  } catch {
    return null;
  }
}

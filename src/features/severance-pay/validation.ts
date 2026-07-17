import Decimal from "decimal.js";

import { MAX_AVERAGE_DAILY_WAGE, MAX_SERVICE_YEARS } from "./constants";
import { getSeveranceDictionary, type SeveranceLocale } from "./i18n";
import type {
  SeveranceErrors,
  SeveranceFormValues,
  SeveranceInput,
} from "./types";

const INTEGER = /^\d+$/;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

function dateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const time = Date.UTC(year, month - 1, day);
  const date = new Date(time);
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? time
    : null;
}

export function validateSeveranceForm(
  values: SeveranceFormValues,
  locale: SeveranceLocale = "ko",
): { data?: SeveranceInput; errors: SeveranceErrors } {
  const copy = getSeveranceDictionary(locale).validation;
  const errors: SeveranceErrors = {};
  const wageText = values.averageDailyWage.trim();
  let wage: Decimal | null = null;
  if (!wageText) errors.averageDailyWage = copy.wageRequired;
  else if (MONEY.test(wageText))
    wage = new Decimal(wageText.replaceAll(",", ""));
  if (wageText && (!wage || wage.lte(0) || wage.gt(MAX_AVERAGE_DAILY_WAGE)))
    errors.averageDailyWage = copy.wageInvalid;

  let serviceDays: Decimal | null = null;
  if (values.periodMode === "dates") {
    const start = dateValue(values.startDate);
    const end = dateValue(values.endDate);
    if (!values.startDate) errors.startDate = copy.startRequired;
    if (!values.endDate) errors.endDate = copy.endRequired;
    if (start !== null && end !== null) {
      if (end <= start) errors.endDate = copy.dateOrder;
      else serviceDays = new Decimal(end - start).div(86_400_000);
    }
  } else {
    const entries = [
      values.yearsWorked,
      values.monthsWorked,
      values.daysWorked,
    ];
    if (!entries.some((value) => value.trim()))
      errors.yearsWorked = copy.manualRequired;
    const validInteger = (value: string) => value === "" || INTEGER.test(value);
    if (
      !validInteger(values.yearsWorked) ||
      Number(values.yearsWorked || 0) > MAX_SERVICE_YEARS
    )
      errors.yearsWorked = copy.yearsInvalid;
    if (
      !validInteger(values.monthsWorked) ||
      Number(values.monthsWorked || 0) > 11
    )
      errors.monthsWorked = copy.monthsInvalid;
    if (
      !validInteger(values.daysWorked) ||
      Number(values.daysWorked || 0) > 364
    )
      errors.daysWorked = copy.daysInvalid;
    if (!errors.yearsWorked && !errors.monthsWorked && !errors.daysWorked) {
      serviceDays = new Decimal(values.yearsWorked || 0)
        .mul(365)
        .plus(new Decimal(values.monthsWorked || 0).mul(365).div(12))
        .plus(values.daysWorked || 0);
    }
  }

  if (serviceDays && serviceDays.lt(365)) {
    const field = values.periodMode === "dates" ? "endDate" : "yearsWorked";
    errors[field] = copy.minimumService;
  }
  if (serviceDays && serviceDays.gt(new Decimal(MAX_SERVICE_YEARS).mul(365))) {
    const field = values.periodMode === "dates" ? "endDate" : "yearsWorked";
    errors[field] = copy.maximumService;
  }
  if (Object.keys(errors).length || !wage || !serviceDays) return { errors };
  return {
    errors,
    data: {
      averageDailyWage: wage.toString(),
      serviceDays: serviceDays.toString(),
    },
  };
}

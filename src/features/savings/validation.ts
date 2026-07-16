import Decimal from "decimal.js";

import { GENERAL_SAVINGS_TAX_RATE } from "./constants";
import { getSavingsDictionary, type SavingsLocale } from "./i18n";
import type {
  SavingsFormValues,
  SavingsInput,
  SavingsValidationErrors,
} from "./types";

const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)$/;
const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;

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

export function validateSavingsForm(
  values: SavingsFormValues,
  locale: SavingsLocale = "ko",
): {
  data?: SavingsInput;
  errors: SavingsValidationErrors;
} {
  const errors: SavingsValidationErrors = {};
  const copy = getSavingsDictionary(locale).validation;
  const deposit = parseDecimal(values.regularDeposit, MONEY_PATTERN);
  const period = parseDecimal(values.savingsPeriod, /^\d+$/);
  const rate = parseDecimal(values.annualInterestRate, DECIMAL_PATTERN);
  const customTax = parseDecimal(values.customTaxRate, DECIMAL_PATTERN);

  if (!deposit || deposit.lt(1000) || deposit.gt("1000000000")) {
    errors.regularDeposit = copy.deposit;
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.savingsPeriod = copy.period;
  }
  if (!(values.periodUnit === "months" || values.periodUnit === "years")) {
    errors.periodUnit = copy.periodUnit;
  }
  if (!rate || rate.isNegative() || rate.gt(100)) {
    errors.annualInterestRate = copy.rate;
  }
  if (!(
    values.depositFrequency === "monthly" ||
    values.depositFrequency === "yearly"
  )) {
    errors.depositFrequency = copy.frequency;
  }
  if (!(
    values.interestMethod === "simple" || values.interestMethod === "compound"
  )) {
    errors.interestMethod = copy.method;
  }
  if (!(
    values.depositTiming === "beginning" || values.depositTiming === "end"
  )) {
    errors.depositTiming = copy.timing;
  }
  if (
    !(["tax-free", "general", "custom"] as string[]).includes(values.taxOption)
  ) {
    errors.taxOption = copy.tax;
  }
  if (
    values.taxOption === "custom" &&
    (!customTax || customTax.isNegative() || customTax.gt(100))
  ) {
    errors.customTaxRate = copy.customTax;
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(1200)) {
    errors.savingsPeriod = copy.maxPeriod;
  } else if (
    months &&
    values.depositFrequency === "yearly" &&
    (months.lt(12) || !months.mod(12).isZero())
  ) {
    errors.savingsPeriod = copy.yearlyPeriod;
  }

  if (!values.regularDeposit.trim())
    errors.regularDeposit = copy.requiredDeposit;
  if (!values.savingsPeriod.trim()) errors.savingsPeriod = copy.requiredPeriod;
  if (!values.annualInterestRate.trim())
    errors.annualInterestRate = copy.requiredRate;
  if (Object.keys(errors).length) return { errors };

  const taxRate =
    values.taxOption === "tax-free"
      ? "0"
      : values.taxOption === "general"
        ? GENERAL_SAVINGS_TAX_RATE
        : customTax!.toString();

  return {
    errors,
    data: {
      regularDeposit: deposit!.toString(),
      depositFrequency: values.depositFrequency,
      months: months!.toNumber(),
      annualInterestRate: rate!.toString(),
      interestMethod: values.interestMethod,
      depositTiming: values.depositTiming,
      taxRate,
      taxOption: values.taxOption,
    },
  };
}

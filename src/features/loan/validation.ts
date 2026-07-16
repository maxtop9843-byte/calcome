import Decimal from "decimal.js";

import { getLoanDictionary, type LoanLocale } from "./i18n";
import type { LoanFormValues, LoanInput, LoanValidationErrors } from "./types";

const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)$/;
const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;

function decimalValue(value: string, pattern: RegExp): Decimal | null {
  const normalized = value.trim().replaceAll(",", "");
  if (!pattern.test(value.trim())) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateLoanForm(
  values: LoanFormValues,
  locale: LoanLocale = "ko",
): {
  data?: LoanInput;
  errors: LoanValidationErrors;
} {
  const errors: LoanValidationErrors = {};
  const copy = getLoanDictionary(locale).validation;
  const amount = decimalValue(values.loanAmount, MONEY_PATTERN);
  const rate = decimalValue(values.annualInterestRate, DECIMAL_PATTERN);
  const period = decimalValue(values.loanPeriod, /^\d+$/);

  if (!amount || amount.lt(10000) || amount.gt("1000000000000")) {
    errors.loanAmount = copy.amount;
  }
  if (!rate || rate.isNegative() || rate.gt(100)) {
    errors.annualInterestRate = copy.rate;
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.loanPeriod = copy.period;
  }
  if (!(values.periodUnit === "months" || values.periodUnit === "years")) {
    errors.periodUnit = copy.periodUnit;
  }
  if (
    !(["equal-payment", "equal-principal", "bullet"] as string[]).includes(
      values.repaymentType,
    )
  ) {
    errors.repaymentType = copy.repaymentType;
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(1200)) {
    errors.loanPeriod = copy.maxPeriod;
  }
  if (!values.loanAmount.trim()) errors.loanAmount = copy.requiredAmount;
  if (!values.annualInterestRate.trim())
    errors.annualInterestRate = copy.requiredRate;
  if (!values.loanPeriod.trim()) errors.loanPeriod = copy.requiredPeriod;

  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: {
      loanAmount: amount!.toString(),
      annualInterestRate: rate!.toString(),
      months: months!.toNumber(),
      repaymentType: values.repaymentType,
    },
  };
}

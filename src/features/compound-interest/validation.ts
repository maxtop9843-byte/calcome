import Decimal from "decimal.js";

import type {
  CompoundInterestFormValues,
  CompoundInterestInput,
  ValidationErrors,
} from "./types";
import { getCompoundDictionary, type CompoundLocale } from "./i18n";

const MONEY_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)$/;
const DECIMAL_PATTERN = /^\d+(?:\.\d+)?$/;

function parseNumber(
  value: string,
  pattern: RegExp,
): { decimal?: Decimal; normalized?: string } {
  const trimmed = value.trim();
  if (!trimmed || !pattern.test(trimmed)) return {};

  try {
    const decimal = new Decimal(trimmed.replaceAll(",", ""));
    if (!decimal.isFinite()) return {};
    return { decimal, normalized: decimal.toString() };
  } catch {
    return {};
  }
}

function validateMoney(
  value: string,
  label: string,
  maximum: Decimal.Value,
  messages: ReturnType<typeof getCompoundDictionary>["validation"],
): { value?: string; error?: string } {
  const parsed = parseNumber(value, MONEY_PATTERN);
  if (!parsed.decimal || parsed.normalized === undefined) {
    return { error: messages.moneyInvalid(label) };
  }
  if (parsed.decimal.isNegative() || parsed.decimal.gt(maximum)) {
    return { error: messages.moneyRange(label) };
  }
  return { value: parsed.normalized };
}

function validatePercent(
  value: string,
  label: string,
  messages: ReturnType<typeof getCompoundDictionary>["validation"],
  optional = false,
): { value?: string | null; error?: string } {
  if (optional && value.trim() === "") return { value: null };
  const parsed = parseNumber(value, DECIMAL_PATTERN);
  if (!parsed.decimal || parsed.normalized === undefined) {
    return { error: messages.percentInvalid(label) };
  }
  if (parsed.decimal.isNegative() || parsed.decimal.gt(100)) {
    return { error: messages.percentRange(label) };
  }
  return { value: parsed.normalized };
}

export function validateCompoundInterestForm(
  values: CompoundInterestFormValues,
  locale: CompoundLocale = "ko",
): {
  data?: CompoundInterestInput;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};
  const messages = getCompoundDictionary(locale).validation;
  const principal = validateMoney(
    values.initialPrincipal,
    messages.principalLabel,
    "100000000000",
    messages,
  );
  const contribution = validateMoney(
    values.recurringContribution,
    messages.contributionLabel,
    "1000000000",
    messages,
  );
  const interest = validatePercent(
    values.annualInterestRate,
    messages.rateLabel,
    messages,
  );
  const inflation = validatePercent(
    values.inflationRate,
    messages.inflationLabel,
    messages,
    true,
  );
  const tax = validatePercent(
    values.taxRate,
    messages.taxLabel,
    messages,
    true,
  );

  if (principal.error) errors.initialPrincipal = principal.error;
  if (contribution.error) errors.recurringContribution = contribution.error;
  if (interest.error) errors.annualInterestRate = interest.error;
  if (inflation.error) errors.inflationRate = inflation.error;
  if (tax.error) errors.taxRate = tax.error;

  const duration = parseNumber(values.durationYears, /^\d+$/);
  if (
    !duration.decimal ||
    !duration.decimal.isInteger() ||
    duration.decimal.lt(1) ||
    duration.decimal.gt(100)
  ) {
    errors.durationYears = messages.duration;
  }

  if (
    !(["monthly", "yearly"] as string[]).includes(values.contributionFrequency)
  ) {
    errors.contributionFrequency = messages.contributionFrequency;
  }
  if (
    !(
      ["yearly", "semiannually", "quarterly", "monthly", "daily"] as string[]
    ).includes(values.compoundingFrequency)
  ) {
    errors.compoundingFrequency = messages.compoundingFrequency;
  }
  if (!(["beginning", "end"] as string[]).includes(values.contributionTiming)) {
    errors.contributionTiming = messages.timing;
  }

  if (
    principal.value !== undefined &&
    contribution.value !== undefined &&
    new Decimal(principal.value).isZero() &&
    new Decimal(contribution.value).isZero()
  ) {
    const message = messages.positiveMoney;
    errors.initialPrincipal = message;
    errors.recurringContribution = message;
  }

  if (!values.initialPrincipal.trim())
    errors.initialPrincipal = messages.requiredPrincipal;
  if (!values.recurringContribution.trim())
    errors.recurringContribution = messages.requiredContribution;
  if (!values.durationYears.trim())
    errors.durationYears = messages.requiredDuration;
  if (!values.annualInterestRate.trim())
    errors.annualInterestRate = messages.requiredRate;
  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    data: {
      initialPrincipal: principal.value!,
      recurringContribution: contribution.value!,
      contributionFrequency: values.contributionFrequency,
      durationYears: duration.decimal!.toNumber(),
      annualInterestRate: interest.value!,
      compoundingFrequency: values.compoundingFrequency,
      contributionTiming: values.contributionTiming,
      inflationRate: inflation.value ?? null,
      taxRate: tax.value ?? null,
    },
  };
}

import Decimal from "decimal.js";

import type {
  CompoundInterestFormValues,
  CompoundInterestInput,
  ValidationErrors,
} from "./types";

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
): { value?: string; error?: string } {
  const parsed = parseNumber(value, MONEY_PATTERN);
  if (!parsed.decimal || parsed.normalized === undefined) {
    return { error: `${label}을(를) 원 단위의 숫자로 입력해 주세요.` };
  }
  if (parsed.decimal.isNegative() || parsed.decimal.gt(maximum)) {
    return { error: `${label}은(는) 0원 이상 허용 범위 이하여야 합니다.` };
  }
  return { value: parsed.normalized };
}

function validatePercent(
  value: string,
  label: string,
  optional = false,
): { value?: string | null; error?: string } {
  if (optional && value.trim() === "") return { value: null };
  const parsed = parseNumber(value, DECIMAL_PATTERN);
  if (!parsed.decimal || parsed.normalized === undefined) {
    return { error: `${label}을(를) 0%에서 100% 사이의 숫자로 입력해 주세요.` };
  }
  if (parsed.decimal.isNegative() || parsed.decimal.gt(100)) {
    return { error: `${label}은(는) 0%에서 100% 사이여야 합니다.` };
  }
  return { value: parsed.normalized };
}

export function validateCompoundInterestForm(
  values: CompoundInterestFormValues,
): {
  data?: CompoundInterestInput;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};
  const principal = validateMoney(
    values.initialPrincipal,
    "초기 원금",
    "100000000000",
  );
  const contribution = validateMoney(
    values.recurringContribution,
    "정기 납입액",
    "1000000000",
  );
  const interest = validatePercent(values.annualInterestRate, "연 이자율");
  const inflation = validatePercent(values.inflationRate, "물가상승률", true);
  const tax = validatePercent(values.taxRate, "간이 세율", true);

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
    errors.durationYears = "투자 기간은 1년에서 100년 사이의 정수여야 합니다.";
  }

  if (
    !(["monthly", "yearly"] as string[]).includes(values.contributionFrequency)
  ) {
    errors.contributionFrequency = "지원하는 납입 주기를 선택해 주세요.";
  }
  if (
    !(
      ["yearly", "semiannually", "quarterly", "monthly", "daily"] as string[]
    ).includes(values.compoundingFrequency)
  ) {
    errors.compoundingFrequency = "지원하는 복리 주기를 선택해 주세요.";
  }
  if (!(["beginning", "end"] as string[]).includes(values.contributionTiming)) {
    errors.contributionTiming = "납입 시점을 선택해 주세요.";
  }

  if (
    principal.value !== undefined &&
    contribution.value !== undefined &&
    new Decimal(principal.value).isZero() &&
    new Decimal(contribution.value).isZero()
  ) {
    const message = "초기 원금과 정기 납입액 중 하나는 0원보다 커야 합니다.";
    errors.initialPrincipal = message;
    errors.recurringContribution = message;
  }

  if (!values.initialPrincipal.trim())
    errors.initialPrincipal = "초기 원금을 입력해 주세요.";
  if (!values.recurringContribution.trim())
    errors.recurringContribution = "정기 납입액을 입력해 주세요.";
  if (!values.durationYears.trim())
    errors.durationYears = "투자 기간을 입력해 주세요.";
  if (!values.annualInterestRate.trim())
    errors.annualInterestRate = "연 이자율을 입력해 주세요.";
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

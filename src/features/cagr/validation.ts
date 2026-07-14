import Decimal from "decimal.js";

import { MAX_CAGR_MONTHS, MAX_CAGR_VALUE } from "./constants";
import type { CagrFormValues, CagrInput, CagrValidationErrors } from "./types";

Decimal.set({ precision: 80, rounding: Decimal.ROUND_HALF_UP });

const VALUE_PATTERN = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

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

export function validateCagrForm(values: CagrFormValues): {
  data?: CagrInput;
  errors: CagrValidationErrors;
} {
  const errors: CagrValidationErrors = {};
  const initialValue = parseDecimal(values.initialValue, VALUE_PATTERN);
  const finalValue = parseDecimal(values.finalValue, VALUE_PATTERN);
  const period = parseDecimal(values.investmentPeriod, /^\d+$/);

  if (!initialValue || initialValue.lte(0) || initialValue.gt(MAX_CAGR_VALUE)) {
    errors.initialValue =
      "시작값은 0보다 크고 1조원 이하인 숫자로 입력해 주세요.";
  }
  if (!finalValue || finalValue.isNegative() || finalValue.gt(MAX_CAGR_VALUE)) {
    errors.finalValue = "종료값은 0 이상 1조원 이하인 숫자로 입력해 주세요.";
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.investmentPeriod = "투자 기간은 1 이상의 정수로 입력해 주세요.";
  }
  if (!(values.periodUnit === "years" || values.periodUnit === "months")) {
    errors.periodUnit = "투자 기간 단위를 선택해 주세요.";
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(MAX_CAGR_MONTHS)) {
    errors.investmentPeriod =
      "투자 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.";
  }

  if (Object.keys(errors).length) return { errors };

  return {
    errors,
    data: {
      initialValue: initialValue!.toString(),
      finalValue: finalValue!.toString(),
      years: months!.div(12).toString(),
    },
  };
}

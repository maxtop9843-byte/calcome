import Decimal from "decimal.js";

import { GENERAL_INTEREST_TAX_RATE } from "./constants";
import type {
  DepositFormValues,
  DepositInput,
  DepositValidationErrors,
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

export function validateDepositForm(values: DepositFormValues): {
  data?: DepositInput;
  errors: DepositValidationErrors;
} {
  const errors: DepositValidationErrors = {};
  const amount = parseDecimal(values.depositAmount, MONEY_PATTERN);
  const period = parseDecimal(values.depositPeriod, /^\d+$/);
  const rate = parseDecimal(values.annualInterestRate, DECIMAL_PATTERN);
  const customTax = parseDecimal(values.customTaxRate, DECIMAL_PATTERN);

  if (!amount || amount.lt(10000) || amount.gt("1000000000000")) {
    errors.depositAmount =
      "예치 금액은 1만원 이상 1조원 이하의 원 단위 금액으로 입력해 주세요.";
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.depositPeriod = "예치 기간은 1 이상의 정수로 입력해 주세요.";
  }
  if (!(values.periodUnit === "months" || values.periodUnit === "years")) {
    errors.periodUnit = "예치 기간 단위를 선택해 주세요.";
  }
  if (!rate || rate.isNegative() || rate.gt(100)) {
    errors.annualInterestRate =
      "연 이자율은 0% 이상 100% 이하로 입력해 주세요.";
  }
  if (!(
    values.interestMethod === "simple" || values.interestMethod === "compound"
  )) {
    errors.interestMethod = "이자 방식을 선택해 주세요.";
  }
  if (
    !(["tax-free", "general", "custom"] as string[]).includes(values.taxOption)
  ) {
    errors.taxOption = "세금 옵션을 선택해 주세요.";
  }
  if (
    values.taxOption === "custom" &&
    (!customTax || customTax.isNegative() || customTax.gt(100))
  ) {
    errors.customTaxRate =
      "사용자 지정 세율은 0% 이상 100% 이하로 입력해 주세요.";
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(1200)) {
    errors.depositPeriod =
      "예치 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.";
  }

  if (Object.keys(errors).length) return { errors };

  const taxRate =
    values.taxOption === "tax-free"
      ? "0"
      : values.taxOption === "general"
        ? GENERAL_INTEREST_TAX_RATE
        : customTax!.toString();

  return {
    errors,
    data: {
      principal: amount!.toString(),
      months: months!.toNumber(),
      annualInterestRate: rate!.toString(),
      interestMethod: values.interestMethod,
      taxRate,
      taxOption: values.taxOption,
    },
  };
}

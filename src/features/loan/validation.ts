import Decimal from "decimal.js";

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

export function validateLoanForm(values: LoanFormValues): {
  data?: LoanInput;
  errors: LoanValidationErrors;
} {
  const errors: LoanValidationErrors = {};
  const amount = decimalValue(values.loanAmount, MONEY_PATTERN);
  const rate = decimalValue(values.annualInterestRate, DECIMAL_PATTERN);
  const period = decimalValue(values.loanPeriod, /^\d+$/);

  if (!amount || amount.lt(10000) || amount.gt("1000000000000")) {
    errors.loanAmount =
      "대출 금액은 1만원 이상 1조원 이하의 원 단위 금액으로 입력해 주세요.";
  }
  if (!rate || rate.isNegative() || rate.gt(100)) {
    errors.annualInterestRate =
      "연 이자율은 0% 이상 100% 이하로 입력해 주세요.";
  }
  if (!period || !period.isInteger() || period.lt(1)) {
    errors.loanPeriod = "대출 기간은 1 이상의 정수로 입력해 주세요.";
  }
  if (!(values.periodUnit === "months" || values.periodUnit === "years")) {
    errors.periodUnit = "대출 기간 단위를 선택해 주세요.";
  }
  if (
    !(["equal-payment", "equal-principal", "bullet"] as string[]).includes(
      values.repaymentType,
    )
  ) {
    errors.repaymentType = "상환 방식을 선택해 주세요.";
  }

  const months = period
    ? period.mul(values.periodUnit === "years" ? 12 : 1)
    : null;
  if (months && months.gt(1200)) {
    errors.loanPeriod =
      "대출 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.";
  }

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

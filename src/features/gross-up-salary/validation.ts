import Decimal from "decimal.js";
import type { GrossUpSalaryInput, SalaryPeriod } from "./calculate";

export type GrossUpSalaryValues = {
  targetNetSalary: string;
  deductionRate: string;
  period: string;
};
export type GrossUpSalaryErrors = Partial<
  Record<keyof GrossUpSalaryValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const RATE = /^\d+(?:\.\d+)?$/;

function isSalaryPeriod(value: string): value is SalaryPeriod {
  return value === "annual" || value === "monthly";
}

export function validateGrossUpSalary(
  values: GrossUpSalaryValues,
  locale: "ko" | "en",
): { data?: GrossUpSalaryInput; errors: GrossUpSalaryErrors } {
  const errors: GrossUpSalaryErrors = {};
  const salaryText = values.targetNetSalary.trim();
  const rateText = values.deductionRate.trim();
  const period = isSalaryPeriod(values.period) ? values.period : undefined;
  const targetNetSalary = MONEY.test(salaryText)
    ? new Decimal(salaryText.replaceAll(",", ""))
    : null;
  const deductionRate = RATE.test(rateText) ? new Decimal(rateText) : null;

  if (
    !targetNetSalary ||
    targetNetSalary.lte(0) ||
    targetNetSalary.gt(10_000_000_000)
  ) {
    errors.targetNetSalary =
      locale === "ko"
        ? "0보다 크고 100억 원 이하인 목표 실수령액을 입력해 주세요."
        : "Enter a target net salary greater than zero and no more than KRW 10 billion.";
  }
  if (!deductionRate || deductionRate.lt(0) || deductionRate.gte(100)) {
    errors.deductionRate =
      locale === "ko"
        ? "0% 이상 100% 미만의 예상 공제율을 입력해 주세요."
        : "Enter an estimated deduction rate from 0% up to, but not including, 100%.";
  }
  if (!period) {
    errors.period =
      locale === "ko"
        ? "목표 실수령액 단위를 연간 또는 월간으로 선택해 주세요."
        : "Choose an annual or monthly target net salary.";
  }

  return Object.keys(errors).length ||
    !targetNetSalary ||
    !deductionRate ||
    !period
    ? { errors }
    : { errors, data: { targetNetSalary, deductionRate, period } };
}

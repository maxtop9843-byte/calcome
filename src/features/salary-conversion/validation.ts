import Decimal from "decimal.js";
import type { SalaryPeriod } from "./calculate";

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

export function validateSalaryConversion(
  values: { salary: string; period: string },
  locale: "ko" | "en",
): {
  data?: { salary: Decimal; period: SalaryPeriod };
  errors: { salary?: string; period?: string };
} {
  const errors: { salary?: string; period?: string } = {};
  const salaryText = values.salary.trim();
  const salary = MONEY.test(salaryText)
    ? new Decimal(salaryText.replaceAll(",", ""))
    : null;
  if (!salary || salary.lte(0) || salary.gt(10_000_000_000)) {
    errors.salary =
      locale === "ko"
        ? "0보다 크고 100억 원 이하인 급여를 입력해 주세요."
        : "Enter a salary greater than zero and no more than KRW 10 billion.";
  }
  const period =
    values.period === "annual" || values.period === "monthly"
      ? values.period
      : undefined;
  if (!period)
    errors.period =
      locale === "ko"
        ? "연봉 또는 월급을 선택해 주세요."
        : "Choose annual or monthly salary.";
  return salary && period && !Object.keys(errors).length
    ? { errors, data: { salary, period } }
    : { errors };
}

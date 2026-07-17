import Decimal from "decimal.js";
import type { SalaryPeriod, SalaryRaiseInput } from "./calculate";

export type SalaryRaiseValues = {
  salary: string;
  raiseRate: string;
  period: SalaryPeriod;
};
export type SalaryRaiseErrors = Partial<Record<"salary" | "raiseRate", string>>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const RATE = /^\d+(?:\.\d+)?$/;

export function validateSalaryRaise(
  values: SalaryRaiseValues,
  locale: "ko" | "en",
): { data?: SalaryRaiseInput; errors: SalaryRaiseErrors } {
  const errors: SalaryRaiseErrors = {};
  const salaryText = values.salary.trim();
  const rateText = values.raiseRate.trim();
  let salary: Decimal | null = null;
  let raiseRate: Decimal | null = null;
  if (MONEY.test(salaryText))
    salary = new Decimal(salaryText.replaceAll(",", ""));
  if (!salary || salary.lte(0) || salary.gt(10_000_000_000))
    errors.salary =
      locale === "ko"
        ? "0보다 크고 100억 원 이하인 급여를 입력해 주세요."
        : "Enter a salary greater than zero and no more than KRW 10 billion.";
  if (RATE.test(rateText)) raiseRate = new Decimal(rateText);
  if (!raiseRate || raiseRate.lt(0) || raiseRate.gt(1000))
    errors.raiseRate =
      locale === "ko"
        ? "0~1,000% 범위의 인상률을 입력해 주세요."
        : "Enter a raise rate from 0% to 1,000%.";
  return Object.keys(errors).length || !salary || !raiseRate
    ? { errors }
    : { errors, data: { salary, raiseRate, period: values.period } };
}

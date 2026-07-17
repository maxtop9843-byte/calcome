import Decimal from "decimal.js";
import type {
  NetSalaryErrors,
  NetSalaryFormValues,
  NetSalaryInput,
} from "./types";

const number = (value: string) => new Decimal(value.replaceAll(",", "") || 0);
export function validateNetSalary(
  values: NetSalaryFormValues,
  locale: "ko" | "en",
): { data?: NetSalaryInput; errors: NetSalaryErrors } {
  const errors: NetSalaryErrors = {};
  const required =
    locale === "ko" ? "급여를 입력해 주세요." : "Enter a salary.";
  let salary = new Decimal(0),
    bonus = new Decimal(0),
    monthlyNonTaxable = new Decimal(0);
  try {
    salary = number(values.salary);
    if (salary.lte(0)) errors.salary = required;
    else if (salary.gt(10_000_000_000))
      errors.salary =
        locale === "ko"
          ? "100억 원 이하로 입력해 주세요."
          : "Enter no more than KRW 10 billion.";
  } catch {
    errors.salary = required;
  }
  try {
    bonus = number(values.bonus);
    if (bonus.lt(0)) errors.bonus = required;
  } catch {
    errors.bonus = required;
  }
  try {
    monthlyNonTaxable = number(values.monthlyNonTaxable);
    if (monthlyNonTaxable.lt(0)) errors.monthlyNonTaxable = required;
  } catch {
    errors.monthlyNonTaxable = required;
  }
  const dependents = Number(values.dependents),
    children = Number(values.children);
  if (!Number.isInteger(dependents) || dependents < 0 || dependents > 20)
    errors.dependents =
      locale === "ko" ? "0~20명으로 입력해 주세요." : "Enter 0 to 20.";
  if (!Number.isInteger(children) || children < 0 || children > dependents)
    errors.children =
      locale === "ko"
        ? "자녀 수는 부양가족 수 이하여야 합니다."
        : "Children cannot exceed dependents.";
  const monthlyGross =
    values.salaryMode === "annual"
      ? salary.plus(bonus).div(12)
      : salary.plus(bonus.div(12));
  if (monthlyNonTaxable.gt(monthlyGross))
    errors.monthlyNonTaxable =
      locale === "ko"
        ? "월 총급여 이하로 입력해 주세요."
        : "Cannot exceed monthly gross pay.";
  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: { ...values, salary, bonus, monthlyNonTaxable, dependents, children },
  };
}

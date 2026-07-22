import Decimal from "decimal.js";
import type { ComprehensiveIncomeTaxInput } from "./calculate";

export type ComprehensiveIncomeTaxValues = Record<
  | "grossIncome"
  | "necessaryExpenses"
  | "incomeDeduction"
  | "taxRate"
  | "progressiveDeduction"
  | "taxCredit"
  | "localIncomeTaxRate",
  string
>;
export type ComprehensiveIncomeTaxErrors = Partial<
  Record<keyof ComprehensiveIncomeTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateComprehensiveIncomeTax(
  values: ComprehensiveIncomeTaxValues,
  locale: "ko" | "en",
): {
  data?: ComprehensiveIncomeTaxInput;
  errors: ComprehensiveIncomeTaxErrors;
} {
  const errors: ComprehensiveIncomeTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const rate = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    grossIncome: money(values.grossIncome),
    necessaryExpenses: money(values.necessaryExpenses),
    incomeDeduction: money(values.incomeDeduction),
    taxRate: rate(values.taxRate),
    progressiveDeduction: money(values.progressiveDeduction),
    taxCredit: money(values.taxCredit),
    localIncomeTaxRate: rate(values.localIncomeTaxRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  if (
    !parsed.grossIncome ||
    parsed.grossIncome.lte(0) ||
    parsed.grossIncome.gt(100_000_000_000_000)
  )
    errors.grossIncome = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  for (const key of [
    "necessaryExpenses",
    "incomeDeduction",
    "progressiveDeduction",
    "taxCredit",
  ] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100_000_000_000_000))
      errors[key] = message(
        "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount from zero to KRW 100 trillion.",
      );
  }
  for (const key of ["taxRate", "localIncomeTaxRate"] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하인 비율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  }
  if (
    parsed.grossIncome &&
    parsed.necessaryExpenses &&
    parsed.necessaryExpenses.gt(parsed.grossIncome)
  )
    errors.necessaryExpenses = message(
      "필요경비는 총수입금액을 초과할 수 없습니다.",
      "Necessary expenses cannot exceed gross income.",
    );
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as ComprehensiveIncomeTaxInput };
}

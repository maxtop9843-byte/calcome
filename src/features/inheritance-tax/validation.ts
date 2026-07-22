import Decimal from "decimal.js";
import type { InheritanceTaxInput } from "./calculate";

export type InheritanceTaxValues = Record<
  | "grossEstate"
  | "debts"
  | "funeralExpenses"
  | "deductibleAmount"
  | "taxRate"
  | "progressiveDeduction"
  | "filingCreditRate",
  string
>;
export type InheritanceTaxErrors = Partial<
  Record<keyof InheritanceTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateInheritanceTax(
  values: InheritanceTaxValues,
  locale: "ko" | "en",
): { data?: InheritanceTaxInput; errors: InheritanceTaxErrors } {
  const errors: InheritanceTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    grossEstate: money(values.grossEstate),
    debts: money(values.debts),
    funeralExpenses: money(values.funeralExpenses),
    deductibleAmount: money(values.deductibleAmount),
    taxRate: number(values.taxRate),
    progressiveDeduction: money(values.progressiveDeduction),
    filingCreditRate: number(values.filingCreditRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  if (
    !parsed.grossEstate ||
    parsed.grossEstate.lte(0) ||
    parsed.grossEstate.gt(100_000_000_000_000)
  )
    errors.grossEstate = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  for (const key of [
    "debts",
    "funeralExpenses",
    "deductibleAmount",
    "progressiveDeduction",
  ] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100_000_000_000_000))
      errors[key] = message(
        "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount from zero to KRW 100 trillion.",
      );
  }
  for (const key of ["taxRate", "filingCreditRate"] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하인 비율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  }
  if (
    parsed.grossEstate &&
    parsed.debts &&
    parsed.funeralExpenses &&
    parsed.debts.plus(parsed.funeralExpenses).gt(parsed.grossEstate)
  )
    errors.debts = message(
      "채무와 장례비용 합계는 총상속재산가액보다 클 수 없습니다.",
      "Debts and funeral expenses cannot exceed the gross estate.",
    );
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as InheritanceTaxInput };
}

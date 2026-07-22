import Decimal from "decimal.js";
import type { CapitalGainsTaxInput } from "./calculate";

export type CapitalGainsTaxValues = Record<
  | "salePrice"
  | "acquisitionPrice"
  | "deductibleExpenses"
  | "basicDeduction"
  | "incomeTaxRate"
  | "localIncomeTaxRate",
  string
>;
export type CapitalGainsTaxErrors = Partial<
  Record<keyof CapitalGainsTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateCapitalGainsTax(
  values: CapitalGainsTaxValues,
  locale: "ko" | "en",
): { data?: CapitalGainsTaxInput; errors: CapitalGainsTaxErrors } {
  const errors: CapitalGainsTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    salePrice: money(values.salePrice),
    acquisitionPrice: money(values.acquisitionPrice),
    deductibleExpenses: money(values.deductibleExpenses),
    basicDeduction: money(values.basicDeduction),
    incomeTaxRate: number(values.incomeTaxRate),
    localIncomeTaxRate: number(values.localIncomeTaxRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  for (const key of ["salePrice", "acquisitionPrice"] as const) {
    const value = parsed[key];
    if (!value || value.lte(0) || value.gt(10_000_000_000_000))
      errors[key] = message(
        "0보다 크고 10조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount greater than zero and no more than KRW 10 trillion.",
      );
  }
  for (const key of ["deductibleExpenses", "basicDeduction"] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(10_000_000_000_000))
      errors[key] = message(
        "0원 이상 10조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount from zero to KRW 10 trillion.",
      );
  }
  for (const key of ["incomeTaxRate", "localIncomeTaxRate"] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하의 세율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  }
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as CapitalGainsTaxInput };
}

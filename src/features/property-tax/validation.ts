import Decimal from "decimal.js";
import type { PropertyTaxInput } from "./calculate";

export type PropertyTaxValues = Record<
  | "assessedValue"
  | "taxBaseRate"
  | "propertyTaxRate"
  | "progressiveDeduction"
  | "cityAreaTaxRate",
  string
>;
export type PropertyTaxErrors = Partial<
  Record<keyof PropertyTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validatePropertyTax(
  values: PropertyTaxValues,
  locale: "ko" | "en",
): { data?: PropertyTaxInput; errors: PropertyTaxErrors } {
  const errors: PropertyTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    assessedValue: money(values.assessedValue),
    taxBaseRate: number(values.taxBaseRate),
    propertyTaxRate: number(values.propertyTaxRate),
    progressiveDeduction: money(values.progressiveDeduction),
    cityAreaTaxRate: number(values.cityAreaTaxRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  if (
    !parsed.assessedValue ||
    parsed.assessedValue.lte(0) ||
    parsed.assessedValue.gt(100_000_000_000_000)
  )
    errors.assessedValue = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  if (
    !parsed.progressiveDeduction ||
    parsed.progressiveDeduction.lt(0) ||
    parsed.progressiveDeduction.gt(100_000_000_000_000)
  )
    errors.progressiveDeduction = message(
      "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount from zero to KRW 100 trillion.",
    );
  for (const key of [
    "taxBaseRate",
    "propertyTaxRate",
    "cityAreaTaxRate",
  ] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하인 비율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  }
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as PropertyTaxInput };
}

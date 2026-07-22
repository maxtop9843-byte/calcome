import Decimal from "decimal.js";
import type { ComprehensiveRealEstateHoldingTaxInput } from "./calculate";

export type ComprehensiveRealEstateHoldingTaxValues = Record<
  | "aggregateAssessedValue"
  | "basicDeduction"
  | "fairMarketValueRate"
  | "taxRate"
  | "progressiveDeduction"
  | "deductiblePropertyTax",
  string
>;
export type ComprehensiveRealEstateHoldingTaxErrors = Partial<
  Record<keyof ComprehensiveRealEstateHoldingTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateComprehensiveRealEstateHoldingTax(
  values: ComprehensiveRealEstateHoldingTaxValues,
  locale: "ko" | "en",
): {
  data?: ComprehensiveRealEstateHoldingTaxInput;
  errors: ComprehensiveRealEstateHoldingTaxErrors;
} {
  const errors: ComprehensiveRealEstateHoldingTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    aggregateAssessedValue: money(values.aggregateAssessedValue),
    basicDeduction: money(values.basicDeduction),
    fairMarketValueRate: number(values.fairMarketValueRate),
    taxRate: number(values.taxRate),
    progressiveDeduction: money(values.progressiveDeduction),
    deductiblePropertyTax: money(values.deductiblePropertyTax),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (
    !parsed.aggregateAssessedValue ||
    parsed.aggregateAssessedValue.lte(0) ||
    parsed.aggregateAssessedValue.gt(100_000_000_000_000)
  )
    errors.aggregateAssessedValue = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  for (const key of [
    "basicDeduction",
    "progressiveDeduction",
    "deductiblePropertyTax",
  ] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100_000_000_000_000))
      errors[key] = message(
        "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount from zero to KRW 100 trillion.",
      );
  }
  for (const key of ["fairMarketValueRate", "taxRate"] as const) {
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
  return {
    errors,
    data: parsed as ComprehensiveRealEstateHoldingTaxInput,
  };
}

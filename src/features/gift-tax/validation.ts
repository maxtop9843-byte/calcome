import Decimal from "decimal.js";
import type { GiftTaxInput } from "./calculate";

export type GiftTaxValues = Record<
  | "giftValue"
  | "assumedDebt"
  | "deductibleAmount"
  | "taxRate"
  | "progressiveDeduction"
  | "filingCreditRate",
  string
>;
export type GiftTaxErrors = Partial<Record<keyof GiftTaxValues, string>>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateGiftTax(
  values: GiftTaxValues,
  locale: "ko" | "en",
): { data?: GiftTaxInput; errors: GiftTaxErrors } {
  const errors: GiftTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    giftValue: money(values.giftValue),
    assumedDebt: money(values.assumedDebt),
    deductibleAmount: money(values.deductibleAmount),
    taxRate: number(values.taxRate),
    progressiveDeduction: money(values.progressiveDeduction),
    filingCreditRate: number(values.filingCreditRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  if (
    !parsed.giftValue ||
    parsed.giftValue.lte(0) ||
    parsed.giftValue.gt(10_000_000_000_000)
  )
    errors.giftValue = message(
      "0보다 크고 10조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 10 trillion.",
    );
  for (const key of [
    "assumedDebt",
    "deductibleAmount",
    "progressiveDeduction",
  ] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(10_000_000_000_000))
      errors[key] = message(
        "0원 이상 10조 원 이하인 금액을 입력해 주세요.",
        "Enter an amount from zero to KRW 10 trillion.",
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
    parsed.assumedDebt &&
    parsed.giftValue &&
    parsed.assumedDebt.gt(parsed.giftValue)
  )
    errors.assumedDebt = message(
      "인수 채무는 증여 재산가액보다 클 수 없습니다.",
      "Assumed debt cannot exceed the gift value.",
    );
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as GiftTaxInput };
}

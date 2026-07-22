import Decimal from "decimal.js";
import type { WithholdingTaxInput } from "./calculate";

export type WithholdingTaxValues = Record<
  | "grossPayment"
  | "nonTaxableAmount"
  | "nationalTaxRate"
  | "localIncomeTaxRate",
  string
>;
export type WithholdingTaxErrors = Partial<
  Record<keyof WithholdingTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateWithholdingTax(
  values: WithholdingTaxValues,
  locale: "ko" | "en",
): { data?: WithholdingTaxInput; errors: WithholdingTaxErrors } {
  const errors: WithholdingTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const rate = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const parsed = {
    grossPayment: money(values.grossPayment),
    nonTaxableAmount: money(values.nonTaxableAmount),
    nationalTaxRate: rate(values.nationalTaxRate),
    localIncomeTaxRate: rate(values.localIncomeTaxRate),
  };
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (
    !parsed.grossPayment ||
    parsed.grossPayment.lte(0) ||
    parsed.grossPayment.gt(100_000_000_000_000)
  )
    errors.grossPayment = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  if (
    !parsed.nonTaxableAmount ||
    parsed.nonTaxableAmount.lt(0) ||
    parsed.nonTaxableAmount.gt(100_000_000_000_000)
  )
    errors.nonTaxableAmount = message(
      "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount from zero to KRW 100 trillion.",
    );
  for (const key of ["nationalTaxRate", "localIncomeTaxRate"] as const) {
    const value = parsed[key];
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하인 비율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  }
  if (
    parsed.grossPayment &&
    parsed.nonTaxableAmount &&
    parsed.nonTaxableAmount.gt(parsed.grossPayment)
  )
    errors.nonTaxableAmount = message(
      "비과세 금액은 지급액을 초과할 수 없습니다.",
      "The non-taxable amount cannot exceed the gross payment.",
    );
  if (
    Object.keys(errors).length ||
    Object.values(parsed).some((value) => !value)
  )
    return { errors };
  return { errors, data: parsed as WithholdingTaxInput };
}

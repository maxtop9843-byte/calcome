import Decimal from "decimal.js";
import type { ValueAddedTaxInput, ValueAddedTaxMode } from "./calculate";

export type ValueAddedTaxValues = {
  amount: string;
  taxRate: string;
  mode: ValueAddedTaxMode;
};
export type ValueAddedTaxErrors = Partial<Record<"amount" | "taxRate", string>>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateValueAddedTax(
  values: ValueAddedTaxValues,
  locale: "ko" | "en",
): { data?: ValueAddedTaxInput; errors: ValueAddedTaxErrors } {
  const errors: ValueAddedTaxErrors = {};
  const amount = MONEY.test(values.amount.trim())
    ? new Decimal(values.amount.replaceAll(",", ""))
    : null;
  const taxRate = NUMBER.test(values.taxRate.trim())
    ? new Decimal(values.taxRate)
    : null;
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (!amount || amount.lte(0) || amount.gt(100_000_000_000_000)) {
    errors.amount = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  }
  if (!taxRate || taxRate.lt(0) || taxRate.gt(100)) {
    errors.taxRate = message(
      "0% 이상 100% 이하인 세율을 입력해 주세요.",
      "Enter a tax rate from 0% to 100%.",
    );
  }

  if (Object.keys(errors).length || !amount || !taxRate) return { errors };
  return { errors, data: { amount, taxRate, mode: values.mode } };
}

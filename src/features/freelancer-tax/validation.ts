import Decimal from "decimal.js";
import type { FreelancerTaxInput } from "./calculate";

export type FreelancerTaxValues = {
  grossPayment: string;
  expenseAmount: string;
};
export type FreelancerTaxErrors = Partial<
  Record<keyof FreelancerTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

export function validateFreelancerTax(
  values: FreelancerTaxValues,
  locale: "ko" | "en",
): { data?: FreelancerTaxInput; errors: FreelancerTaxErrors } {
  const parse = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const grossPayment = parse(values.grossPayment);
  const expenseAmount = parse(values.expenseAmount);
  const errors: FreelancerTaxErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  if (
    !grossPayment ||
    grossPayment.lte(0) ||
    grossPayment.gt(100_000_000_000_000)
  ) {
    errors.grossPayment = message(
      "0보다 크고 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount greater than zero and no more than KRW 100 trillion.",
    );
  }
  if (
    !expenseAmount ||
    expenseAmount.lt(0) ||
    expenseAmount.gt(100_000_000_000_000)
  ) {
    errors.expenseAmount = message(
      "0원 이상 100조 원 이하인 금액을 입력해 주세요.",
      "Enter an amount from zero to KRW 100 trillion.",
    );
  }
  if (grossPayment && expenseAmount && expenseAmount.gt(grossPayment)) {
    errors.expenseAmount = message(
      "제외 금액은 지급액을 초과할 수 없습니다.",
      "The excluded amount cannot exceed the gross payment.",
    );
  }
  return Object.keys(errors).length || !grossPayment || !expenseAmount
    ? { errors }
    : { errors, data: { grossPayment, expenseAmount } };
}

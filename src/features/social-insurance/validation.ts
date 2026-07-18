import Decimal from "decimal.js";
import { EMPLOYMENT_ADDITIONAL_RATES } from "./constants";
import type {
  SocialInsuranceErrors,
  SocialInsuranceFormValues,
  SocialInsuranceInput,
  SocialInsuranceLocale,
} from "./types";

function parse(value: string) {
  return new Decimal(value.replaceAll(",", "").trim());
}
export function validateSocialInsurance(
  values: SocialInsuranceFormValues,
  locale: SocialInsuranceLocale,
): { data?: SocialInsuranceInput; errors: SocialInsuranceErrors } {
  const errors: SocialInsuranceErrors = {};
  const required =
    locale === "ko"
      ? "0보다 큰 금액을 입력해 주세요."
      : "Enter an amount greater than zero.";
  let monthlyPay = new Decimal(0),
    nonTaxablePay = new Decimal(0),
    accidentRate = new Decimal(0);
  const workplaceSize = values.workplaceSize;
  try {
    monthlyPay = parse(values.monthlyPay);
    if (monthlyPay.lte(0) || monthlyPay.gt(1_000_000_000))
      errors.monthlyPay = required;
  } catch {
    errors.monthlyPay = required;
  }
  try {
    nonTaxablePay = values.nonTaxablePay.trim()
      ? parse(values.nonTaxablePay)
      : new Decimal(0);
    if (nonTaxablePay.lt(0) || nonTaxablePay.gte(monthlyPay))
      errors.nonTaxablePay =
        locale === "ko"
          ? "0 이상이며 월 보수보다 작아야 합니다."
          : "Must be zero or more and less than monthly pay.";
  } catch {
    errors.nonTaxablePay =
      locale === "ko"
        ? "올바른 금액을 입력해 주세요."
        : "Enter a valid amount.";
  }
  try {
    accidentRate = values.accidentRate.trim()
      ? parse(values.accidentRate)
      : new Decimal(0);
    if (accidentRate.lt(0) || accidentRate.gt(20))
      errors.accidentRate =
        locale === "ko"
          ? "0~20% 범위로 입력해 주세요."
          : "Enter a rate from 0% to 20%.";
  } catch {
    errors.accidentRate =
      locale === "ko" ? "올바른 요율을 입력해 주세요." : "Enter a valid rate.";
  }
  if (!(workplaceSize in EMPLOYMENT_ADDITIONAL_RATES)) {
    errors.workplaceSize =
      locale === "ko"
        ? "사업장 규모를 선택해 주세요."
        : "Choose a workplace size.";
  }
  return Object.keys(errors).length
    ? { errors }
    : {
        errors,
        data: { monthlyPay, nonTaxablePay, accidentRate, workplaceSize },
      };
}

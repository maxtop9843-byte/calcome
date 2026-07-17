import Decimal from "decimal.js";

import type {
  UnemploymentBenefitErrors,
  UnemploymentBenefitFormValues,
  UnemploymentBenefitInput,
} from "./types";

export function validateUnemploymentBenefit(
  values: UnemploymentBenefitFormValues,
  locale: "ko" | "en",
): { data?: UnemploymentBenefitInput; errors: UnemploymentBenefitErrors } {
  const errors: UnemploymentBenefitErrors = {};
  const invalid =
    locale === "ko" ? "올바른 값을 입력해 주세요." : "Enter a valid value.";
  let wage = new Decimal(0);
  try {
    wage = new Decimal(values.averageDailyWage.replaceAll(",", ""));
    if (wage.lte(0) || wage.gt(10_000_000)) errors.averageDailyWage = invalid;
  } catch {
    errors.averageDailyWage = invalid;
  }
  const insuredMonths = Number(values.insuredMonths);
  const age = Number(values.age);
  const dailyHours = Number(values.dailyHours);
  if (
    values.insuredMonths.trim() === "" ||
    !Number.isInteger(insuredMonths) ||
    insuredMonths < 0 ||
    insuredMonths > 600
  )
    errors.insuredMonths =
      locale === "ko" ? "0~600개월로 입력해 주세요." : "Enter 0 to 600 months.";
  if (!Number.isInteger(age) || age < 15 || age > 100)
    errors.age =
      locale === "ko"
        ? "만 15~100세로 입력해 주세요."
        : "Enter an age from 15 to 100.";
  if (!Number.isInteger(dailyHours) || dailyHours < 1 || dailyHours > 8)
    errors.dailyHours =
      locale === "ko" ? "1~8시간으로 입력해 주세요." : "Enter 1 to 8 hours.";
  if (Object.keys(errors).length) return { errors };
  return {
    errors,
    data: {
      averageDailyWage: wage,
      insuredMonths,
      age,
      dailyHours,
      disabled: values.disabled,
    },
  };
}

import Decimal from "decimal.js";

import {
  DAILY_BENEFIT_CAP,
  MINIMUM_BENEFIT_RATE,
  MINIMUM_HOURLY_WAGE_2026,
  UNEMPLOYMENT_BENEFIT_RATE,
} from "./constants";
import type {
  UnemploymentBenefitInput,
  UnemploymentBenefitResult,
} from "./types";

export function getPrescribedBenefitDays(
  insuredMonths: number,
  olderOrDisabled: boolean,
) {
  if (insuredMonths < 12) return 120;
  if (insuredMonths < 36) return olderOrDisabled ? 180 : 150;
  if (insuredMonths < 60) return olderOrDisabled ? 210 : 180;
  if (insuredMonths < 120) return olderOrDisabled ? 240 : 210;
  return olderOrDisabled ? 270 : 240;
}

export function calculateUnemploymentBenefit(
  input: UnemploymentBenefitInput,
): UnemploymentBenefitResult {
  const calculatedDailyBenefit = input.averageDailyWage.mul(
    UNEMPLOYMENT_BENEFIT_RATE,
  );
  const lowerLimit = new Decimal(MINIMUM_HOURLY_WAGE_2026)
    .mul(input.dailyHours)
    .mul(MINIMUM_BENEFIT_RATE);
  const upperLimit = new Decimal(DAILY_BENEFIT_CAP);
  const dailyBenefit = Decimal.min(
    Decimal.max(calculatedDailyBenefit, lowerLimit),
    upperLimit,
  ).toDecimalPlaces(0, Decimal.ROUND_DOWN);
  const benefitDays = getPrescribedBenefitDays(
    input.insuredMonths,
    input.age >= 50 || input.disabled,
  );

  return {
    averageDailyWage: input.averageDailyWage,
    calculatedDailyBenefit,
    lowerLimit,
    upperLimit,
    dailyBenefit,
    benefitDays,
    totalBenefit: dailyBenefit.mul(benefitDays),
    appliedLimit: calculatedDailyBenefit.lt(lowerLimit)
      ? "lower"
      : calculatedDailyBenefit.gt(upperLimit)
        ? "upper"
        : "none",
  };
}

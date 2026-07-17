import type { UnemploymentBenefitFormValues } from "./types";

export const UNEMPLOYMENT_BENEFIT_RATE = "0.6";
export const DAILY_BENEFIT_CAP = "68100";
export const MINIMUM_HOURLY_WAGE_2026 = "10320";
export const MINIMUM_BENEFIT_RATE = "0.8";
export const MAX_DAILY_HOURS = 8;
export const INITIAL_UNEMPLOYMENT_VALUES: UnemploymentBenefitFormValues = {
  averageDailyWage: "",
  insuredMonths: "",
  age: "",
  dailyHours: "8",
  disabled: false,
};

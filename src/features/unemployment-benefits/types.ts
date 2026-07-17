import type Decimal from "decimal.js";

export type UnemploymentBenefitFormValues = {
  averageDailyWage: string;
  insuredMonths: string;
  age: string;
  dailyHours: string;
  disabled: boolean;
};

export type UnemploymentBenefitInput = {
  averageDailyWage: Decimal;
  insuredMonths: number;
  age: number;
  dailyHours: number;
  disabled: boolean;
};

export type UnemploymentBenefitResult = {
  averageDailyWage: Decimal;
  calculatedDailyBenefit: Decimal;
  lowerLimit: Decimal;
  upperLimit: Decimal;
  dailyBenefit: Decimal;
  benefitDays: number;
  totalBenefit: Decimal;
  appliedLimit: "lower" | "upper" | "none";
};

export type UnemploymentBenefitErrors = Partial<
  Record<"averageDailyWage" | "insuredMonths" | "age" | "dailyHours", string>
>;

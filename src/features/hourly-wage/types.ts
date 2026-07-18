import type Decimal from "decimal.js";

export type HourlyWageLocale = "ko" | "en";
export type PayUnit = "hourly" | "daily" | "weekly" | "monthly" | "annual";

export type HourlyWageInput = {
  payAmount: Decimal;
  payUnit: PayUnit;
  dailyHours: Decimal;
  weeklyHours: Decimal;
  includePaidHoliday: boolean;
};

export type HourlyWageResult = {
  hourlyWage: Decimal;
  dailyPay: Decimal;
  weeklyPay: Decimal;
  monthlyPay: Decimal;
  annualPay: Decimal;
  paidHolidayHours: Decimal;
  weeklyPaidHours: Decimal;
  monthlyPaidHours: Decimal;
  minimumWageDifference: Decimal;
  meetsMinimumWage: boolean;
};

export type HourlyWageFormValues = {
  payAmount: string;
  payUnit: PayUnit;
  dailyHours: string;
  weeklyHours: string;
  includePaidHoliday: boolean;
};

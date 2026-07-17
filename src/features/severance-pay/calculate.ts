import Decimal from "decimal.js";

import type { SeveranceInput, SeveranceResult } from "./types";

Decimal.set({ precision: 80, rounding: Decimal.ROUND_HALF_UP });

export function calculateSeverancePay(input: SeveranceInput): SeveranceResult {
  const averageDailyWage = new Decimal(input.averageDailyWage);
  const serviceDays = new Decimal(input.serviceDays);
  const thirtyDayWage = averageDailyWage.mul(30);
  return {
    estimatedSeverancePay: thirtyDayWage.mul(serviceDays).div(365).toString(),
    averageDailyWage: averageDailyWage.toString(),
    thirtyDayWage: thirtyDayWage.toString(),
    serviceDays: serviceDays.toString(),
    serviceYears: serviceDays.div(365).toString(),
  };
}

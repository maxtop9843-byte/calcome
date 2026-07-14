import Decimal from "decimal.js";

import type { CagrInput, CagrResult } from "./types";

Decimal.set({ precision: 80, rounding: Decimal.ROUND_HALF_UP });

export function calculateCagr(input: CagrInput): CagrResult {
  const initialValue = new Decimal(input.initialValue);
  const finalValue = new Decimal(input.finalValue);
  const years = new Decimal(input.years);
  const valueRatio = finalValue.div(initialValue);
  const cagr = finalValue.isZero()
    ? new Decimal(-1)
    : valueRatio.pow(new Decimal(1).div(years)).minus(1);
  const totalReturn = valueRatio.minus(1);

  return {
    cagrPercent: cagr.mul(100).toString(),
    totalReturnPercent: totalReturn.mul(100).toString(),
    absoluteProfit: finalValue.minus(initialValue).toString(),
    years: years.toString(),
  };
}

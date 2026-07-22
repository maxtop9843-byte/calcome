import Decimal from "decimal.js";

export type JeonseMonthlyRentConversionInput = {
  jeonseDeposit: Decimal;
  monthlyDeposit: Decimal;
  annualRate: Decimal;
};

export type JeonseMonthlyRentConversionResult = {
  convertedDeposit: Decimal;
  annualRent: Decimal;
  monthlyRent: Decimal;
  monthlyRate: Decimal;
};

export function calculateJeonseMonthlyRentConversion({
  jeonseDeposit,
  monthlyDeposit,
  annualRate,
}: JeonseMonthlyRentConversionInput): JeonseMonthlyRentConversionResult {
  const convertedDeposit = jeonseDeposit.minus(monthlyDeposit);
  const annualRent = convertedDeposit.mul(annualRate).div(100);

  return {
    convertedDeposit,
    annualRent,
    monthlyRent: annualRent.div(12),
    monthlyRate: annualRate.div(12),
  };
}

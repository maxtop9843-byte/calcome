import Decimal from "decimal.js";

export type RentConversionRateInput = {
  jeonseDeposit: Decimal;
  monthlyDeposit: Decimal;
  monthlyRent: Decimal;
};

export type RentConversionRateResult = {
  convertedDeposit: Decimal;
  annualRent: Decimal;
  conversionRate: Decimal;
  monthlyConversionRate: Decimal;
};

export function calculateRentConversionRate({
  jeonseDeposit,
  monthlyDeposit,
  monthlyRent,
}: RentConversionRateInput): RentConversionRateResult {
  const convertedDeposit = jeonseDeposit.minus(monthlyDeposit);
  const annualRent = monthlyRent.mul(12);
  const conversionRate = annualRent.div(convertedDeposit).mul(100);

  return {
    convertedDeposit,
    annualRent,
    conversionRate,
    monthlyConversionRate: monthlyRent.div(convertedDeposit).mul(100),
  };
}

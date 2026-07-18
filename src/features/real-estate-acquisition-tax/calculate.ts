import Decimal from "decimal.js";

export type AcquisitionTaxInput = {
  acquisitionPrice: Decimal;
  acquisitionTaxRate: Decimal;
  localEducationTaxRate: Decimal;
  ruralSpecialTaxRate: Decimal;
  otherCosts: Decimal;
};

export type AcquisitionTaxResult = {
  acquisitionTax: Decimal;
  localEducationTax: Decimal;
  ruralSpecialTax: Decimal;
  totalTax: Decimal;
  otherCosts: Decimal;
  totalAcquisitionCost: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateAcquisitionTax(
  input: AcquisitionTaxInput,
): AcquisitionTaxResult {
  const acquisitionTax = input.acquisitionPrice
    .mul(input.acquisitionTaxRate)
    .div(100);
  const localEducationTax = input.acquisitionPrice
    .mul(input.localEducationTaxRate)
    .div(100);
  const ruralSpecialTax = input.acquisitionPrice
    .mul(input.ruralSpecialTaxRate)
    .div(100);
  const totalTax = acquisitionTax.plus(localEducationTax).plus(ruralSpecialTax);

  return {
    acquisitionTax,
    localEducationTax,
    ruralSpecialTax,
    totalTax,
    otherCosts: input.otherCosts,
    totalAcquisitionCost: input.acquisitionPrice
      .plus(totalTax)
      .plus(input.otherCosts),
    effectiveTaxRate: totalTax.div(input.acquisitionPrice).mul(100),
  };
}

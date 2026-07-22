import Decimal from "decimal.js";

export type CapitalGainsTaxInput = {
  salePrice: Decimal;
  acquisitionPrice: Decimal;
  deductibleExpenses: Decimal;
  basicDeduction: Decimal;
  incomeTaxRate: Decimal;
  localIncomeTaxRate: Decimal;
};

export type CapitalGainsTaxResult = {
  grossGain: Decimal;
  taxableGain: Decimal;
  incomeTax: Decimal;
  localIncomeTax: Decimal;
  totalTax: Decimal;
  netProceeds: Decimal;
  afterTaxProfit: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateCapitalGainsTax(
  input: CapitalGainsTaxInput,
): CapitalGainsTaxResult {
  const grossGain = input.salePrice
    .minus(input.acquisitionPrice)
    .minus(input.deductibleExpenses);
  const taxableGain = Decimal.max(grossGain.minus(input.basicDeduction), 0);
  const incomeTax = taxableGain.mul(input.incomeTaxRate).div(100);
  const localIncomeTax = incomeTax.mul(input.localIncomeTaxRate).div(100);
  const totalTax = incomeTax.plus(localIncomeTax);
  const netProceeds = input.salePrice
    .minus(input.deductibleExpenses)
    .minus(totalTax);

  return {
    grossGain,
    taxableGain,
    incomeTax,
    localIncomeTax,
    totalTax,
    netProceeds,
    afterTaxProfit: netProceeds.minus(input.acquisitionPrice),
    effectiveTaxRate: grossGain.gt(0)
      ? totalTax.div(grossGain).mul(100)
      : new Decimal(0),
  };
}

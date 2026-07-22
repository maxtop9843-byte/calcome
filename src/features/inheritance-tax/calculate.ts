import Decimal from "decimal.js";

export type InheritanceTaxInput = {
  grossEstate: Decimal;
  debts: Decimal;
  funeralExpenses: Decimal;
  deductibleAmount: Decimal;
  taxRate: Decimal;
  progressiveDeduction: Decimal;
  filingCreditRate: Decimal;
};

export type InheritanceTaxResult = {
  netEstate: Decimal;
  taxableEstate: Decimal;
  taxBeforeCredit: Decimal;
  filingCredit: Decimal;
  estimatedTax: Decimal;
  estateAfterTax: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateInheritanceTax(
  input: InheritanceTaxInput,
): InheritanceTaxResult {
  const netEstate = Decimal.max(
    input.grossEstate.minus(input.debts).minus(input.funeralExpenses),
    0,
  );
  const taxableEstate = Decimal.max(netEstate.minus(input.deductibleAmount), 0);
  const taxBeforeCredit = Decimal.max(
    taxableEstate.mul(input.taxRate).div(100).minus(input.progressiveDeduction),
    0,
  );
  const filingCredit = taxBeforeCredit.mul(input.filingCreditRate).div(100);
  const estimatedTax = Decimal.max(taxBeforeCredit.minus(filingCredit), 0);
  return {
    netEstate,
    taxableEstate,
    taxBeforeCredit,
    filingCredit,
    estimatedTax,
    estateAfterTax: netEstate.minus(estimatedTax),
    effectiveTaxRate: netEstate.gt(0)
      ? estimatedTax.div(netEstate).mul(100)
      : new Decimal(0),
  };
}

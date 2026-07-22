import Decimal from "decimal.js";

export type ComprehensiveIncomeTaxInput = {
  grossIncome: Decimal;
  necessaryExpenses: Decimal;
  incomeDeduction: Decimal;
  taxRate: Decimal;
  progressiveDeduction: Decimal;
  taxCredit: Decimal;
  localIncomeTaxRate: Decimal;
};

export type ComprehensiveIncomeTaxResult = {
  adjustedIncome: Decimal;
  taxableIncome: Decimal;
  nationalTaxBeforeCredit: Decimal;
  nationalIncomeTax: Decimal;
  localIncomeTax: Decimal;
  totalTax: Decimal;
  incomeAfterTax: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateComprehensiveIncomeTax(
  input: ComprehensiveIncomeTaxInput,
): ComprehensiveIncomeTaxResult {
  const adjustedIncome = Decimal.max(
    input.grossIncome.minus(input.necessaryExpenses),
    0,
  );
  const taxableIncome = Decimal.max(
    adjustedIncome.minus(input.incomeDeduction),
    0,
  );
  const nationalTaxBeforeCredit = Decimal.max(
    taxableIncome.mul(input.taxRate).div(100).minus(input.progressiveDeduction),
    0,
  );
  const nationalIncomeTax = Decimal.max(
    nationalTaxBeforeCredit.minus(input.taxCredit),
    0,
  );
  const localIncomeTax = nationalIncomeTax
    .mul(input.localIncomeTaxRate)
    .div(100);
  const totalTax = nationalIncomeTax.plus(localIncomeTax);

  return {
    adjustedIncome,
    taxableIncome,
    nationalTaxBeforeCredit,
    nationalIncomeTax,
    localIncomeTax,
    totalTax,
    incomeAfterTax: adjustedIncome.minus(totalTax),
    effectiveTaxRate: adjustedIncome.gt(0)
      ? totalTax.div(adjustedIncome).mul(100)
      : new Decimal(0),
  };
}

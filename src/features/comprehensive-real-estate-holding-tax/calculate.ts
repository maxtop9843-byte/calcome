import Decimal from "decimal.js";

export type ComprehensiveRealEstateHoldingTaxInput = {
  aggregateAssessedValue: Decimal;
  basicDeduction: Decimal;
  fairMarketValueRate: Decimal;
  taxRate: Decimal;
  progressiveDeduction: Decimal;
  deductiblePropertyTax: Decimal;
};

export type ComprehensiveRealEstateHoldingTaxResult = {
  amountAfterDeduction: Decimal;
  taxBase: Decimal;
  taxBeforePropertyTaxCredit: Decimal;
  comprehensiveTax: Decimal;
  specialRuralTax: Decimal;
  totalTax: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateComprehensiveRealEstateHoldingTax(
  input: ComprehensiveRealEstateHoldingTaxInput,
): ComprehensiveRealEstateHoldingTaxResult {
  const amountAfterDeduction = Decimal.max(
    input.aggregateAssessedValue.minus(input.basicDeduction),
    0,
  );
  const taxBase = amountAfterDeduction.mul(input.fairMarketValueRate).div(100);
  const taxBeforePropertyTaxCredit = Decimal.max(
    taxBase.mul(input.taxRate).div(100).minus(input.progressiveDeduction),
    0,
  );
  const comprehensiveTax = Decimal.max(
    taxBeforePropertyTaxCredit.minus(input.deductiblePropertyTax),
    0,
  );
  const specialRuralTax = comprehensiveTax.mul(20).div(100);
  const totalTax = comprehensiveTax.plus(specialRuralTax);

  return {
    amountAfterDeduction,
    taxBase,
    taxBeforePropertyTaxCredit,
    comprehensiveTax,
    specialRuralTax,
    totalTax,
    effectiveTaxRate: input.aggregateAssessedValue.gt(0)
      ? totalTax.div(input.aggregateAssessedValue).mul(100)
      : new Decimal(0),
  };
}

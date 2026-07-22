import Decimal from "decimal.js";

export type PropertyTaxInput = {
  assessedValue: Decimal;
  taxBaseRate: Decimal;
  propertyTaxRate: Decimal;
  progressiveDeduction: Decimal;
  cityAreaTaxRate: Decimal;
};

export type PropertyTaxResult = {
  taxBase: Decimal;
  propertyTax: Decimal;
  cityAreaTax: Decimal;
  localEducationTax: Decimal;
  totalTax: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculatePropertyTax(
  input: PropertyTaxInput,
): PropertyTaxResult {
  const taxBase = input.assessedValue.mul(input.taxBaseRate).div(100);
  const propertyTax = Decimal.max(
    taxBase
      .mul(input.propertyTaxRate)
      .div(100)
      .minus(input.progressiveDeduction),
    0,
  );
  const cityAreaTax = taxBase.mul(input.cityAreaTaxRate).div(100);
  const localEducationTax = propertyTax.mul(20).div(100);
  const totalTax = propertyTax.plus(cityAreaTax).plus(localEducationTax);
  return {
    taxBase,
    propertyTax,
    cityAreaTax,
    localEducationTax,
    totalTax,
    effectiveTaxRate: input.assessedValue.gt(0)
      ? totalTax.div(input.assessedValue).mul(100)
      : new Decimal(0),
  };
}

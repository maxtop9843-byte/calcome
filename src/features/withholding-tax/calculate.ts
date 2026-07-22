import Decimal from "decimal.js";

export type WithholdingTaxInput = {
  grossPayment: Decimal;
  nonTaxableAmount: Decimal;
  nationalTaxRate: Decimal;
  localIncomeTaxRate: Decimal;
};

export type WithholdingTaxResult = {
  taxablePayment: Decimal;
  nationalIncomeTax: Decimal;
  localIncomeTax: Decimal;
  totalWithholding: Decimal;
  netPayment: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateWithholdingTax(
  input: WithholdingTaxInput,
): WithholdingTaxResult {
  const taxablePayment = Decimal.max(
    input.grossPayment.minus(input.nonTaxableAmount),
    0,
  );
  const nationalIncomeTax = taxablePayment.mul(input.nationalTaxRate).div(100);
  const localIncomeTax = nationalIncomeTax
    .mul(input.localIncomeTaxRate)
    .div(100);
  const totalWithholding = nationalIncomeTax.plus(localIncomeTax);

  return {
    taxablePayment,
    nationalIncomeTax,
    localIncomeTax,
    totalWithholding,
    netPayment: input.grossPayment.minus(totalWithholding),
    effectiveTaxRate: input.grossPayment.gt(0)
      ? totalWithholding.div(input.grossPayment).mul(100)
      : new Decimal(0),
  };
}

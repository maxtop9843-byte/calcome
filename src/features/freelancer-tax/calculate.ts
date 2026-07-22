import Decimal from "decimal.js";

export type FreelancerTaxInput = {
  grossPayment: Decimal;
  expenseAmount: Decimal;
};

export function calculateFreelancerTax(input: FreelancerTaxInput) {
  const taxablePayment = Decimal.max(
    input.grossPayment.minus(input.expenseAmount),
    0,
  );
  const nationalIncomeTax = taxablePayment.mul(3).div(100);
  const localIncomeTax = taxablePayment.mul(0.3).div(100);
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

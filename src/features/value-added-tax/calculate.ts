import Decimal from "decimal.js";

export type ValueAddedTaxMode = "exclusive" | "inclusive";

export type ValueAddedTaxInput = {
  amount: Decimal;
  taxRate: Decimal;
  mode: ValueAddedTaxMode;
};

export type ValueAddedTaxResult = {
  supplyAmount: Decimal;
  taxAmount: Decimal;
  totalAmount: Decimal;
};

export function calculateValueAddedTax(
  input: ValueAddedTaxInput,
): ValueAddedTaxResult {
  const rate = input.taxRate.div(100);

  if (input.mode === "inclusive") {
    const supplyAmount = input.amount.div(rate.plus(1));
    return {
      supplyAmount,
      taxAmount: input.amount.minus(supplyAmount),
      totalAmount: input.amount,
    };
  }

  const taxAmount = input.amount.mul(rate);
  return {
    supplyAmount: input.amount,
    taxAmount,
    totalAmount: input.amount.plus(taxAmount),
  };
}

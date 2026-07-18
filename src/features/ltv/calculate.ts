import Decimal from "decimal.js";

export type LtvInput = {
  propertyValue: Decimal;
  loanAmount: Decimal;
  targetLtvRate: Decimal;
};

export type LtvResult = {
  propertyValue: Decimal;
  loanAmount: Decimal;
  ltvRate: Decimal;
  ownerEquity: Decimal;
  maximumLoanAtTarget: Decimal;
  remainingLoanCapacity: Decimal;
};

export function calculateLtv(input: LtvInput): LtvResult {
  const maximumLoanAtTarget = input.propertyValue
    .mul(input.targetLtvRate)
    .div(100);

  return {
    ...input,
    ltvRate: input.loanAmount.div(input.propertyValue).mul(100),
    ownerEquity: Decimal.max(input.propertyValue.minus(input.loanAmount), 0),
    maximumLoanAtTarget,
    remainingLoanCapacity: Decimal.max(
      maximumLoanAtTarget.minus(input.loanAmount),
      0,
    ),
  };
}

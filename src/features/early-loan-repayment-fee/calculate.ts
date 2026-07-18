import Decimal from "decimal.js";

export type EarlyRepaymentFeeInput = {
  repaymentAmount: Decimal;
  feeRate: Decimal;
  originalTermMonths: number;
  elapsedMonths: number;
};

export type EarlyRepaymentFeeResult = {
  estimatedFee: Decimal;
  remainingMonths: number;
  remainingTermRatio: Decimal;
  effectiveFeeRate: Decimal;
  netRepaymentAmount: Decimal;
};

export function calculateEarlyRepaymentFee(
  input: EarlyRepaymentFeeInput,
): EarlyRepaymentFeeResult {
  const remainingMonths = Math.max(
    input.originalTermMonths - input.elapsedMonths,
    0,
  );
  const remainingTermRatio = new Decimal(remainingMonths).div(
    input.originalTermMonths,
  );
  const effectiveFeeRate = input.feeRate.mul(remainingTermRatio);
  const estimatedFee = input.repaymentAmount.mul(effectiveFeeRate).div(100);

  return {
    estimatedFee,
    remainingMonths,
    remainingTermRatio,
    effectiveFeeRate,
    netRepaymentAmount: input.repaymentAmount.plus(estimatedFee),
  };
}

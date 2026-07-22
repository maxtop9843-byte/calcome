import Decimal from "decimal.js";

export type RealEstateBrokerageFeeInput = {
  transactionAmount: Decimal;
  feeRate: Decimal;
  vatRate: Decimal;
};

export type RealEstateBrokerageFeeResult = {
  brokerageFee: Decimal;
  vat: Decimal;
  totalFee: Decimal;
  effectiveRate: Decimal;
};

export function calculateRealEstateBrokerageFee({
  transactionAmount,
  feeRate,
  vatRate,
}: RealEstateBrokerageFeeInput): RealEstateBrokerageFeeResult {
  const brokerageFee = transactionAmount.mul(feeRate).div(100);
  const vat = brokerageFee.mul(vatRate).div(100);
  const totalFee = brokerageFee.plus(vat);
  return {
    brokerageFee,
    vat,
    totalFee,
    effectiveRate: totalFee.div(transactionAmount).mul(100),
  };
}

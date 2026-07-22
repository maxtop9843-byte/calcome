import Decimal from "decimal.js";

export type CreditCardInstallmentInterestInput = {
  purchaseAmount: Decimal;
  installmentMonths: number;
  annualFeeRate: Decimal;
};

export type CreditCardInstallmentInterestResult = {
  totalFee: Decimal;
  totalPayment: Decimal;
  averageMonthlyPayment: Decimal;
  firstPayment: Decimal;
  lastPayment: Decimal;
};

export function calculateCreditCardInstallmentInterest({
  purchaseAmount,
  installmentMonths,
  annualFeeRate,
}: CreditCardInstallmentInterestInput): CreditCardInstallmentInterestResult {
  const monthlyPrincipal = purchaseAmount.div(installmentMonths);
  const monthlyRate = annualFeeRate.div(100).div(12);
  const firstFee = purchaseAmount.mul(monthlyRate);
  const lastFee = monthlyPrincipal.mul(monthlyRate);
  const totalFee = firstFee.plus(lastFee).mul(installmentMonths).div(2);
  const totalPayment = purchaseAmount.plus(totalFee);

  return {
    totalFee,
    totalPayment,
    averageMonthlyPayment: totalPayment.div(installmentMonths),
    firstPayment: monthlyPrincipal.plus(firstFee),
    lastPayment: monthlyPrincipal.plus(lastFee),
  };
}

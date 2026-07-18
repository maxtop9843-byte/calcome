import Decimal from "decimal.js";

export type BalloonPaymentInput = {
  principal: Decimal;
  annualRate: Decimal;
  termMonths: number;
  balloonAmount: Decimal;
};

export type BalloonPaymentResult = {
  monthlyPayment: Decimal;
  balloonAmount: Decimal;
  totalRegularPayments: Decimal;
  totalRepayment: Decimal;
  totalInterest: Decimal;
  balloonRatio: Decimal;
};

export function calculateBalloonPayment(
  input: BalloonPaymentInput,
): BalloonPaymentResult {
  const monthlyRate = input.annualRate.div(100).div(12);
  const monthlyPayment = monthlyRate.isZero()
    ? input.principal.minus(input.balloonAmount).div(input.termMonths)
    : input.principal
        .mul(monthlyRate)
        .minus(
          input.balloonAmount
            .mul(monthlyRate)
            .div(monthlyRate.plus(1).pow(input.termMonths)),
        )
        .div(new Decimal(1).minus(monthlyRate.plus(1).pow(-input.termMonths)));
  const totalRegularPayments = monthlyPayment.mul(input.termMonths);
  const totalRepayment = totalRegularPayments.plus(input.balloonAmount);

  return {
    monthlyPayment,
    balloonAmount: input.balloonAmount,
    totalRegularPayments,
    totalRepayment,
    totalInterest: totalRepayment.minus(input.principal),
    balloonRatio: input.balloonAmount.div(input.principal).mul(100),
  };
}

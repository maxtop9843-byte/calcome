import Decimal from "decimal.js";

export type MortgagePaymentInput = {
  homePrice: Decimal;
  downPayment: Decimal;
  annualRate: Decimal;
  termYears: number;
  monthlyCosts: Decimal;
};

export type MortgagePaymentResult = {
  loanAmount: Decimal;
  monthlyPrincipalAndInterest: Decimal;
  estimatedMonthlyPayment: Decimal;
  totalLoanPayments: Decimal;
  totalInterest: Decimal;
  downPaymentRatio: Decimal;
};

export function calculateMortgagePayment(
  input: MortgagePaymentInput,
): MortgagePaymentResult {
  const loanAmount = input.homePrice.minus(input.downPayment);
  const termMonths = input.termYears * 12;
  const monthlyRate = input.annualRate.div(100).div(12);
  const monthlyPrincipalAndInterest = monthlyRate.isZero()
    ? loanAmount.div(termMonths)
    : loanAmount
        .mul(monthlyRate)
        .div(new Decimal(1).minus(monthlyRate.plus(1).pow(-termMonths)));
  const totalLoanPayments = monthlyPrincipalAndInterest.mul(termMonths);

  return {
    loanAmount,
    monthlyPrincipalAndInterest,
    estimatedMonthlyPayment: monthlyPrincipalAndInterest.plus(
      input.monthlyCosts,
    ),
    totalLoanPayments,
    totalInterest: totalLoanPayments.minus(loanAmount),
    downPaymentRatio: input.downPayment.div(input.homePrice).mul(100),
  };
}

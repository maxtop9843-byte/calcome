import Decimal from "decimal.js";

export type CreditLoanInterestInput = {
  loanAmount: Decimal;
  annualRate: Decimal;
  termMonths: number;
  monthlyFees: Decimal;
};

export type CreditLoanInterestResult = {
  monthlyInterest: Decimal;
  monthlyCost: Decimal;
  annualInterest: Decimal;
  totalInterest: Decimal;
  totalFees: Decimal;
  totalCost: Decimal;
  dailyInterest: Decimal;
};

export function calculateCreditLoanInterest(
  input: CreditLoanInterestInput,
): CreditLoanInterestResult {
  const annualInterest = input.loanAmount.mul(input.annualRate).div(100);
  const monthlyInterest = annualInterest.div(12);
  const totalInterest = monthlyInterest.mul(input.termMonths);
  const totalFees = input.monthlyFees.mul(input.termMonths);
  return {
    monthlyInterest,
    monthlyCost: monthlyInterest.plus(input.monthlyFees),
    annualInterest,
    totalInterest,
    totalFees,
    totalCost: totalInterest.plus(totalFees),
    dailyInterest: annualInterest.div(365),
  };
}

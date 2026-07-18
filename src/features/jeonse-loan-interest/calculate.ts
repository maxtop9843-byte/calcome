import Decimal from "decimal.js";

export type JeonseLoanInterestInput = {
  deposit: Decimal;
  ownFunds: Decimal;
  annualRate: Decimal;
  termYears: number;
  monthlyFees: Decimal;
};

export type JeonseLoanInterestResult = {
  loanAmount: Decimal;
  monthlyInterest: Decimal;
  monthlyCost: Decimal;
  annualInterest: Decimal;
  totalInterest: Decimal;
  loanRatio: Decimal;
};

export function calculateJeonseLoanInterest(
  input: JeonseLoanInterestInput,
): JeonseLoanInterestResult {
  const loanAmount = input.deposit.minus(input.ownFunds);
  const monthlyInterest = loanAmount.mul(input.annualRate).div(100).div(12);
  const annualInterest = monthlyInterest.mul(12);
  return {
    loanAmount,
    monthlyInterest,
    monthlyCost: monthlyInterest.plus(input.monthlyFees),
    annualInterest,
    totalInterest: annualInterest.mul(input.termYears),
    loanRatio: loanAmount.div(input.deposit).mul(100),
  };
}

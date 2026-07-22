import Decimal from "decimal.js";

export type LoanAffordabilityInput = {
  annualIncome: Decimal;
  otherMonthlyDebt: Decimal;
  debtServiceLimit: Decimal;
  annualInterestRate: Decimal;
  termYears: Decimal;
};

export type LoanAffordabilityResult = {
  maximumLoan: Decimal;
  availableMonthlyPayment: Decimal;
  maximumMonthlyDebt: Decimal;
  totalRepayment: Decimal;
  totalInterest: Decimal;
  debtServiceLimit: Decimal;
};

export function calculateLoanAffordability(
  input: LoanAffordabilityInput,
): LoanAffordabilityResult {
  const months = input.termYears.mul(12);
  const monthlyRate = input.annualInterestRate.div(100).div(12);
  const maximumMonthlyDebt = input.annualIncome
    .mul(input.debtServiceLimit)
    .div(100)
    .div(12);
  const availableMonthlyPayment = Decimal.max(
    0,
    maximumMonthlyDebt.minus(input.otherMonthlyDebt),
  );
  const maximumLoan = monthlyRate.eq(0)
    ? availableMonthlyPayment.mul(months)
    : availableMonthlyPayment
        .mul(
          new Decimal(1).minus(
            new Decimal(1).plus(monthlyRate).pow(months.neg()),
          ),
        )
        .div(monthlyRate);
  const totalRepayment = availableMonthlyPayment.mul(months);

  return {
    maximumLoan,
    availableMonthlyPayment,
    maximumMonthlyDebt,
    totalRepayment,
    totalInterest: totalRepayment.minus(maximumLoan),
    debtServiceLimit: input.debtServiceLimit,
  };
}

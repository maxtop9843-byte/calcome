import Decimal from "decimal.js";

export type DtiInput = {
  annualIncome: Decimal;
  mortgagePrincipal: Decimal;
  annualInterestRate: Decimal;
  termYears: Decimal;
  otherMonthlyDebt: Decimal;
};

export type DtiResult = {
  mortgageMonthlyPayment: Decimal;
  totalMonthlyDebt: Decimal;
  annualDebtService: Decimal;
  dtiRate: Decimal;
  annualIncome: Decimal;
  otherMonthlyDebt: Decimal;
};

export function calculateDti(input: DtiInput): DtiResult {
  const months = input.termYears.mul(12);
  const monthlyRate = input.annualInterestRate.div(100).div(12);
  const mortgageMonthlyPayment = monthlyRate.eq(0)
    ? input.mortgagePrincipal.div(months)
    : input.mortgagePrincipal
        .mul(monthlyRate)
        .div(
          new Decimal(1).minus(
            new Decimal(1).plus(monthlyRate).pow(months.neg()),
          ),
        );
  const totalMonthlyDebt = mortgageMonthlyPayment.plus(input.otherMonthlyDebt);
  const annualDebtService = totalMonthlyDebt.mul(12);

  return {
    mortgageMonthlyPayment,
    totalMonthlyDebt,
    annualDebtService,
    dtiRate: annualDebtService.div(input.annualIncome).mul(100),
    annualIncome: input.annualIncome,
    otherMonthlyDebt: input.otherMonthlyDebt,
  };
}

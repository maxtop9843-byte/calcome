import Decimal from "decimal.js";

export type LoanRefinancingInput = {
  remainingBalance: Decimal;
  currentAnnualRate: Decimal;
  newAnnualRate: Decimal;
  remainingMonths: number;
  refinancingCosts: Decimal;
};

export type LoanRefinancingResult = {
  currentMonthlyPayment: Decimal;
  newMonthlyPayment: Decimal;
  currentTotalInterest: Decimal;
  newTotalInterest: Decimal;
  monthlySavings: Decimal;
  grossInterestSavings: Decimal;
  netSavings: Decimal;
  breakEvenMonths: Decimal | null;
};

function monthlyPayment(
  principal: Decimal,
  annualRate: Decimal,
  months: number,
) {
  const rate = annualRate.div(100).div(12);
  if (rate.isZero()) return principal.div(months);
  const factor = rate.plus(1).pow(months);
  return principal.mul(rate).mul(factor).div(factor.minus(1));
}

export function calculateLoanRefinancingSavings(
  input: LoanRefinancingInput,
): LoanRefinancingResult {
  const currentMonthlyPayment = monthlyPayment(
    input.remainingBalance,
    input.currentAnnualRate,
    input.remainingMonths,
  );
  const newMonthlyPayment = monthlyPayment(
    input.remainingBalance,
    input.newAnnualRate,
    input.remainingMonths,
  );
  const currentTotalInterest = currentMonthlyPayment
    .mul(input.remainingMonths)
    .minus(input.remainingBalance);
  const newTotalInterest = newMonthlyPayment
    .mul(input.remainingMonths)
    .minus(input.remainingBalance);
  const monthlySavings = currentMonthlyPayment.minus(newMonthlyPayment);
  const grossInterestSavings = currentTotalInterest.minus(newTotalInterest);
  const netSavings = grossInterestSavings.minus(input.refinancingCosts);

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    currentTotalInterest,
    newTotalInterest,
    monthlySavings,
    grossInterestSavings,
    netSavings,
    breakEvenMonths: monthlySavings.gt(0)
      ? input.refinancingCosts.div(monthlySavings)
      : null,
  };
}

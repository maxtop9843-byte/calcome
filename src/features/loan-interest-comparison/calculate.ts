import Decimal from "decimal.js";

export type LoanInterestComparisonInput = {
  principal: Decimal;
  annualRateA: Decimal;
  annualRateB: Decimal;
  termMonths: number;
};

export type LoanOptionResult = {
  annualRate: Decimal;
  monthlyPayment: Decimal;
  totalPayment: Decimal;
  totalInterest: Decimal;
};

export type LoanInterestComparisonResult = {
  optionA: LoanOptionResult;
  optionB: LoanOptionResult;
  monthlyPaymentDifference: Decimal;
  interestSavings: Decimal;
  lowerCostOption: "A" | "B" | "same";
};

function calculateOption(
  principal: Decimal,
  annualRate: Decimal,
  termMonths: number,
): LoanOptionResult {
  const monthlyRate = annualRate.div(100).div(12);
  const monthlyPayment = monthlyRate.isZero()
    ? principal.div(termMonths)
    : principal
        .mul(monthlyRate)
        .mul(monthlyRate.plus(1).pow(termMonths))
        .div(monthlyRate.plus(1).pow(termMonths).minus(1));
  const totalPayment = monthlyPayment.mul(termMonths);

  return {
    annualRate,
    monthlyPayment,
    totalPayment,
    totalInterest: totalPayment.minus(principal),
  };
}

export function calculateLoanInterestComparison(
  input: LoanInterestComparisonInput,
): LoanInterestComparisonResult {
  const optionA = calculateOption(
    input.principal,
    input.annualRateA,
    input.termMonths,
  );
  const optionB = calculateOption(
    input.principal,
    input.annualRateB,
    input.termMonths,
  );
  const comparison = optionA.totalInterest.comparedTo(optionB.totalInterest);

  return {
    optionA,
    optionB,
    monthlyPaymentDifference: optionA.monthlyPayment
      .minus(optionB.monthlyPayment)
      .abs(),
    interestSavings: optionA.totalInterest.minus(optionB.totalInterest).abs(),
    lowerCostOption: comparison < 0 ? "A" : comparison > 0 ? "B" : "same",
  };
}

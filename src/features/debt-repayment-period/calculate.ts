import Decimal from "decimal.js";

export type DebtRepaymentPeriodInput = {
  balance: Decimal;
  annualInterestRate: Decimal;
  monthlyPayment: Decimal;
};

export type DebtRepaymentPeriodResult = {
  payoffMonths: number;
  totalRepayment: Decimal;
  totalInterest: Decimal;
  finalPayment: Decimal;
};

export function calculateDebtRepaymentPeriod(
  input: DebtRepaymentPeriodInput,
): DebtRepaymentPeriodResult | null {
  const monthlyRate = input.annualInterestRate.div(100).div(12);
  if (
    monthlyRate.gt(0) &&
    input.monthlyPayment.lte(input.balance.mul(monthlyRate))
  ) {
    return null;
  }

  let remaining = input.balance;
  let totalRepayment = new Decimal(0);
  let payoffMonths = 0;
  let finalPayment = new Decimal(0);

  while (remaining.gt(0) && payoffMonths < 1200) {
    const amountDue = remaining.plus(remaining.mul(monthlyRate));
    finalPayment = Decimal.min(input.monthlyPayment, amountDue);
    totalRepayment = totalRepayment.plus(finalPayment);
    remaining = amountDue.minus(finalPayment);
    payoffMonths += 1;
  }

  if (remaining.gt(0)) return null;
  return {
    payoffMonths,
    totalRepayment,
    totalInterest: totalRepayment.minus(input.balance),
    finalPayment,
  };
}

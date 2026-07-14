import Decimal from "decimal.js";

import type { SavingsInput, SavingsResult, SavingsScheduleRow } from "./types";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export function calculateSavings(input: SavingsInput): SavingsResult {
  const depositAmount = new Decimal(input.regularDeposit);
  const monthlyRate = new Decimal(input.annualInterestRate).div(100).div(12);
  const interval = input.depositFrequency === "monthly" ? 1 : 12;
  const schedule: SavingsScheduleRow[] = [];
  let cumulativePrincipal = new Decimal(0);
  let accruedInterest = new Decimal(0);
  let compoundBalance = new Decimal(0);
  let depositCount = 0;

  for (let month = 1; month <= input.months; month += 1) {
    let depositedThisMonth = new Decimal(0);
    const beginningDeposit =
      input.depositTiming === "beginning" && (month - 1) % interval === 0;
    const endDeposit = input.depositTiming === "end" && month % interval === 0;

    if (beginningDeposit) {
      cumulativePrincipal = cumulativePrincipal.plus(depositAmount);
      compoundBalance = compoundBalance.plus(depositAmount);
      depositedThisMonth = depositedThisMonth.plus(depositAmount);
      depositCount += 1;
    }

    const interest =
      input.interestMethod === "simple"
        ? cumulativePrincipal.mul(monthlyRate)
        : compoundBalance.mul(monthlyRate);
    accruedInterest = accruedInterest.plus(interest);
    if (input.interestMethod === "compound") {
      compoundBalance = compoundBalance.plus(interest);
    }

    if (endDeposit) {
      cumulativePrincipal = cumulativePrincipal.plus(depositAmount);
      compoundBalance = compoundBalance.plus(depositAmount);
      depositedThisMonth = depositedThisMonth.plus(depositAmount);
      depositCount += 1;
    }

    const grossBalance = cumulativePrincipal.plus(accruedInterest);
    schedule.push({
      month,
      deposit: depositedThisMonth.toString(),
      interest: interest.toString(),
      cumulativePrincipal: cumulativePrincipal.toString(),
      grossBalance: grossBalance.toString(),
    });
  }

  const grossInterest = accruedInterest;
  const estimatedTax = grossInterest.mul(input.taxRate).div(100);
  const afterTaxInterest = grossInterest.minus(estimatedTax);
  const maturityBeforeTax = cumulativePrincipal.plus(grossInterest);
  const maturityAfterTax = cumulativePrincipal.plus(afterTaxInterest);
  const effectiveReturnRate = cumulativePrincipal.isZero()
    ? new Decimal(0)
    : afterTaxInterest.div(cumulativePrincipal).mul(100);

  return {
    totalPrincipal: cumulativePrincipal.toString(),
    grossInterest: grossInterest.toString(),
    estimatedTax: estimatedTax.toString(),
    afterTaxInterest: afterTaxInterest.toString(),
    maturityBeforeTax: maturityBeforeTax.toString(),
    maturityAfterTax: maturityAfterTax.toString(),
    effectiveReturnRate: effectiveReturnRate.toString(),
    depositCount,
    schedule,
  };
}

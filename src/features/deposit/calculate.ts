import Decimal from "decimal.js";

import type { DepositInput, DepositResult } from "./types";

Decimal.set({ precision: 80, rounding: Decimal.ROUND_HALF_UP });

export function calculateDeposit(input: DepositInput): DepositResult {
  const principal = new Decimal(input.principal);
  const annualRate = new Decimal(input.annualInterestRate).div(100);
  const grossInterest =
    input.interestMethod === "simple"
      ? principal.mul(annualRate).mul(input.months).div(12)
      : principal
          .mul(annualRate.div(12).plus(1).pow(input.months))
          .minus(principal);
  const estimatedTax = grossInterest.mul(input.taxRate).div(100);
  const afterTaxInterest = grossInterest.minus(estimatedTax);
  const maturityBeforeTax = principal.plus(grossInterest);
  const maturityAfterTax = principal.plus(afterTaxInterest);
  const effectiveReturnRate = afterTaxInterest.div(principal).mul(100);

  return {
    principal: principal.toString(),
    grossInterest: grossInterest.toString(),
    estimatedTax: estimatedTax.toString(),
    afterTaxInterest: afterTaxInterest.toString(),
    maturityBeforeTax: maturityBeforeTax.toString(),
    maturityAfterTax: maturityAfterTax.toString(),
    effectiveReturnRate: effectiveReturnRate.toString(),
  };
}

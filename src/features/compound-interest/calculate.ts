import Decimal from "decimal.js";

import { COMPOUNDING_PERIODS, CONTRIBUTION_PERIODS } from "./constants";
import type {
  CompoundInterestInput,
  CompoundInterestResult,
  YearlyCompoundInterestRecord,
} from "./types";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

function calculateAtYear(input: CompoundInterestInput, year: number) {
  const principal = new Decimal(input.initialPrincipal);
  const contribution = new Decimal(input.recurringContribution);
  const annualRate = new Decimal(input.annualInterestRate).div(100);
  const compoundingPeriods = COMPOUNDING_PERIODS[input.compoundingFrequency];
  const contributionPeriods = CONTRIBUTION_PERIODS[input.contributionFrequency];
  const totalContributionPeriods = contributionPeriods * year;
  const compoundBase = annualRate.div(compoundingPeriods).plus(1);
  const principalFutureValue = principal.mul(
    compoundBase.pow(compoundingPeriods * year),
  );

  let contributionFutureValue: Decimal;
  if (annualRate.isZero()) {
    contributionFutureValue = contribution.mul(totalContributionPeriods);
  } else {
    const periodRate = compoundBase
      .pow(new Decimal(compoundingPeriods).div(contributionPeriods))
      .minus(1);
    contributionFutureValue = contribution
      .mul(periodRate.plus(1).pow(totalContributionPeriods).minus(1))
      .div(periodRate);
    if (input.contributionTiming === "beginning") {
      contributionFutureValue = contributionFutureValue.mul(periodRate.plus(1));
    }
  }

  const grossBalance = principalFutureValue.plus(contributionFutureValue);
  const cumulativePrincipal = principal.plus(
    contribution.mul(totalContributionPeriods),
  );
  const grossInterest = grossBalance.minus(cumulativePrincipal);
  const taxRate = new Decimal(input.taxRate ?? 0).div(100);
  const estimatedTax = Decimal.max(grossInterest, 0).mul(taxRate);
  const netBalance = grossBalance.minus(estimatedTax);
  const inflationRate = new Decimal(input.inflationRate ?? 0).div(100);
  const inflationAdjustedValue = netBalance.div(
    inflationRate.plus(1).pow(year),
  );

  return {
    grossBalance,
    cumulativePrincipal,
    grossInterest,
    estimatedTax,
    netBalance,
    inflationAdjustedValue,
  };
}

export function calculateCompoundInterest(
  input: CompoundInterestInput,
): CompoundInterestResult {
  const contributionPeriods = CONTRIBUTION_PERIODS[input.contributionFrequency];
  const contributionPerYear = new Decimal(input.recurringContribution).mul(
    contributionPeriods,
  );
  const yearlyData: YearlyCompoundInterestRecord[] = [];
  let previousGrossBalance = new Decimal(input.initialPrincipal);

  for (let year = 1; year <= input.durationYears; year += 1) {
    const current = calculateAtYear(input, year);
    const interest = current.grossBalance
      .minus(previousGrossBalance)
      .minus(contributionPerYear);
    yearlyData.push({
      year,
      openingBalance: previousGrossBalance.toString(),
      contributions: contributionPerYear.toString(),
      interest: interest.toString(),
      cumulativePrincipal: current.cumulativePrincipal.toString(),
      grossBalance: current.grossBalance.toString(),
      estimatedTax: current.estimatedTax.toString(),
      netBalance: current.netBalance.toString(),
      inflationAdjustedValue: current.inflationAdjustedValue.toString(),
    });
    previousGrossBalance = current.grossBalance;
  }

  const final = calculateAtYear(input, input.durationYears);
  const growthMultiplier = final.cumulativePrincipal.isZero()
    ? null
    : final.netBalance.div(final.cumulativePrincipal).toString();

  return {
    estimatedFinalBalance: final.netBalance.toString(),
    grossFinalBalance: final.grossBalance.toString(),
    totalContributedPrincipal: final.cumulativePrincipal.toString(),
    grossInterest: final.grossInterest.toString(),
    estimatedTax: final.estimatedTax.toString(),
    estimatedNetGain: final.grossInterest.minus(final.estimatedTax).toString(),
    inflationAdjustedValue: final.inflationAdjustedValue.toString(),
    growthMultiplier,
    yearlyData,
    taxEnabled: input.taxRate !== null,
    inflationEnabled: input.inflationRate !== null,
  };
}

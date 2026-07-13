import type { CompoundInterestFormValues } from "./types";

export const DEFAULT_COMPOUND_INTEREST_VALUES: CompoundInterestFormValues = {
  initialPrincipal: "1000000",
  recurringContribution: "100000",
  contributionFrequency: "monthly",
  durationYears: "10",
  annualInterestRate: "5",
  compoundingFrequency: "monthly",
  contributionTiming: "end",
  inflationRate: "",
  taxRate: "",
};

export const COMPOUNDING_PERIODS = {
  yearly: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
} as const;

export const CONTRIBUTION_PERIODS = {
  monthly: 12,
  yearly: 1,
} as const;

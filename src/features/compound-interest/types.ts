export type ContributionFrequency = "monthly" | "yearly";
export type CompoundingFrequency =
  "yearly" | "semiannually" | "quarterly" | "monthly" | "daily";
export type ContributionTiming = "beginning" | "end";

export type CompoundInterestFormValues = {
  initialPrincipal: string;
  recurringContribution: string;
  contributionFrequency: ContributionFrequency;
  durationYears: string;
  annualInterestRate: string;
  compoundingFrequency: CompoundingFrequency;
  contributionTiming: ContributionTiming;
  inflationRate: string;
  taxRate: string;
};

export type CompoundInterestInput = {
  initialPrincipal: string;
  recurringContribution: string;
  contributionFrequency: ContributionFrequency;
  durationYears: number;
  annualInterestRate: string;
  compoundingFrequency: CompoundingFrequency;
  contributionTiming: ContributionTiming;
  inflationRate: string | null;
  taxRate: string | null;
};

export type CompoundInterestField = keyof CompoundInterestFormValues;
export type ValidationErrors = Partial<Record<CompoundInterestField, string>>;

export type YearlyCompoundInterestRecord = {
  year: number;
  openingBalance: string;
  contributions: string;
  interest: string;
  cumulativePrincipal: string;
  grossBalance: string;
  estimatedTax: string;
  netBalance: string;
  inflationAdjustedValue: string;
};

export type CompoundInterestResult = {
  estimatedFinalBalance: string;
  grossFinalBalance: string;
  totalContributedPrincipal: string;
  grossInterest: string;
  estimatedTax: string;
  estimatedNetGain: string;
  inflationAdjustedValue: string;
  growthMultiplier: string | null;
  yearlyData: YearlyCompoundInterestRecord[];
  taxEnabled: boolean;
  inflationEnabled: boolean;
};

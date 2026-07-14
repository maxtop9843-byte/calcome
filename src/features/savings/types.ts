export type DepositFrequency = "monthly" | "yearly";
export type PeriodUnit = "months" | "years";
export type InterestMethod = "simple" | "compound";
export type DepositTiming = "beginning" | "end";
export type TaxOption = "tax-free" | "general" | "custom";

export type SavingsFormValues = {
  regularDeposit: string;
  depositFrequency: DepositFrequency;
  savingsPeriod: string;
  periodUnit: PeriodUnit;
  annualInterestRate: string;
  interestMethod: InterestMethod;
  depositTiming: DepositTiming;
  taxOption: TaxOption;
  customTaxRate: string;
};

export type SavingsInput = {
  regularDeposit: string;
  depositFrequency: DepositFrequency;
  months: number;
  annualInterestRate: string;
  interestMethod: InterestMethod;
  depositTiming: DepositTiming;
  taxRate: string;
  taxOption: TaxOption;
};

export type SavingsScheduleRow = {
  month: number;
  deposit: string;
  interest: string;
  cumulativePrincipal: string;
  grossBalance: string;
};

export type SavingsResult = {
  totalPrincipal: string;
  grossInterest: string;
  estimatedTax: string;
  afterTaxInterest: string;
  maturityBeforeTax: string;
  maturityAfterTax: string;
  effectiveReturnRate: string;
  depositCount: number;
  schedule: SavingsScheduleRow[];
};

export type SavingsField = keyof SavingsFormValues;
export type SavingsValidationErrors = Partial<Record<SavingsField, string>>;

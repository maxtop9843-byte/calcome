export type PeriodUnit = "months" | "years";
export type InterestMethod = "simple" | "compound";
export type TaxOption = "tax-free" | "general" | "custom";

export type DepositFormValues = {
  depositAmount: string;
  depositPeriod: string;
  periodUnit: PeriodUnit;
  annualInterestRate: string;
  interestMethod: InterestMethod;
  taxOption: TaxOption;
  customTaxRate: string;
};

export type DepositInput = {
  principal: string;
  months: number;
  annualInterestRate: string;
  interestMethod: InterestMethod;
  taxRate: string;
  taxOption: TaxOption;
};

export type DepositResult = {
  principal: string;
  grossInterest: string;
  estimatedTax: string;
  afterTaxInterest: string;
  maturityBeforeTax: string;
  maturityAfterTax: string;
  effectiveReturnRate: string;
};

export type DepositField = keyof DepositFormValues;
export type DepositValidationErrors = Partial<Record<DepositField, string>>;

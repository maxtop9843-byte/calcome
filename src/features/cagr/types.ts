export type CagrPeriodUnit = "years" | "months";

export type CagrFormValues = {
  initialValue: string;
  finalValue: string;
  investmentPeriod: string;
  periodUnit: CagrPeriodUnit;
};

export type CagrInput = {
  initialValue: string;
  finalValue: string;
  years: string;
};

export type CagrResult = {
  cagrPercent: string;
  totalReturnPercent: string;
  absoluteProfit: string;
  years: string;
};

export type CagrField = keyof CagrFormValues;
export type CagrValidationErrors = Partial<Record<CagrField, string>>;

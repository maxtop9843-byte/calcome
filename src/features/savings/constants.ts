import type { SavingsFormValues } from "./types";

export const GENERAL_SAVINGS_TAX_RATE = "15.4";

export const DEFAULT_SAVINGS_VALUES: SavingsFormValues = {
  regularDeposit: "100000",
  depositFrequency: "monthly",
  savingsPeriod: "1",
  periodUnit: "years",
  annualInterestRate: "3.5",
  interestMethod: "simple",
  depositTiming: "end",
  taxOption: "general",
  customTaxRate: "",
};

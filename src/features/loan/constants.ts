import type { LoanFormValues } from "./types";

export const DEFAULT_LOAN_VALUES: LoanFormValues = {
  loanAmount: "100000000",
  annualInterestRate: "4.5",
  loanPeriod: "30",
  periodUnit: "years",
  repaymentType: "equal-payment",
};

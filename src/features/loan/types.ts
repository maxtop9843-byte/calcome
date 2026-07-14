export type RepaymentType = "equal-payment" | "equal-principal" | "bullet";
export type PeriodUnit = "months" | "years";

export type LoanFormValues = {
  loanAmount: string;
  annualInterestRate: string;
  loanPeriod: string;
  periodUnit: PeriodUnit;
  repaymentType: RepaymentType;
};

export type LoanInput = {
  loanAmount: string;
  annualInterestRate: string;
  months: number;
  repaymentType: RepaymentType;
};

export type LoanScheduleRow = {
  month: number;
  payment: string;
  principal: string;
  interest: string;
  remainingBalance: string;
};

export type LoanResult = {
  monthlyPayment: string;
  lastMonthlyPayment: string;
  totalRepayment: string;
  totalInterest: string;
  schedule: LoanScheduleRow[];
  summary: string;
};

export type LoanField = keyof LoanFormValues;
export type LoanValidationErrors = Partial<Record<LoanField, string>>;

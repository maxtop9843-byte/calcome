import type Decimal from "decimal.js";

export type SalaryMode = "annual" | "monthly";
export type NetSalaryFormValues = {
  salaryMode: SalaryMode;
  salary: string;
  bonus: string;
  monthlyNonTaxable: string;
  dependents: string;
  children: string;
  pension: boolean;
  health: boolean;
  longTermCare: boolean;
  employment: boolean;
  incomeTax: boolean;
  localIncomeTax: boolean;
};
export type NetSalaryInput = Omit<
  NetSalaryFormValues,
  "salary" | "bonus" | "monthlyNonTaxable" | "dependents" | "children"
> & {
  salary: Decimal;
  bonus: Decimal;
  monthlyNonTaxable: Decimal;
  dependents: number;
  children: number;
};
export type DeductionKey =
  | "pension"
  | "health"
  | "longTermCare"
  | "employment"
  | "incomeTax"
  | "localIncomeTax";
export type NetSalaryResult = {
  annualGross: Decimal;
  monthlyGross: Decimal;
  monthlyTakeHome: Decimal;
  annualTakeHome: Decimal;
  monthlyDeductions: Decimal;
  annualDeductions: Decimal;
  deductions: Record<DeductionKey, Decimal>;
};
export type NetSalaryErrors = Partial<
  Record<
    "salary" | "bonus" | "monthlyNonTaxable" | "dependents" | "children",
    string
  >
>;

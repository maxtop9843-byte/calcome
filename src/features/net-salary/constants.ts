import Decimal from "decimal.js";
import type { NetSalaryFormValues } from "./types";

export const PAYROLL_YEAR = 2026;
export const PENSION_EMPLOYEE_RATE = new Decimal("0.0475");
export const PENSION_MONTHLY_CAP = new Decimal("6590000");
export const HEALTH_EMPLOYEE_RATE = new Decimal("0.03595");
export const LONG_TERM_CARE_RATIO = new Decimal("0.9448").div("7.19");
export const EMPLOYMENT_EMPLOYEE_RATE = new Decimal("0.009");
export const INITIAL_NET_SALARY_VALUES: NetSalaryFormValues = {
  salaryMode: "annual",
  salary: "",
  bonus: "",
  monthlyNonTaxable: "",
  dependents: "0",
  children: "0",
  pension: true,
  health: true,
  longTermCare: true,
  employment: true,
  incomeTax: true,
  localIncomeTax: true,
};

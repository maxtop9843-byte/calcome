import Decimal from "decimal.js";

export type SalaryPeriod = "annual" | "monthly";

export function calculateSalaryConversion(input: {
  salary: Decimal;
  period: SalaryPeriod;
}) {
  const annualSalary =
    input.period === "annual" ? input.salary : input.salary.mul(12);
  return {
    annualSalary,
    monthlySalary: annualSalary.div(12),
    weeklySalary: annualSalary.div(52),
  };
}

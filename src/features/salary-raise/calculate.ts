import Decimal from "decimal.js";

export type SalaryPeriod = "annual" | "monthly";
export type SalaryRaiseInput = {
  salary: Decimal;
  raiseRate: Decimal;
  period: SalaryPeriod;
};
export type SalaryRaiseResult = {
  currentAnnualSalary: Decimal;
  newAnnualSalary: Decimal;
  annualIncrease: Decimal;
  currentMonthlySalary: Decimal;
  newMonthlySalary: Decimal;
  monthlyIncrease: Decimal;
  raiseRate: Decimal;
};

export function calculateSalaryRaise(
  input: SalaryRaiseInput,
): SalaryRaiseResult {
  const currentAnnualSalary =
    input.period === "annual" ? input.salary : input.salary.mul(12);
  const multiplier = input.raiseRate.div(100).plus(1);
  const newAnnualSalary = currentAnnualSalary.mul(multiplier);
  const annualIncrease = newAnnualSalary.minus(currentAnnualSalary);
  return {
    currentAnnualSalary,
    newAnnualSalary,
    annualIncrease,
    currentMonthlySalary: currentAnnualSalary.div(12),
    newMonthlySalary: newAnnualSalary.div(12),
    monthlyIncrease: annualIncrease.div(12),
    raiseRate: input.raiseRate,
  };
}

import Decimal from "decimal.js";

export type SalaryPeriod = "annual" | "monthly";
export type GrossUpSalaryInput = {
  targetNetSalary: Decimal;
  deductionRate: Decimal;
  period: SalaryPeriod;
};
export type GrossUpSalaryResult = {
  targetAnnualNet: Decimal;
  targetMonthlyNet: Decimal;
  requiredAnnualGross: Decimal;
  requiredMonthlyGross: Decimal;
  annualDeductions: Decimal;
  monthlyDeductions: Decimal;
  deductionRate: Decimal;
};

export function calculateGrossUpSalary(
  input: GrossUpSalaryInput,
): GrossUpSalaryResult {
  const targetAnnualNet =
    input.period === "annual"
      ? input.targetNetSalary
      : input.targetNetSalary.mul(12);
  const netShare = new Decimal(1).minus(input.deductionRate.div(100));
  const requiredAnnualGross = targetAnnualNet.div(netShare);
  const annualDeductions = requiredAnnualGross.minus(targetAnnualNet);

  return {
    targetAnnualNet,
    targetMonthlyNet: targetAnnualNet.div(12),
    requiredAnnualGross,
    requiredMonthlyGross: requiredAnnualGross.div(12),
    annualDeductions,
    monthlyDeductions: annualDeductions.div(12),
    deductionRate: input.deductionRate,
  };
}

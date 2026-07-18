import Decimal from "decimal.js";
import {
  EMPLOYMENT_EMPLOYEE_RATE,
  HEALTH_EMPLOYEE_RATE,
  LONG_TERM_CARE_RATIO,
  PENSION_EMPLOYEE_RATE,
  PENSION_MONTHLY_CAP,
} from "@/features/net-salary/constants";
import { EMPLOYMENT_ADDITIONAL_RATES } from "./constants";
import type { SocialInsuranceInput, SocialInsuranceResult } from "./types";

const money = (value: Decimal) =>
  Decimal.max(value, 0).toDecimalPlaces(0, Decimal.ROUND_DOWN);

export function calculateSocialInsurance(
  input: SocialInsuranceInput,
): SocialInsuranceResult {
  const contributionBase = Decimal.max(
    input.monthlyPay.minus(input.nonTaxablePay),
    0,
  );
  const pension = money(
    Decimal.min(contributionBase, PENSION_MONTHLY_CAP).mul(
      PENSION_EMPLOYEE_RATE,
    ),
  );
  const health = money(contributionBase.mul(HEALTH_EMPLOYEE_RATE));
  const longTermCare = money(health.mul(LONG_TERM_CARE_RATIO));
  const employment = money(contributionBase.mul(EMPLOYMENT_EMPLOYEE_RATE));
  const employeeTotal = pension
    .plus(health)
    .plus(longTermCare)
    .plus(employment);
  const industrialAccident = money(
    contributionBase.mul(input.accidentRate).div(100),
  );
  const employmentAdditionalRate =
    EMPLOYMENT_ADDITIONAL_RATES[input.workplaceSize];
  const employerEmployment = money(
    contributionBase
      .mul(EMPLOYMENT_EMPLOYEE_RATE.mul(100).plus(employmentAdditionalRate))
      .div(100),
  );
  const employerTotal = pension
    .plus(health)
    .plus(longTermCare)
    .plus(employerEmployment)
    .plus(industrialAccident);
  return {
    contributionBase,
    employee: {
      pension,
      health,
      longTermCare,
      employment,
      total: employeeTotal,
    },
    employer: {
      pension,
      health,
      longTermCare,
      employment: employerEmployment,
      employmentAdditionalRate,
      industrialAccident,
      total: employerTotal,
    },
    combinedTotal: employeeTotal.plus(employerTotal),
  };
}

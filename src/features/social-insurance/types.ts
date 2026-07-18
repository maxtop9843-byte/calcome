import type Decimal from "decimal.js";

export type WorkplaceSize =
  "under150" | "priority150" | "between150And999" | "over1000OrPublic";

export type SocialInsuranceLocale = "ko" | "en";
export type SocialInsuranceFormValues = {
  monthlyPay: string;
  nonTaxablePay: string;
  accidentRate: string;
  workplaceSize: WorkplaceSize;
};
export type SocialInsuranceInput = {
  monthlyPay: Decimal;
  nonTaxablePay: Decimal;
  accidentRate: Decimal;
  workplaceSize: WorkplaceSize;
};
export type SocialInsuranceErrors = Partial<
  Record<keyof SocialInsuranceFormValues, string>
>;
export type SocialInsuranceResult = {
  contributionBase: Decimal;
  employee: {
    pension: Decimal;
    health: Decimal;
    longTermCare: Decimal;
    employment: Decimal;
    total: Decimal;
  };
  employer: {
    pension: Decimal;
    health: Decimal;
    longTermCare: Decimal;
    employment: Decimal;
    employmentAdditionalRate: Decimal;
    industrialAccident: Decimal;
    total: Decimal;
  };
  combinedTotal: Decimal;
};

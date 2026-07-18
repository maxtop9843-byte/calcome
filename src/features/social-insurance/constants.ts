import Decimal from "decimal.js";
import type { SocialInsuranceFormValues, WorkplaceSize } from "./types";

export const EMPLOYMENT_ADDITIONAL_RATES: Record<WorkplaceSize, Decimal> = {
  under150: new Decimal("0.25"),
  priority150: new Decimal("0.45"),
  between150And999: new Decimal("0.65"),
  over1000OrPublic: new Decimal("0.85"),
};

export const INITIAL_SOCIAL_INSURANCE_VALUES: SocialInsuranceFormValues = {
  monthlyPay: "",
  nonTaxablePay: "",
  accidentRate: "",
  workplaceSize: "under150",
};

import type { CagrFormValues } from "./types";

export const DEFAULT_CAGR_VALUES: CagrFormValues = {
  initialValue: "10000000",
  finalValue: "15000000",
  investmentPeriod: "5",
  periodUnit: "years",
};

export const MAX_CAGR_VALUE = "1000000000000";
export const MAX_CAGR_MONTHS = 1200;

import type { SeveranceFormValues } from "./types";

export const INITIAL_SEVERANCE_VALUES: SeveranceFormValues = {
  averageDailyWage: "",
  periodMode: "dates",
  startDate: "",
  endDate: "",
  yearsWorked: "",
  monthsWorked: "",
  daysWorked: "",
};

export const MAX_AVERAGE_DAILY_WAGE = "1000000000";
export const MAX_SERVICE_YEARS = 100;

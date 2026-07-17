export type ServicePeriodMode = "dates" | "manual";

export type SeveranceFormValues = {
  averageDailyWage: string;
  periodMode: ServicePeriodMode;
  startDate: string;
  endDate: string;
  yearsWorked: string;
  monthsWorked: string;
  daysWorked: string;
};

export type SeveranceInput = {
  averageDailyWage: string;
  serviceDays: string;
};

export type SeveranceResult = {
  estimatedSeverancePay: string;
  averageDailyWage: string;
  thirtyDayWage: string;
  serviceDays: string;
  serviceYears: string;
};

export type SeveranceField = keyof SeveranceFormValues;
export type SeveranceErrors = Partial<Record<SeveranceField, string>>;

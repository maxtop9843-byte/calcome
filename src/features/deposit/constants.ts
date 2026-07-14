import { GENERAL_INTEREST_TAX_RATE } from "@/lib/finance/tax";

import type { DepositFormValues } from "./types";

export { GENERAL_INTEREST_TAX_RATE };

export const DEFAULT_DEPOSIT_VALUES: DepositFormValues = {
  depositAmount: "10000000",
  depositPeriod: "1",
  periodUnit: "years",
  annualInterestRate: "3.5",
  interestMethod: "simple",
  taxOption: "general",
  customTaxRate: "",
};

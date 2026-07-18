import Decimal from "decimal.js";

export type WorkplaceSize = "fiveOrMore" | "underFive";

export type HolidayWorkInput = {
  hourlyWage: Decimal;
  holidayHours: Decimal;
  workplaceSize: WorkplaceSize;
  contractualPremiumRate: Decimal;
};

export type HolidayWorkResult = {
  basePay: Decimal;
  withinEightHours: Decimal;
  overEightHours: Decimal;
  withinEightPremium: Decimal;
  overEightPremium: Decimal;
  premiumPay: Decimal;
  totalPay: Decimal;
  holidayHours: Decimal;
  workplaceSize: WorkplaceSize;
  contractualPremiumRate: Decimal;
};

export function calculateHolidayWorkPay(
  i: HolidayWorkInput,
): HolidayWorkResult {
  const withinEightHours = Decimal.min(i.holidayHours, 8);
  const overEightHours = Decimal.max(i.holidayHours.minus(8), 0);
  const basePay = i.hourlyWage.mul(i.holidayHours);
  const withinEightPremium =
    i.workplaceSize === "fiveOrMore"
      ? i.hourlyWage.mul(withinEightHours).mul(0.5)
      : basePay.mul(i.contractualPremiumRate).div(100);
  const overEightPremium =
    i.workplaceSize === "fiveOrMore"
      ? i.hourlyWage.mul(overEightHours)
      : new Decimal(0);
  const premiumPay = withinEightPremium.plus(overEightPremium);

  return {
    basePay,
    withinEightHours,
    overEightHours,
    withinEightPremium,
    overEightPremium,
    premiumPay,
    totalPay: basePay.plus(premiumPay),
    holidayHours: i.holidayHours,
    workplaceSize: i.workplaceSize,
    contractualPremiumRate: i.contractualPremiumRate,
  };
}

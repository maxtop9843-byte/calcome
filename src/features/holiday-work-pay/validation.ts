import Decimal from "decimal.js";
import type { HolidayWorkInput, WorkplaceSize } from "./calculate";

export type Values = {
  hourlyWage: string;
  holidayHours: string;
  workplaceSize: string;
  contractualPremiumRate: string;
};
export type Errors = Partial<Record<keyof Values, string>>;

const NUMBER = /^\d+(?:\.\d+)?$/;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

export function validateHolidayWorkPay(
  values: Values,
  locale: "ko" | "en",
): { data?: HolidayWorkInput; errors: Errors } {
  const errors: Errors = {};
  const workplaceSize: WorkplaceSize | undefined =
    values.workplaceSize === "fiveOrMore" ||
    values.workplaceSize === "underFive"
      ? values.workplaceSize
      : undefined;
  const wageText = values.hourlyWage.trim();
  const hoursText = values.holidayHours.trim();
  const rateText = values.contractualPremiumRate.trim();
  const hourlyWage = MONEY.test(wageText)
    ? new Decimal(wageText.replaceAll(",", ""))
    : null;
  const holidayHours = NUMBER.test(hoursText) ? new Decimal(hoursText) : null;
  const contractualPremiumRate = NUMBER.test(rateText)
    ? new Decimal(rateText)
    : null;

  if (!hourlyWage || hourlyWage.lte(0) || hourlyWage.gt(10_000_000)) {
    errors.hourlyWage =
      locale === "ko"
        ? "0보다 크고 안전 상한 이하인 시급을 입력해 주세요."
        : "Enter an hourly wage greater than zero within the safety limit.";
  }
  if (!holidayHours || holidayHours.lte(0) || holidayHours.gt(168)) {
    errors.holidayHours =
      locale === "ko"
        ? "0보다 크고 168시간 이하로 입력해 주세요."
        : "Enter more than 0 and no more than 168 hours.";
  }
  if (!workplaceSize) {
    errors.workplaceSize =
      locale === "ko"
        ? "사업장 규모를 선택해 주세요."
        : "Select a workplace size.";
  }
  if (
    !contractualPremiumRate ||
    contractualPremiumRate.lt(0) ||
    contractualPremiumRate.gt(300)
  ) {
    errors.contractualPremiumRate =
      locale === "ko"
        ? "약정 가산율은 0~300% 범위로 입력해 주세요."
        : "Enter a contractual premium from 0% to 300%.";
  }

  return Object.keys(errors).length ||
    !hourlyWage ||
    !holidayHours ||
    !workplaceSize ||
    !contractualPremiumRate
    ? { errors }
    : {
        errors,
        data: {
          hourlyWage,
          holidayHours,
          workplaceSize,
          contractualPremiumRate,
        },
      };
}

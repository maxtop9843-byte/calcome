import Decimal from "decimal.js";
import type { AverageWageInput } from "./calculate";

export type AverageWageValues = {
  wageTotal: string;
  calendarDays: string;
  ordinaryDailyWage: string;
};
export type AverageWageErrors = Partial<
  Record<keyof AverageWageValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const DAYS = /^\d+$/;

export function validateAverageWage(
  values: AverageWageValues,
  locale: "ko" | "en",
): { data?: AverageWageInput; errors: AverageWageErrors } {
  const errors: AverageWageErrors = {};
  const wageText = values.wageTotal.trim();
  const dayText = values.calendarDays.trim();
  const ordinaryText = values.ordinaryDailyWage.trim();
  let wageTotal: Decimal | null = null;
  let calendarDays: Decimal | null = null;
  let ordinaryDailyWage: Decimal | undefined;
  if (MONEY.test(wageText))
    wageTotal = new Decimal(wageText.replaceAll(",", ""));
  if (!wageTotal || wageTotal.lte(0) || wageTotal.gt(10_000_000_000))
    errors.wageTotal =
      locale === "ko"
        ? "0보다 크고 100억 원 이하인 임금총액을 입력해 주세요."
        : "Enter total wages greater than zero and no more than KRW 10 billion.";
  if (DAYS.test(dayText)) calendarDays = new Decimal(dayText);
  if (!calendarDays || calendarDays.lt(1) || calendarDays.gt(92))
    errors.calendarDays =
      locale === "ko"
        ? "산정기간 총일수를 1~92일로 입력해 주세요."
        : "Enter 1 to 92 calendar days.";
  if (ordinaryText) {
    if (MONEY.test(ordinaryText))
      ordinaryDailyWage = new Decimal(ordinaryText.replaceAll(",", ""));
    if (
      !ordinaryDailyWage ||
      ordinaryDailyWage.lte(0) ||
      ordinaryDailyWage.gt(1_000_000_000)
    )
      errors.ordinaryDailyWage =
        locale === "ko"
          ? "0보다 크고 10억 원 이하인 일급 통상임금을 입력해 주세요."
          : "Enter ordinary daily wage greater than zero and no more than KRW 1 billion.";
  }
  return Object.keys(errors).length || !wageTotal || !calendarDays
    ? { errors }
    : { errors, data: { wageTotal, calendarDays, ordinaryDailyWage } };
}

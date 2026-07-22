import Decimal from "decimal.js";
import type { RentConversionRateInput } from "./calculate";
import type { RentConversionRateLocale } from "./content";

export type RentConversionRateValues = {
  jeonseDeposit: string;
  monthlyDeposit: string;
  monthlyRent: string;
};
export type RentConversionRateErrors = Partial<
  Record<keyof RentConversionRateValues, string>
>;

function decimal(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateRentConversionRate(
  values: RentConversionRateValues,
  locale: RentConversionRateLocale,
) {
  const ko = locale === "ko";
  const errors: RentConversionRateErrors = {};
  const jeonseDeposit = decimal(values.jeonseDeposit);
  const monthlyDeposit = decimal(values.monthlyDeposit);
  const monthlyRent = decimal(values.monthlyRent);

  if (
    !jeonseDeposit ||
    jeonseDeposit.lte(0) ||
    jeonseDeposit.gt(100_000_000_000)
  )
    errors.jeonseDeposit = ko
      ? "전세 보증금은 0원 초과 1,000억원 이하로 입력해 주세요."
      : "Enter a jeonse deposit above 0 and no more than KRW 100 billion.";
  if (
    !monthlyDeposit ||
    monthlyDeposit.lt(0) ||
    monthlyDeposit.gt(100_000_000_000)
  )
    errors.monthlyDeposit = ko
      ? "월세 보증금은 0원 이상 1,000억원 이하로 입력해 주세요."
      : "Enter a monthly-rent deposit from 0 to KRW 100 billion.";
  if (!monthlyRent || monthlyRent.lte(0) || monthlyRent.gt(1_000_000_000))
    errors.monthlyRent = ko
      ? "월세는 0원 초과 10억원 이하로 입력해 주세요."
      : "Enter monthly rent above 0 and no more than KRW 1 billion.";
  if (jeonseDeposit && monthlyDeposit && monthlyDeposit.gte(jeonseDeposit))
    errors.monthlyDeposit = ko
      ? "월세 보증금은 전세 보증금보다 작아야 합니다."
      : "The monthly-rent deposit must be below the jeonse deposit.";

  return Object.keys(errors).length ||
    !jeonseDeposit ||
    !monthlyDeposit ||
    !monthlyRent
    ? { errors }
    : {
        errors,
        data: {
          jeonseDeposit,
          monthlyDeposit,
          monthlyRent,
        } satisfies RentConversionRateInput,
      };
}

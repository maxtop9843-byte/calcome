import Decimal from "decimal.js";
import type { JeonseMonthlyRentConversionInput } from "./calculate";
import type { JeonseMonthlyRentConversionLocale } from "./content";

export type JeonseMonthlyRentConversionValues = {
  jeonseDeposit: string;
  monthlyDeposit: string;
  annualRate: string;
};
export type JeonseMonthlyRentConversionErrors = Partial<
  Record<keyof JeonseMonthlyRentConversionValues, string>
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

export function validateJeonseMonthlyRentConversion(
  values: JeonseMonthlyRentConversionValues,
  locale: JeonseMonthlyRentConversionLocale,
) {
  const ko = locale === "ko";
  const errors: JeonseMonthlyRentConversionErrors = {};
  const jeonseDeposit = decimal(values.jeonseDeposit);
  const monthlyDeposit = decimal(values.monthlyDeposit);
  const annualRate = decimal(values.annualRate);

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
  if (!annualRate || annualRate.lte(0) || annualRate.gt(100))
    errors.annualRate = ko
      ? "연 전환율은 0% 초과 100% 이하로 입력해 주세요."
      : "Enter an annual conversion rate above 0% and no more than 100%.";
  if (jeonseDeposit && monthlyDeposit && monthlyDeposit.gte(jeonseDeposit))
    errors.monthlyDeposit = ko
      ? "월세 보증금은 전세 보증금보다 작아야 합니다."
      : "The monthly-rent deposit must be below the jeonse deposit.";

  return Object.keys(errors).length ||
    !jeonseDeposit ||
    !monthlyDeposit ||
    !annualRate
    ? { errors }
    : {
        errors,
        data: {
          jeonseDeposit,
          monthlyDeposit,
          annualRate,
        } satisfies JeonseMonthlyRentConversionInput,
      };
}

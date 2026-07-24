import Decimal from "decimal.js";
import type { DividendYieldInput } from "./calculate";

export type DividendYieldLocale = "ko" | "en";
export type DividendYieldValues = {
  annualDividendPerShare: string;
  sharePrice: string;
};
export type DividendYieldErrors = Partial<
  Record<keyof DividendYieldValues, string>
>;

function parseDecimal(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateDividendYield(
  values: DividendYieldValues,
  locale: DividendYieldLocale,
) {
  const ko = locale === "ko";
  const errors: DividendYieldErrors = {};
  const annualDividendPerShare = parseDecimal(values.annualDividendPerShare);
  const sharePrice = parseDecimal(values.sharePrice);
  const dividendError = ko
    ? "주당 연간 배당금은 0 이상 1조 원 이하로 입력해 주세요."
    : "Enter an annual dividend from 0 to 1 trillion.";
  const priceError = ko
    ? "현재 주가는 0보다 크고 1조 원 이하로 입력해 주세요."
    : "Enter a share price above 0 and no more than 1 trillion.";

  if (
    annualDividendPerShare === null ||
    annualDividendPerShare.lt(0) ||
    annualDividendPerShare.gt(1_000_000_000_000)
  ) {
    errors.annualDividendPerShare = dividendError;
  }
  if (
    sharePrice === null ||
    sharePrice.lte(0) ||
    sharePrice.gt(1_000_000_000_000)
  ) {
    errors.sharePrice = priceError;
  }

  return Object.keys(errors).length || !annualDividendPerShare || !sharePrice
    ? { errors }
    : {
        errors,
        data: { annualDividendPerShare, sharePrice } satisfies DividendYieldInput,
      };
}

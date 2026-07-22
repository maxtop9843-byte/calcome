import Decimal from "decimal.js";
import type { DividendInput } from "./calculate";
import type { DividendLocale } from "./content";

export type DividendValues = {
  shares: string;
  annualDividendPerShare: string;
  paymentsPerYear: string;
  withholdingTaxRate: string;
};
export type DividendErrors = Partial<Record<keyof DividendValues, string>>;

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

export function validateDividend(
  values: DividendValues,
  locale: DividendLocale,
) {
  const ko = locale === "ko";
  const errors: DividendErrors = {};
  const shares = decimal(values.shares);
  const annualDividendPerShare = decimal(values.annualDividendPerShare);
  const paymentsPerYear = decimal(values.paymentsPerYear);
  const withholdingTaxRate = decimal(values.withholdingTaxRate);
  if (!shares || shares.lte(0) || shares.gt(1_000_000_000))
    errors.shares = ko
      ? "수량은 0보다 크고 10억 이하로 입력해 주세요."
      : "Enter a quantity above 0 and no more than 1 billion.";
  if (
    !annualDividendPerShare ||
    annualDividendPerShare.lte(0) ||
    annualDividendPerShare.gt(1_000_000_000_000)
  )
    errors.annualDividendPerShare = ko
      ? "주당 연간 배당금은 0보다 크고 1조 이하로 입력해 주세요."
      : "Enter an annual dividend per share above 0 and no more than 1 trillion.";
  if (
    !paymentsPerYear ||
    !paymentsPerYear.isInteger() ||
    paymentsPerYear.lt(1) ||
    paymentsPerYear.gt(365)
  )
    errors.paymentsPerYear = ko
      ? "연간 지급 횟수는 1~365 사이의 정수로 입력해 주세요."
      : "Enter a whole number of payments from 1 to 365.";
  if (
    !withholdingTaxRate ||
    withholdingTaxRate.lt(0) ||
    withholdingTaxRate.gt(100)
  )
    errors.withholdingTaxRate = ko
      ? "원천징수율은 0% 이상 100% 이하로 입력해 주세요."
      : "Enter a withholding rate from 0% to 100%.";
  return Object.keys(errors).length ||
    !shares ||
    !annualDividendPerShare ||
    !paymentsPerYear ||
    !withholdingTaxRate
    ? { errors }
    : {
        errors,
        data: {
          shares,
          annualDividendPerShare,
          paymentsPerYear,
          withholdingTaxRate,
        } satisfies DividendInput,
      };
}

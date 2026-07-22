import Decimal from "decimal.js";
import type { StockProfitLossInput } from "./calculate";
import type { StockProfitLossLocale } from "./content";

export type StockProfitLossValues = {
  shares: string;
  averagePurchasePrice: string;
  currentPrice: string;
};
export type StockProfitLossErrors = Partial<
  Record<keyof StockProfitLossValues, string>
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

export function validateStockProfitLoss(
  values: StockProfitLossValues,
  locale: StockProfitLossLocale,
) {
  const ko = locale === "ko";
  const errors: StockProfitLossErrors = {};
  const shares = decimal(values.shares);
  const averagePurchasePrice = decimal(values.averagePurchasePrice);
  const currentPrice = decimal(values.currentPrice);
  const shareError = ko
    ? "수량은 0보다 크고 10억 이하로 입력해 주세요."
    : "Enter a quantity above 0 and no more than 1 billion.";
  const priceError = ko
    ? "가격은 0보다 크고 1조 이하로 입력해 주세요."
    : "Enter a price above 0 and no more than 1 trillion.";
  if (!shares || shares.lte(0) || shares.gt(1_000_000_000))
    errors.shares = shareError;
  if (
    !averagePurchasePrice ||
    averagePurchasePrice.lte(0) ||
    averagePurchasePrice.gt(1_000_000_000_000)
  )
    errors.averagePurchasePrice = priceError;
  if (
    !currentPrice ||
    currentPrice.lte(0) ||
    currentPrice.gt(1_000_000_000_000)
  )
    errors.currentPrice = priceError;
  return Object.keys(errors).length ||
    !shares ||
    !averagePurchasePrice ||
    !currentPrice
    ? { errors }
    : {
        errors,
        data: {
          shares,
          averagePurchasePrice,
          currentPrice,
        } satisfies StockProfitLossInput,
      };
}

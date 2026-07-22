import Decimal from "decimal.js";
import type { StockAverageCostInput } from "./calculate";
import type { StockAverageCostLocale } from "./content";

export type StockAverageCostValues = {
  currentShares: string;
  currentAveragePrice: string;
  additionalShares: string;
  additionalPrice: string;
};
export type StockAverageCostErrors = Partial<
  Record<keyof StockAverageCostValues, string>
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

export function validateStockAverageCost(
  values: StockAverageCostValues,
  locale: StockAverageCostLocale,
) {
  const ko = locale === "ko";
  const errors: StockAverageCostErrors = {};
  const currentShares = decimal(values.currentShares);
  const currentAveragePrice = decimal(values.currentAveragePrice);
  const additionalShares = decimal(values.additionalShares);
  const additionalPrice = decimal(values.additionalPrice);
  const shareError = ko
    ? "수량은 0보다 크고 10억 이하로 입력해 주세요."
    : "Enter a quantity above 0 and no more than 1 billion.";
  const priceError = ko
    ? "가격은 0보다 크고 1조 이하로 입력해 주세요."
    : "Enter a price above 0 and no more than 1 trillion.";
  if (!currentShares || currentShares.lte(0) || currentShares.gt(1_000_000_000))
    errors.currentShares = shareError;
  if (
    !additionalShares ||
    additionalShares.lte(0) ||
    additionalShares.gt(1_000_000_000)
  )
    errors.additionalShares = shareError;
  if (
    !currentAveragePrice ||
    currentAveragePrice.lte(0) ||
    currentAveragePrice.gt(1_000_000_000_000)
  )
    errors.currentAveragePrice = priceError;
  if (
    !additionalPrice ||
    additionalPrice.lte(0) ||
    additionalPrice.gt(1_000_000_000_000)
  )
    errors.additionalPrice = priceError;
  return Object.keys(errors).length ||
    !currentShares ||
    !currentAveragePrice ||
    !additionalShares ||
    !additionalPrice
    ? { errors }
    : {
        errors,
        data: {
          currentShares,
          currentAveragePrice,
          additionalShares,
          additionalPrice,
        } satisfies StockAverageCostInput,
      };
}

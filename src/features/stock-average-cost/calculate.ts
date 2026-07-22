import Decimal from "decimal.js";

export type StockAverageCostInput = {
  currentShares: Decimal;
  currentAveragePrice: Decimal;
  additionalShares: Decimal;
  additionalPrice: Decimal;
};

export type StockAverageCostResult = {
  currentCost: Decimal;
  additionalCost: Decimal;
  totalShares: Decimal;
  totalCost: Decimal;
  averagePrice: Decimal;
};

export function calculateStockAverageCost({
  currentShares,
  currentAveragePrice,
  additionalShares,
  additionalPrice,
}: StockAverageCostInput): StockAverageCostResult {
  const currentCost = currentShares.mul(currentAveragePrice);
  const additionalCost = additionalShares.mul(additionalPrice);
  const totalShares = currentShares.plus(additionalShares);
  const totalCost = currentCost.plus(additionalCost);
  return {
    currentCost,
    additionalCost,
    totalShares,
    totalCost,
    averagePrice: totalCost.div(totalShares),
  };
}

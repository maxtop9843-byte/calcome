import Decimal from "decimal.js";

export type StockProfitLossInput = {
  shares: Decimal;
  averagePurchasePrice: Decimal;
  currentPrice: Decimal;
};

export type StockProfitLossResult = {
  costBasis: Decimal;
  currentValue: Decimal;
  profitLoss: Decimal;
  returnRate: Decimal;
};

export function calculateStockProfitLoss({
  shares,
  averagePurchasePrice,
  currentPrice,
}: StockProfitLossInput): StockProfitLossResult {
  const costBasis = shares.mul(averagePurchasePrice);
  const currentValue = shares.mul(currentPrice);
  const profitLoss = currentValue.minus(costBasis);
  return {
    costBasis,
    currentValue,
    profitLoss,
    returnRate: profitLoss.div(costBasis).mul(100),
  };
}

import Decimal from "decimal.js";

export type DividendYieldInput = {
  annualDividendPerShare: Decimal;
  sharePrice: Decimal;
};

export type DividendYieldResult = {
  dividendYield: Decimal;
  annualDividendPerMillion: Decimal;
};

export function calculateDividendYield({
  annualDividendPerShare,
  sharePrice,
}: DividendYieldInput): DividendYieldResult {
  const dividendYield = annualDividendPerShare.div(sharePrice).mul(100);
  return {
    dividendYield,
    annualDividendPerMillion: new Decimal(1_000_000)
      .mul(dividendYield)
      .div(100),
  };
}

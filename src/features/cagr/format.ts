import Decimal from "decimal.js";

const wonFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function formatCagrWon(value: Decimal.Value): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return wonFormatter.format(BigInt(rounded.toFixed(0)));
}

export function formatCagrPercent(value: Decimal.Value): string {
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}%`;
}

export function describeAnnualizedGrowth(value: Decimal.Value): string {
  const cagr = new Decimal(value);
  if (cagr.isZero()) return "연평균 변화 없음";
  return cagr.isPositive() ? "연평균 성장" : "연평균 감소";
}

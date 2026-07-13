import Decimal from "decimal.js";

const wonFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function formatWon(value: Decimal.Value): string {
  const rounded = new Decimal(value)
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
    .toFixed(0);
  return wonFormatter.format(BigInt(rounded));
}

export function formatPercent(value: string | null): string {
  if (value === null) return "사용 안 함";
  return `${new Decimal(value).toDecimalPlaces(2).toString()}%`;
}

export function formatMultiplier(value: string | null): string {
  if (value === null) return "계산할 수 없음";
  return `${new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)}×`;
}

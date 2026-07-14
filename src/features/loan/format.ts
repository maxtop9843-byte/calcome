import Decimal from "decimal.js";

const wonFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function formatLoanWon(value: Decimal.Value): string {
  const rounded = new Decimal(value).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return wonFormatter.format(BigInt(rounded.toFixed(0)));
}

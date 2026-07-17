import Decimal from "decimal.js";

export function formatSeveranceWon(
  value: Decimal.Value,
  locale: "ko" | "en" = "ko",
) {
  const rounded = new Decimal(value)
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
    .toFixed(0);
  const formatted = new Intl.NumberFormat(
    locale === "ko" ? "ko-KR" : "en-US",
  ).format(BigInt(rounded));
  return locale === "ko" ? `${formatted}원` : `₩${formatted}`;
}

export function formatServiceYears(value: Decimal.Value, locale: "ko" | "en") {
  const years = new Decimal(value)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toFixed(2);
  return locale === "ko" ? `${years}년` : `${years} years`;
}

export function formatServiceDays(value: Decimal.Value, locale: "ko" | "en") {
  const days = new Decimal(value)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toFixed();
  return locale === "ko" ? `${days}일` : `${days} days`;
}

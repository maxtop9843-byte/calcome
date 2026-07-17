import Decimal from "decimal.js";

export function formatBenefitWon(value: Decimal.Value, locale: "ko" | "en") {
  const amount = new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(new Decimal(value).toNumber());
  return locale === "ko" ? `${amount}원` : `${amount} KRW`;
}

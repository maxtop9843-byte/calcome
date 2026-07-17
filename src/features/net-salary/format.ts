import Decimal from "decimal.js";
export const formatSalaryWon = (value: Decimal.Value, locale: "ko" | "en") =>
  `${new Intl.NumberFormat(locale === "ko" ? "ko-KR" : "en-US", { maximumFractionDigits: 0 }).format(new Decimal(value).toNumber())}${locale === "ko" ? "원" : " KRW"}`;

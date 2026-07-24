import {
  publishedCalculators as basePublishedCalculators,
  type PublishedCalculator,
} from "./calculators";

const dividendYieldCalculator = {
  id: "dividend-yield",
  name: "배당수익률 계산기",
  description:
    "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 100만 원당 예상 배당금을 계산합니다.",
  keywords: [
    "배당수익률",
    "배당률",
    "주당 배당금",
    "dividend yield",
  ],
  category: "금융",
  href: "/ko/finance/dividend-yield",
} as const satisfies PublishedCalculator;

export const publishedCalculators = [
  ...basePublishedCalculators,
  dividendYieldCalculator,
] as const satisfies readonly PublishedCalculator[];

export type { PublishedCalculator } from "./calculators";

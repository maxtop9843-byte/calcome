import type { DividendYieldLocale } from "./validation";

export const dividendYieldContent = {
  ko: {
    title: "배당수익률 계산기",
    metaTitle: "배당수익률 계산기 | 주가 대비 배당률 계산",
    description:
      "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 100만 원당 예상 연간 배당금을 계산합니다.",
    category: "투자 계산기",
    intro:
      "배당금 자체가 아니라 현재 주가 대비 수익률을 빠르게 비교할 때 사용하세요.",
    input: "배당수익률 조건",
    sharePrice: "현재 주가",
    annualDividendPerShare: "주당 연간 배당금",
    calculate: "배당수익률 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 배당수익률",
    dividendYield: "배당수익률",
    annualDividendPerMillion: "100만 원당 연간 배당금",
    empty: "계산하면 배당수익률과 투자금 기준 예상 배당금이 표시됩니다.",
    note: "세전 단순 수익률이며 배당 삭감, 세금, 수수료와 환율은 반영하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "주당 연간 배당금을 현재 주가로 나눈 뒤 100을 곱합니다.",
      "투자금 100만 원에 계산된 수익률을 적용해 연간 배당금을 환산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "기업은 배당금을 줄이거나 중단할 수 있습니다.",
      "주가가 변하면 같은 배당금에서도 배당수익률이 달라집니다.",
      "실제 수령액은 세금, 수수료와 환율에 따라 달라질 수 있습니다.",
    ],
  },
  en: {
    title: "Dividend Yield Calculator",
    metaTitle: "Dividend Yield Calculator | Yield From Price and Dividend",
    description:
      "Calculate dividend yield and estimated annual dividend per KRW 1 million from share price and annual dividend per share.",
    category: "Investment calculator",
    intro:
      "Use this to compare annual dividend income relative to the current share price.",
    input: "Dividend yield assumptions",
    sharePrice: "Current share price",
    annualDividendPerShare: "Annual dividend per share",
    calculate: "Calculate dividend yield",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated dividend yield",
    dividendYield: "Dividend yield",
    annualDividendPerMillion: "Annual dividend per KRW 1 million",
    empty: "Calculate to see yield and estimated annual dividend by investment amount.",
    note: "A pre-tax estimate excluding dividend changes, taxes, fees, and currency conversion.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Annual dividend per share is divided by the current share price and multiplied by 100.",
      "The calculated yield is applied to KRW 1 million for an annual income comparison.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Companies can reduce or suspend dividends.",
      "Yield changes when the share price changes even if the dividend stays the same.",
      "Actual income can differ after taxes, fees, and currency conversion.",
    ],
  },
} as const satisfies Record<DividendYieldLocale, object>;

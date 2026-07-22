export type StockProfitLossLocale = "ko" | "en";

export const stockProfitLossContent = {
  ko: {
    title: "주식 수익률 계산기",
    metaTitle: "주식 수익률 계산기 | 손익·수익률 계산",
    description:
      "보유 수량과 평균 매수가격, 현재 가격으로 주식 평가금액과 손익, 수익률을 계산합니다.",
    category: "투자 계산기",
    intro: "매수 원금과 현재 평가금액을 비교해 투자 성과를 간단히 확인하세요.",
    input: "보유 주식 조건",
    shares: "보유 수량",
    averagePurchasePrice: "평균 매수가격",
    currentPrice: "현재 가격",
    calculate: "손익 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 투자 손익",
    profitLoss: "평가 손익",
    returnRate: "수익률",
    currentValue: "현재 평가금액",
    costBasis: "매수 원금",
    details: "계산 상세",
    empty: "계산하면 평가 손익과 수익률이 표시됩니다.",
    note: "거래 수수료, 세금, 배당금, 환율은 포함하지 않은 단순 계산입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "보유 수량에 평균 매수가격을 곱해 매수 원금을 계산합니다.",
      "보유 수량에 현재 가격을 곱해 현재 평가금액을 계산합니다.",
      "평가금액에서 원금을 뺀 손익을 원금으로 나누어 수익률을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "증권사 수수료, 거래세, 환전 비용과 환율 변동은 반영되지 않습니다.",
      "배당금, 주식 분할, 병합, 유상증자 등은 별도로 반영해야 합니다.",
      "표시된 수익률은 과거 매수 대비 단순 결과이며 미래 수익을 보장하지 않습니다.",
    ],
    faq: [
      [
        "손실도 계산되나요?",
        "예. 현재 가격이 평균 매수가격보다 낮으면 손익과 수익률이 음수로 표시됩니다.",
      ],
      [
        "소수점 수량도 입력할 수 있나요?",
        "예. 소수점 주식이나 가상자산 수량도 입력할 수 있습니다.",
      ],
      [
        "수수료와 세금은 포함되나요?",
        "아니요. 실제 실현 손익은 증권사 수수료와 세금에 따라 달라질 수 있습니다.",
      ],
      [
        "매도하지 않은 주식도 계산할 수 있나요?",
        "예. 현재 가격을 사용해 미실현 평가손익을 확인할 수 있습니다.",
      ],
    ] as const,
  },
  en: {
    title: "Stock Profit and Loss Calculator",
    metaTitle: "Stock Profit and Loss Calculator | Return Percentage",
    description:
      "Calculate stock value, profit or loss, and return from shares, average purchase price, and current price.",
    category: "Investment calculator",
    intro:
      "Compare your cost basis with current market value for a quick performance estimate.",
    input: "Stock holding assumptions",
    shares: "Shares held",
    averagePurchasePrice: "Average purchase price",
    currentPrice: "Current price",
    calculate: "Calculate profit or loss",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated investment result",
    profitLoss: "Profit or loss",
    returnRate: "Return",
    currentValue: "Current value",
    costBasis: "Cost basis",
    details: "Calculation details",
    empty: "Calculate to see profit or loss and return percentage.",
    note: "A simple estimate excluding fees, taxes, dividends, and currency conversion.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Shares are multiplied by average purchase price for the cost basis.",
      "Shares are multiplied by current price for the current value.",
      "Profit or loss is divided by cost basis to calculate the return percentage.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Brokerage fees, transaction taxes, foreign-exchange costs, and currency movements are excluded.",
      "Dividends, stock splits, consolidations, and new share issues require separate adjustments.",
      "The displayed return is a simple historical comparison and does not guarantee future performance.",
    ],
    faq: [
      [
        "Does it calculate a loss?",
        "Yes. Profit or loss and return are negative when current price is below average purchase price.",
      ],
      [
        "Can I enter fractional shares?",
        "Yes. Fractional stock or crypto quantities are supported.",
      ],
      [
        "Are fees and taxes included?",
        "No. Realized results can differ based on brokerage fees and taxes.",
      ],
      [
        "Can I calculate an unsold holding?",
        "Yes. Enter the current price to estimate unrealized profit or loss.",
      ],
    ] as const,
  },
} as const;

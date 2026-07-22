export type StockAverageCostLocale = "ko" | "en";

export const stockAverageCostContent = {
  ko: {
    title: "주식 물타기 계산기",
    metaTitle: "주식 물타기 계산기 | 평균단가 계산",
    description:
      "현재 보유 수량과 평균단가, 추가 매수 수량과 가격으로 새로운 주식 평균단가를 계산합니다.",
    category: "투자 계산기",
    intro:
      "추가 매수 전후의 투자금과 평균단가를 비교해 매수 계획을 점검해 보세요.",
    input: "보유 및 추가 매수 조건",
    currentShares: "현재 보유 수량",
    currentAveragePrice: "현재 평균단가",
    additionalShares: "추가 매수 수량",
    additionalPrice: "추가 매수 가격",
    calculate: "새 평균단가 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 평균단가",
    averagePrice: "새 평균단가",
    totalShares: "총 보유 수량",
    totalCost: "총 투자금",
    additionalCost: "추가 매수금",
    currentCost: "기존 투자금",
    details: "계산 상세",
    empty: "계산하면 새 평균단가와 총 투자금이 표시됩니다.",
    note: "거래 수수료, 세금, 환율은 포함하지 않은 단순 가중평균입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "현재 수량에 현재 평균단가를 곱해 기존 투자금을 계산합니다.",
      "추가 수량에 매수가격을 곱해 추가 매수금을 계산합니다.",
      "두 투자금의 합계를 전체 수량으로 나누어 새 평균단가를 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "증권사 수수료, 거래세, 환전 비용과 환율 변동은 반영되지 않습니다.",
      "주식 분할, 병합, 배당 재투자 등이 있었다면 증권사 평균단가와 다를 수 있습니다.",
      "평균단가 하락은 손실 가능성을 낮추거나 수익을 보장하지 않습니다.",
    ],
    faq: [
      [
        "소수점 수량도 입력할 수 있나요?",
        "예. 소수점 주식이나 가상자산 수량도 입력할 수 있습니다.",
      ],
      [
        "여러 번 추가 매수하려면 어떻게 하나요?",
        "한 번 계산한 총 수량과 새 평균단가를 현재 보유 값으로 옮겨 다음 매수를 계산하세요.",
      ],
      [
        "수수료는 포함되나요?",
        "아니요. 실제 평균단가에는 증권사별 수수료와 기타 비용이 반영될 수 있습니다.",
      ],
      [
        "추가 매수가격이 더 높아도 되나요?",
        "예. 불타기 상황에서도 수량 가중 평균단가를 같은 방식으로 계산합니다.",
      ],
    ] as const,
  },
  en: {
    title: "Stock Average Cost Calculator",
    metaTitle: "Stock Average Cost Calculator | Weighted Share Price",
    description:
      "Calculate a new stock average cost from current shares and cost basis plus an additional purchase.",
    category: "Investment calculator",
    intro:
      "Compare your investment and weighted average price before and after an additional purchase.",
    input: "Holding and purchase assumptions",
    currentShares: "Current shares",
    currentAveragePrice: "Current average price",
    additionalShares: "Additional shares",
    additionalPrice: "Additional purchase price",
    calculate: "Calculate new average",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated average cost",
    averagePrice: "New average price",
    totalShares: "Total shares",
    totalCost: "Total investment",
    additionalCost: "Additional investment",
    currentCost: "Existing investment",
    details: "Calculation details",
    empty: "Calculate to see the new average price and total investment.",
    note: "A simple weighted average excluding fees, taxes, and currency conversion.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Current shares are multiplied by the current average price.",
      "Additional shares are multiplied by the new purchase price.",
      "Combined investment is divided by combined shares for the new average price.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Brokerage fees, transaction taxes, foreign-exchange costs, and currency movements are excluded.",
      "Stock splits, consolidations, and reinvested dividends can make your broker's cost basis differ.",
      "A lower average cost does not reduce market risk or guarantee a profit.",
    ],
    faq: [
      [
        "Can I enter fractional shares?",
        "Yes. Fractional stock or crypto quantities are supported.",
      ],
      [
        "How do I model several purchases?",
        "Use each calculated total quantity and average price as the current holding for the next purchase.",
      ],
      [
        "Are fees included?",
        "No. Your broker's actual cost basis can include fees and other adjustments.",
      ],
      [
        "Can the additional price be higher?",
        "Yes. The same quantity-weighted calculation applies when averaging up.",
      ],
    ] as const,
  },
} as const;

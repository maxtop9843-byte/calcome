export type RentConversionRateLocale = "ko" | "en";

export const rentConversionRateContent = {
  ko: {
    title: "전월세 전환율 계산기",
    metaTitle: "전월세 전환율 계산기 | 전세·월세 비교",
    description:
      "전세 보증금과 월세 보증금, 월세로 연간 전월세 전환율을 계산합니다.",
    category: "부동산 계산기",
    intro: "전세와 보증부 월세 조건을 같은 보증금 차액 기준으로 비교해 보세요.",
    input: "임대차 조건",
    jeonseDeposit: "전세 보증금",
    monthlyDeposit: "월세 보증금",
    monthlyRent: "월세",
    calculate: "전환율 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 전월세 전환율",
    conversionRate: "연 전환율",
    annualRent: "연간 월세 합계",
    convertedDeposit: "전환된 보증금 차액",
    monthlyConversionRate: "월 전환율",
    details: "계산 상세",
    empty: "계산하면 전환율과 비교 금액이 표시됩니다.",
    note: "월세 12개월분을 전세와 월세 보증금의 차액으로 나눈 단순 비교율입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "전세 보증금에서 월세 보증금을 빼 전환된 보증금 차액을 구합니다.",
      "월세에 12를 곱해 1년 동안의 월세 합계를 구합니다.",
      "연간 월세를 보증금 차액으로 나눈 뒤 100을 곱해 연 전환율을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 결과는 두 제안의 가격 비교를 위한 단순 전환율이며 적정 임대료를 보장하지 않습니다.",
      "법정 전환율 상한과 적용 요건은 계약 유형과 기준 시점에 따라 달라질 수 있으므로 최신 법령을 확인하세요.",
      "관리비, 대출 이자, 보증금 운용수익, 세금과 중개비는 계산에 포함되지 않습니다.",
    ],
    faq: [
      [
        "전월세 전환율이란 무엇인가요?",
        "전세 보증금 일부를 월세로 바꿀 때 보증금 차액 대비 연간 월세의 비율입니다.",
      ],
      [
        "전환율이 높으면 어떤 뜻인가요?",
        "같은 보증금 차액에 비해 월세 부담이 상대적으로 크다는 뜻입니다.",
      ],
      [
        "월세 보증금이 0원이어도 되나요?",
        "네. 전세 보증금 전액을 월세로 전환한 조건도 비교할 수 있습니다.",
      ],
      [
        "법정 상한과 자동 비교되나요?",
        "아니요. 기준은 바뀔 수 있으므로 계약 시점의 최신 법령과 계약 조건을 별도로 확인해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "Rent Conversion Rate Calculator",
    metaTitle: "Rent Conversion Rate Calculator | Jeonse vs Monthly Rent",
    description:
      "Calculate the annual rent conversion rate from a jeonse deposit, monthly-rent deposit, and monthly rent.",
    category: "Real estate calculator",
    intro:
      "Compare jeonse and deposit-backed monthly rent using the converted deposit difference.",
    input: "Lease assumptions",
    jeonseDeposit: "Jeonse deposit",
    monthlyDeposit: "Monthly-rent deposit",
    monthlyRent: "Monthly rent",
    calculate: "Calculate conversion rate",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated rent conversion rate",
    conversionRate: "Annual conversion rate",
    annualRent: "Annual rent",
    convertedDeposit: "Converted deposit difference",
    monthlyConversionRate: "Monthly conversion rate",
    details: "Calculation details",
    empty: "Calculate to see the conversion rate and comparison amounts.",
    note: "A simple comparison that divides 12 months of rent by the difference between the two deposits.",
    explanationTitle: "How it is calculated",
    explanation: [
      "The monthly-rent deposit is subtracted from the jeonse deposit.",
      "Monthly rent is multiplied by 12 to estimate one year of rent.",
      "Annual rent is divided by the converted deposit difference and multiplied by 100.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This is a simple price comparison and does not determine a fair or permitted rent.",
      "Statutory caps and eligibility can change by lease type and effective date; verify current rules.",
      "Maintenance, financing, deposit returns, taxes, and brokerage costs are excluded.",
    ],
    faq: [
      [
        "What is a rent conversion rate?",
        "It is annual rent as a percentage of the deposit amount converted from jeonse.",
      ],
      [
        "What does a higher rate mean?",
        "Monthly rent is relatively more expensive for the same converted deposit amount.",
      ],
      [
        "Can the monthly-rent deposit be zero?",
        "Yes. You can compare a lease where the full jeonse deposit is converted.",
      ],
      [
        "Does this check the statutory cap?",
        "No. Verify the current rules and the specific lease terms for the contract date.",
      ],
    ] as const,
  },
} as const;

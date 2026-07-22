export type CreditCardInstallmentInterestLocale = "ko" | "en";

export const creditCardInstallmentInterestContent = {
  ko: {
    title: "신용카드 할부 수수료 계산기",
    metaTitle: "신용카드 할부 수수료 계산기 | 할부 이자 계산",
    description:
      "카드 결제 금액과 할부 개월, 연 수수료율로 예상 할부 수수료와 월 납부액을 계산합니다.",
    category: "카드 계산기",
    intro:
      "유이자 할부를 이용하기 전에 총 수수료와 첫 달·마지막 달 예상 납부액을 확인하세요.",
    input: "할부 조건",
    purchaseAmount: "카드 결제 금액",
    installmentMonths: "할부 개월",
    annualFeeRate: "연 할부 수수료율",
    calculate: "할부 수수료 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 할부 비용",
    totalFee: "총 할부 수수료",
    totalPayment: "총 납부액",
    averageMonthlyPayment: "월평균 납부액",
    firstPayment: "첫 달 예상 납부액",
    lastPayment: "마지막 달 예상 납부액",
    details: "납부 추정 상세",
    empty: "계산하면 예상 할부 수수료와 월 납부액이 표시됩니다.",
    note: "원금을 매월 균등하게 나누고 남은 원금에 수수료율을 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "결제 금액을 할부 개월 수로 나누어 매월 같은 원금을 상환한다고 가정합니다.",
      "매월 남은 원금에 연 수수료율을 12로 나눈 월 수수료율을 적용합니다.",
      "원금과 매월 수수료를 합산해 총 납부액과 월평균 납부액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "카드사, 회원 등급, 할부 개월과 가맹점에 따라 실제 수수료율이 다릅니다.",
      "카드사 청구 방식과 원 단위 반올림 때문에 실제 명세서와 차이가 날 수 있습니다.",
      "무이자 또는 부분 무이자 행사는 카드사 조건을 확인한 뒤 실제 부담 기간에 맞춰 비교하세요.",
    ],
    faq: [
      [
        "할부 수수료는 어떻게 계산하나요?",
        "매월 남은 원금에 월 수수료율을 적용하고 모든 달의 수수료를 더합니다.",
      ],
      [
        "왜 첫 달 납부액이 더 큰가요?",
        "원금이 가장 많이 남아 있는 첫 달에 수수료가 가장 크게 계산되기 때문입니다.",
      ],
      [
        "무이자 할부도 계산할 수 있나요?",
        "네. 연 수수료율을 0%로 입력하면 수수료가 없는 동일 원금 납부액을 확인할 수 있습니다.",
      ],
      [
        "부분 무이자는 어떻게 계산하나요?",
        "카드사마다 면제되는 회차가 달라 이 계산기에 직접 반영되지 않으므로 카드사 안내를 확인해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "Credit Card Installment Interest Calculator",
    metaTitle: "Credit Card Installment Interest Calculator",
    description:
      "Estimate credit card installment fees and monthly payments from the purchase amount, term, and annual fee rate.",
    category: "Card calculator",
    intro:
      "Check the estimated total fee and first and final payments before choosing an interest-bearing installment plan.",
    input: "Installment assumptions",
    purchaseAmount: "Card purchase amount",
    installmentMonths: "Installment term",
    annualFeeRate: "Annual installment fee rate",
    calculate: "Calculate installment fees",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated installment cost",
    totalFee: "Total installment fee",
    totalPayment: "Total payment",
    averageMonthlyPayment: "Average monthly payment",
    firstPayment: "Estimated first payment",
    lastPayment: "Estimated final payment",
    details: "Payment estimate details",
    empty: "Calculate to see estimated installment fees and monthly payments.",
    note: "A planning estimate using equal principal payments and a fee on the outstanding balance.",
    explanationTitle: "How it is calculated",
    explanation: [
      "The purchase amount is divided into equal principal installments.",
      "Each month, one twelfth of the annual fee rate is applied to the outstanding principal.",
      "Principal and monthly fees are totaled to estimate the overall and average monthly payments.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Actual rates vary by issuer, cardholder, merchant, and installment term.",
      "Issuer billing methods and currency rounding can make statement amounts differ.",
      "For interest-free or partially interest-free promotions, confirm which installments the issuer waives.",
    ],
    faq: [
      [
        "How are installment fees calculated?",
        "The monthly rate is applied to the outstanding principal and the fees for all months are added.",
      ],
      [
        "Why is the first payment higher?",
        "The fee is highest in the first month because the outstanding principal is largest.",
      ],
      [
        "Can I model an interest-free plan?",
        "Yes. Enter 0% to see equal principal payments without installment fees.",
      ],
      [
        "How do I calculate a partially interest-free plan?",
        "Waived installments vary by issuer, so consult the promotion terms rather than relying on this estimate.",
      ],
    ] as const,
  },
} as const;

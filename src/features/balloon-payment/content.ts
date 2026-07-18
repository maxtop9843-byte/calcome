export type BalloonPaymentLocale = "ko" | "en";

export const balloonPaymentContent = {
  ko: {
    title: "만기 일시상환액 계산기",
    metaTitle: "만기 일시상환액 계산기 | 벌룬 페이먼트",
    description:
      "대출원금, 금리, 기간, 만기 일시상환액을 바탕으로 매월 납입액과 총이자, 만기 부담을 계산합니다.",
    category: "대출 계산기",
    intro:
      "대출 기간에는 일부 원리금을 나누어 내고 만기에 남은 큰 금액을 상환하는 구조를 미리 확인하세요.",
    input: "대출 조건",
    principal: "대출원금",
    annualRate: "연이율",
    termMonths: "대출기간",
    balloonAmount: "만기 일시상환액",
    months: "개월",
    calculate: "상환액 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산 결과",
    monthlyPayment: "매월 납입액",
    finalBalloon: "만기 일시상환액",
    totalInterest: "총이자",
    totalRepayment: "총상환액",
    regularPayments: "월 납입액 합계",
    balloonRatio: "원금 대비 만기 상환 비중",
    empty: "조건을 입력하면 월 납입액과 만기 상환 부담을 표시합니다.",
    note: "고정금리와 매월 동일한 납입일을 가정한 추정치입니다. 실제 대출의 일수 계산, 수수료, 금리 변동은 반영하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "만기에 남길 금액의 현재가치를 대출원금에서 조정한 뒤 원리금균등상환 공식을 적용합니다.",
      "총상환액은 모든 월 납입액과 만기 일시상환액을 더한 금액입니다.",
      "총이자는 총상환액에서 최초 대출원금을 뺀 값입니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "만기 일시상환액을 마련하지 못하면 대환, 만기 연장 또는 담보 처분이 필요할 수 있습니다.",
      "월 부담이 낮아 보여도 일반 원리금균등상환보다 만기 위험과 총이자가 커질 수 있습니다.",
      "계약서의 금리 유형, 중도상환수수료, 만기 연장 조건을 별도로 확인하세요.",
    ],
    faq: [
      [
        "벌룬 페이먼트란 무엇인가요?",
        "대출 기간에는 일부 금액을 나누어 내고 남은 큰 원금을 만기에 한 번에 갚는 방식입니다.",
      ],
      [
        "만기 상환액을 0원으로 입력하면 어떻게 되나요?",
        "일반적인 원리금균등상환과 같은 월 납입액이 계산됩니다.",
      ],
      [
        "만기 상환액을 원금과 같게 할 수 있나요?",
        "가능합니다. 금리가 있다면 기간 중에는 이자만 내는 구조와 같습니다.",
      ],
      [
        "수수료도 포함되나요?",
        "아니요. 계산 결과는 원금과 이자만 반영하므로 각종 수수료는 별도로 비교해야 합니다.",
      ],
    ],
  },
  en: {
    title: "Balloon Payment Calculator",
    metaTitle: "Balloon Payment Calculator",
    description:
      "Estimate monthly payments, total interest, and the final balloon payment from a loan principal, rate, term, and residual balance.",
    category: "Loan calculator",
    intro:
      "Preview a loan structure that amortizes part of the balance through regular payments and leaves a larger amount due at maturity.",
    input: "Loan inputs",
    principal: "Loan principal",
    annualRate: "Annual interest rate",
    termMonths: "Loan term",
    balloonAmount: "Final balloon payment",
    months: "months",
    calculate: "Calculate payments",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Payment estimate",
    monthlyPayment: "Monthly payment",
    finalBalloon: "Final balloon payment",
    totalInterest: "Total interest",
    totalRepayment: "Total repayment",
    regularPayments: "Regular payments total",
    balloonRatio: "Balloon share of principal",
    empty:
      "Enter the loan terms to see regular payments and the amount due at maturity.",
    note: "A planning estimate using a fixed rate and equal monthly payment dates. Day-count rules, fees, and rate changes are excluded.",
    explanationTitle: "How it is calculated",
    explanation: [
      "The fully amortizing formula is adjusted for the present value of the balance intentionally left for maturity.",
      "Total repayment is all regular monthly payments plus the final balloon payment.",
      "Total interest is total repayment minus the original principal.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "If the balloon cannot be paid at maturity, refinancing, an extension, or an asset sale may be required.",
      "A lower monthly payment can come with greater maturity risk and more total interest than full amortization.",
      "Review rate type, prepayment fees, and extension terms in the actual agreement.",
    ],
    faq: [
      [
        "What is a balloon payment?",
        "It is a large balance left due at maturity after smaller regular payments during the loan term.",
      ],
      [
        "What happens if the balloon is zero?",
        "The result is the standard fully amortizing equal monthly payment.",
      ],
      [
        "Can the balloon equal the principal?",
        "Yes. With a positive rate, that produces an interest-only structure during the term.",
      ],
      [
        "Are fees included?",
        "No. The estimate covers principal and interest only, so evaluate fees separately.",
      ],
    ],
  },
} as const;

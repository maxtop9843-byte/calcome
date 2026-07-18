export type EarlyRepaymentFeeLocale = "ko" | "en";

export const earlyRepaymentFeeContent = {
  ko: {
    title: "대출 중도상환수수료 계산기",
    metaTitle: "대출 중도상환수수료 계산기",
    description:
      "상환금액, 수수료율과 남은 약정기간으로 예상 중도상환수수료를 계산합니다.",
    category: "대출 계산기",
    intro:
      "대출을 만기 전에 갚을 때 적용될 수 있는 수수료를 간단히 추정해 보세요.",
    input: "중도상환 조건",
    repaymentAmount: "중도상환금액",
    feeRate: "약정 수수료율",
    originalTermMonths: "최초 약정기간",
    elapsedMonths: "경과기간",
    months: "개월",
    calculate: "중도상환수수료 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "수수료 예상",
    estimatedFee: "예상 중도상환수수료",
    netRepaymentAmount: "수수료 포함 상환액",
    remainingMonths: "남은 약정기간",
    effectiveFeeRate: "잔여기간 반영 수수료율",
    remainingTermRatio: "남은 기간 비율",
    empty: "조건을 입력하면 예상 수수료와 잔여기간을 표시합니다.",
    note: "상환금액 × 약정 수수료율 × 남은 기간 비율로 계산한 단순 추정치입니다. 실제 금융기관은 일수, 면제기간, 상품별 산식과 면제 한도를 적용할 수 있습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "남은 약정기간은 최초 약정기간에서 경과기간을 뺀 값입니다.",
      "남은 기간 비율은 남은 약정기간을 최초 약정기간으로 나눕니다.",
      "예상 수수료는 상환금액에 수수료율과 남은 기간 비율을 곱합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "실제 수수료는 금융기관의 일 단위 계산과 약관을 우선합니다.",
      "일부 상품은 일정 기간 후 수수료가 면제되거나 연간 면제 한도가 있습니다.",
      "대출 상환 전 금융기관에서 정확한 상환 예정금액을 확인하세요.",
    ],
    faq: [
      [
        "부분상환도 계산할 수 있나요?",
        "네. 실제로 먼저 갚을 금액만 중도상환금액에 입력하세요.",
      ],
      [
        "수수료율은 어디서 확인하나요?",
        "대출 약정서나 금융기관 앱의 대출 상세 화면에서 확인하세요.",
      ],
      [
        "경과기간은 어떻게 입력하나요?",
        "대출 실행일부터 상환 예정일까지 지난 기간을 개월 수로 입력하세요.",
      ],
      [
        "결과가 실제 청구액과 다른 이유는 무엇인가요?",
        "실제 산식은 일수와 면제 조건, 상환 시점의 잔액을 반영할 수 있기 때문입니다.",
      ],
    ],
  },
  en: {
    title: "Early Loan Repayment Fee Calculator",
    metaTitle: "Early Loan Repayment Fee Calculator",
    description:
      "Estimate a loan prepayment fee from the repayment amount, contractual fee rate, and remaining term.",
    category: "Loan calculator",
    intro:
      "Estimate the fee that may apply when repaying part or all of a loan before maturity.",
    input: "Early repayment inputs",
    repaymentAmount: "Early repayment amount",
    feeRate: "Contractual fee rate",
    originalTermMonths: "Original contract term",
    elapsedMonths: "Elapsed time",
    months: "months",
    calculate: "Calculate prepayment fee",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Fee estimate",
    estimatedFee: "Estimated prepayment fee",
    netRepaymentAmount: "Repayment including fee",
    remainingMonths: "Remaining contract term",
    effectiveFeeRate: "Prorated fee rate",
    remainingTermRatio: "Remaining-term share",
    empty: "Enter the loan terms to see the estimated fee and remaining term.",
    note: "A simple estimate using repayment amount × contractual fee rate × remaining-term share. Lenders may instead apply exact days, waiver periods, product-specific formulas, or fee-free allowances.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Remaining term subtracts elapsed months from the original contract term.",
      "The remaining-term share divides remaining months by the original term.",
      "The estimated fee multiplies the repayment amount by the fee rate and remaining-term share.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "The lender's day-based calculation and contract terms determine the actual fee.",
      "Some loans waive the fee after a set period or include annual fee-free allowances.",
      "Request an exact payoff quote from the lender before repaying the loan.",
    ],
    faq: [
      [
        "Can I estimate a partial repayment?",
        "Yes. Enter only the principal amount you plan to repay early.",
      ],
      [
        "Where can I find the fee rate?",
        "Check the loan agreement or the loan details in your lender's app.",
      ],
      [
        "How should I enter elapsed time?",
        "Enter the completed months from loan funding to the planned repayment date.",
      ],
      [
        "Why might the actual charge differ?",
        "The lender may use exact days, waiver rules, and the balance on the repayment date.",
      ],
    ],
  },
} as const;

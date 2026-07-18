export type LoanInterestComparisonLocale = "ko" | "en";

export const loanInterestComparisonContent = {
  ko: {
    title: "대출 이자 비교 계산기",
    metaTitle: "대출 이자 비교 계산기 | 금리별 상환액 비교",
    description:
      "같은 대출원금과 기간에서 두 금리의 월 상환액, 총이자와 절감액을 비교합니다.",
    category: "대출 계산기",
    intro:
      "두 대출 조건의 원리금균등상환 결과를 나란히 비교해 더 낮은 이자 비용을 확인하세요.",
    input: "비교 조건",
    principal: "대출원금",
    annualRateA: "대출 A 연이율",
    annualRateB: "대출 B 연이율",
    termMonths: "상환기간",
    months: "개월",
    calculate: "대출 이자 비교하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "비교 결과",
    lowerCost: "총이자가 낮은 대출",
    sameCost: "두 대출의 총이자가 같습니다",
    option: (name: string) => `대출 ${name}`,
    monthlyPayment: "월 상환액",
    totalInterest: "총이자",
    totalPayment: "총상환액",
    savings: "예상 이자 절감액",
    paymentDifference: "월 상환액 차이",
    empty: "계산하면 두 대출의 월 상환액과 총이자를 비교해 표시합니다.",
    note: "원리금균등상환과 매월 동일한 금리를 가정한 계획용 추정치입니다. 수수료, 중도상환, 금리 변동은 반영하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "두 대출 모두 같은 원금과 기간에 원리금균등상환 공식을 적용합니다.",
      "월 상환액에 전체 개월 수를 곱한 뒤 원금을 빼 총이자를 계산합니다.",
      "예상 이자 절감액은 두 총이자의 차이이며, 더 낮은 쪽을 표시합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "실제 납부액은 실행일, 일수 계산, 금리 변동과 금융기관의 반올림 방식에 따라 달라질 수 있습니다.",
      "인지세, 보증료, 중도상환수수료 등 금리 외 비용은 별도로 비교하세요.",
      "금리 유형과 우대조건, 상환 방식이 동일한 조건인지 확인하세요.",
    ],
    faq: [
      [
        "어떤 상환 방식을 사용하나요?",
        "매월 같은 금액을 내는 원리금균등상환을 사용합니다.",
      ],
      [
        "0% 금리도 비교할 수 있나요?",
        "네. 0%일 때는 원금을 기간으로 나눈 금액을 월 상환액으로 계산합니다.",
      ],
      [
        "절감액에 수수료가 포함되나요?",
        "아닙니다. 이자 차이만 비교하므로 부대비용은 별도로 확인해야 합니다.",
      ],
      [
        "대출 기간이 서로 다르면 어떻게 하나요?",
        "이 계산기는 같은 기간의 금리를 비교합니다. 기간이 다르면 각각 대출 계산기로 총비용을 확인하세요.",
      ],
    ],
  },
  en: {
    title: "Loan Interest Comparison Calculator",
    metaTitle: "Loan Interest Comparison Calculator",
    description:
      "Compare monthly payments, total interest, and estimated savings for two rates on the same loan principal and term.",
    category: "Loan calculator",
    intro:
      "Compare two fully amortizing loan rates side by side and identify the lower interest cost.",
    input: "Comparison inputs",
    principal: "Loan principal",
    annualRateA: "Loan A annual rate",
    annualRateB: "Loan B annual rate",
    termMonths: "Repayment term",
    months: "months",
    calculate: "Compare loan interest",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Comparison result",
    lowerCost: "Lower total-interest loan",
    sameCost: "Both loans have the same total interest",
    option: (name: string) => `Loan ${name}`,
    monthlyPayment: "Monthly payment",
    totalInterest: "Total interest",
    totalPayment: "Total repayment",
    savings: "Estimated interest savings",
    paymentDifference: "Monthly payment difference",
    empty: "Calculate to compare monthly payments and total interest.",
    note: "A planning estimate using fully amortizing payments and a constant monthly rate. Fees, prepayments, and rate changes are excluded.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Both options use the same principal and term with a fully amortizing payment formula.",
      "Total interest equals the monthly payment times the number of months, minus principal.",
      "Estimated savings is the difference between total interest amounts, with the lower option identified.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Actual payments can vary with funding date, day-count method, rate changes, and lender rounding.",
      "Compare fees, guarantees, and prepayment charges separately from the interest rate.",
      "Confirm that rate type, discounts, and repayment method are comparable.",
    ],
    faq: [
      [
        "Which repayment method is used?",
        "The calculator uses equal monthly payments on a fully amortizing loan.",
      ],
      [
        "Can I compare a 0% rate?",
        "Yes. At 0%, monthly payment is principal divided by the term.",
      ],
      [
        "Do savings include fees?",
        "No. Only interest is compared, so evaluate other borrowing costs separately.",
      ],
      [
        "What if the loan terms differ?",
        "This comparison uses one shared term. Calculate each loan separately when terms differ.",
      ],
    ],
  },
} as const;

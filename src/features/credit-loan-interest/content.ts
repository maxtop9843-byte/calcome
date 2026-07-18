export type CreditLoanInterestLocale = "ko" | "en";

export const creditLoanInterestContent = {
  ko: {
    title: "신용대출 이자 계산기",
    metaTitle: "신용대출 이자 계산기",
    description:
      "대출금, 금리와 기간으로 신용대출의 월 이자와 총비용을 계산합니다.",
    category: "대출 계산기",
    intro:
      "만기일시상환형 신용대출을 기준으로 매월 부담할 이자와 부대비용을 확인하세요.",
    input: "신용대출 조건",
    loanAmount: "대출금",
    annualRate: "연이율",
    termMonths: "대출 기간",
    monthlyFees: "월 부대비용",
    months: "개월",
    calculate: "신용대출 이자 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "이자 예상",
    monthlyInterest: "월 이자",
    monthlyCost: "월 예상 부담액",
    totalCost: "기간 총비용",
    annualInterest: "연 이자",
    totalInterest: "기간 총이자",
    dailyInterest: "일평균 이자",
    empty: "조건을 입력하면 월 이자와 기간 전체 비용을 표시합니다.",
    note: "원금은 만기에 상환하고 매월 이자만 납부한다고 가정한 단순 추정치입니다. 실제 상환 방식과 수수료는 금융기관별로 다릅니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "월 이자는 대출금에 연이율을 적용한 뒤 12개월로 나눕니다.",
      "기간 총이자는 월 이자에 입력한 대출 개월 수를 곱합니다.",
      "기간 총비용은 총이자와 입력한 월 부대비용의 합계입니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "계산 결과는 대출 승인이나 실제 금융기관 견적을 보장하지 않습니다.",
      "중도상환수수료, 인지세와 일회성 비용은 별도로 확인하세요.",
      "원금 분할상환이나 변동금리 상품은 실제 납부액이 달라질 수 있습니다.",
    ],
    faq: [
      [
        "원금 상환액도 포함되나요?",
        "아니요. 만기일시상환형을 가정해 이자와 입력한 월 부대비용만 계산합니다.",
      ],
      [
        "부대비용은 어떻게 반영하나요?",
        "매월 반복되는 비용을 월 부대비용에 입력하세요. 일회성 비용은 포함되지 않습니다.",
      ],
      [
        "대출 기간은 어떻게 입력하나요?",
        "거치 또는 계약 기간을 개월 수로 입력하세요.",
      ],
      [
        "0% 금리도 계산할 수 있나요?",
        "네. 이자는 0원이며 입력한 월 부대비용만 총비용에 반영됩니다.",
      ],
    ],
  },
  en: {
    title: "Credit Loan Interest Calculator",
    metaTitle: "Credit Loan Interest Calculator",
    description:
      "Estimate monthly interest and total cost for an unsecured personal loan from its amount, rate, and term.",
    category: "Loan calculator",
    intro:
      "Review interest and recurring fees for an interest-only unsecured loan whose principal is repaid at maturity.",
    input: "Credit loan inputs",
    loanAmount: "Loan amount",
    annualRate: "Annual interest rate",
    termMonths: "Loan term",
    monthlyFees: "Monthly fees",
    months: "months",
    calculate: "Calculate interest",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Interest estimate",
    monthlyInterest: "Monthly interest",
    monthlyCost: "Estimated monthly cost",
    totalCost: "Total cost over term",
    annualInterest: "Annual interest",
    totalInterest: "Total interest over term",
    dailyInterest: "Average daily interest",
    empty: "Enter the loan terms to see monthly interest and total cost.",
    note: "A simple estimate assuming interest-only monthly payments and principal repayment at maturity. Actual repayment terms and fees vary by lender.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Monthly interest applies the annual rate to the loan and divides it by 12.",
      "Total interest multiplies monthly interest by the entered term in months.",
      "Total cost adds all entered monthly fees to total interest.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "The estimate does not guarantee approval or an actual lender quote.",
      "Check prepayment penalties, stamp tax, and one-time charges separately.",
      "Amortizing principal or adjustable rates can change actual payments.",
    ],
    faq: [
      [
        "Does this include principal repayment?",
        "No. It assumes interest-only payments and calculates interest plus entered monthly fees.",
      ],
      [
        "How do I include fees?",
        "Enter recurring charges as monthly fees. One-time charges are not included.",
      ],
      [
        "How should I enter the term?",
        "Enter the interest-only or contract period in months.",
      ],
      [
        "Can I calculate a zero-percent loan?",
        "Yes. Interest is zero and only entered monthly fees remain in total cost.",
      ],
    ],
  },
} as const;

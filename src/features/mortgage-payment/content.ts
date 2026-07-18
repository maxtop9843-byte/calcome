export type MortgagePaymentLocale = "ko" | "en";

export const mortgagePaymentContent = {
  ko: {
    title: "주택담보대출 상환액 계산기",
    metaTitle: "주택담보대출 상환액 계산기 | 모기지 계산기",
    description:
      "주택가격, 계약금, 금리와 기간으로 주택담보대출의 월 상환액과 총이자를 계산합니다.",
    category: "대출 계산기",
    intro:
      "원리금균등상환액에 월 세금·보험료 등 부대비용을 더해 예상 주거비를 확인하세요.",
    input: "주택담보대출 조건",
    homePrice: "주택가격",
    downPayment: "계약금·자기자금",
    annualRate: "연이율",
    termYears: "대출기간",
    monthlyCosts: "월 세금·보험 등 부대비용",
    years: "년",
    calculate: "월 상환액 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산 결과",
    monthlyPrincipalAndInterest: "월 원리금",
    estimatedMonthlyPayment: "예상 월 주거비",
    totalInterest: "총이자",
    loanAmount: "대출원금",
    totalLoanPayments: "대출 총상환액",
    downPaymentRatio: "주택가격 대비 자기자금",
    empty: "조건을 입력하면 월 원리금과 예상 총 주거비를 표시합니다.",
    note: "고정금리와 매월 같은 금액의 원리금균등상환을 가정한 추정치입니다. 실제 심사, 변동금리, 취득비용과 수수료는 반영하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "대출원금은 주택가격에서 계약금 또는 자기자금을 뺀 금액입니다.",
      "월 원리금은 고정금리 원리금균등상환 공식을 적용해 계산합니다.",
      "예상 월 주거비는 월 원리금에 사용자가 입력한 세금·보험 등 부대비용을 더합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "계산 결과는 대출 승인 또는 실제 금융기관 견적을 보장하지 않습니다.",
      "중도상환수수료, 보증료, 취득세와 등기비용은 별도로 확인하세요.",
      "변동금리는 향후 월 상환액과 총이자를 바꿀 수 있습니다.",
    ],
    faq: [
      [
        "월 원리금에는 무엇이 포함되나요?",
        "대출원금과 이자만 포함됩니다. 세금·보험 등은 별도 입력값으로 더합니다.",
      ],
      [
        "금리가 0%여도 계산할 수 있나요?",
        "네. 대출원금을 전체 개월 수로 나눈 월 상환액을 표시합니다.",
      ],
      [
        "계약금은 어떻게 입력하나요?",
        "주택 구입에 투입할 자기자금 중 대출원금에서 제외할 금액을 입력하세요.",
      ],
      [
        "실제 납부액과 다른 이유는 무엇인가요?",
        "금융기관의 일수 계산, 금리 유형, 수수료와 실제 세금·보험료가 다를 수 있습니다.",
      ],
    ],
  },
  en: {
    title: "Mortgage Payment Calculator",
    metaTitle: "Mortgage Payment Calculator",
    description:
      "Estimate a mortgage's monthly payment and total interest from the home price, down payment, rate, and term.",
    category: "Loan calculator",
    intro:
      "Combine an equal principal-and-interest payment with estimated monthly taxes, insurance, and other housing costs.",
    input: "Mortgage inputs",
    homePrice: "Home price",
    downPayment: "Down payment",
    annualRate: "Annual interest rate",
    termYears: "Loan term",
    monthlyCosts: "Monthly taxes, insurance, and other costs",
    years: "years",
    calculate: "Calculate payment",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Payment estimate",
    monthlyPrincipalAndInterest: "Monthly principal and interest",
    estimatedMonthlyPayment: "Estimated monthly housing payment",
    totalInterest: "Total interest",
    loanAmount: "Loan amount",
    totalLoanPayments: "Total loan payments",
    downPaymentRatio: "Down payment share of price",
    empty:
      "Enter the mortgage terms to see the monthly loan and housing-cost estimates.",
    note: "A planning estimate using a fixed rate and equal monthly principal-and-interest payments. Approval terms, adjustable rates, acquisition costs, and fees are excluded.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Loan amount is the home price minus the down payment.",
      "Monthly principal and interest uses the fixed-rate, fully amortizing payment formula.",
      "Estimated monthly housing payment adds the entered taxes, insurance, and other costs.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "The estimate does not guarantee loan approval or an actual lender quote.",
      "Check prepayment charges, guarantee fees, taxes, and closing costs separately.",
      "An adjustable interest rate can change future payments and total interest.",
    ],
    faq: [
      [
        "What is included in principal and interest?",
        "Only repayment of the loan balance and interest. Add taxes and insurance through the separate monthly-cost input.",
      ],
      [
        "Can I calculate a zero-percent loan?",
        "Yes. The loan amount is divided evenly across all months.",
      ],
      [
        "What should I enter as the down payment?",
        "Enter the cash contribution that reduces the amount you need to borrow.",
      ],
      [
        "Why might the real payment differ?",
        "Lender day-count rules, rate type, fees, and actual taxes and insurance can differ.",
      ],
    ],
  },
} as const;

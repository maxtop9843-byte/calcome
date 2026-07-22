export type LoanAffordabilityLocale = "ko" | "en";

export const loanAffordabilityContent = {
  ko: {
    title: "대출 한도 계산기",
    metaTitle: "대출 한도 계산기 | 소득 기준 대출 가능 금액",
    description:
      "연소득과 기존 부채, 목표 부채상환 비율, 금리와 기간으로 예상 대출 가능 금액을 계산합니다.",
    category: "대출 계산기",
    intro:
      "소득 중 부채 상환에 사용할 비율을 정하고 기존 월 상환액을 뺀 뒤 감당 가능한 대출 원금을 추정하세요.",
    input: "소득과 대출 조건",
    annualIncome: "연소득",
    otherMonthlyDebt: "기존 월 부채 상환액",
    debtServiceLimit: "목표 부채상환 비율",
    interestRate: "예상 연이율",
    termYears: "상환 기간",
    calculate: "대출 한도 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 대출 한도",
    maximumLoan: "최대 대출 원금",
    availablePayment: "신규 대출 월 상환 가능액",
    maximumMonthlyDebt: "전체 월 부채상환 한도",
    details: "상환 추정 상세",
    totalRepayment: "신규 대출 총 상환액",
    totalInterest: "신규 대출 총 이자",
    limitUsed: "적용한 부채상환 비율",
    empty: "계산하면 예상 대출 한도와 월 상환 가능액이 표시됩니다.",
    note: "원리금균등상환과 입력한 비율을 가정한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "연소득에 목표 부채상환 비율을 곱하고 12로 나눠 전체 월 부채상환 한도를 구합니다.",
      "전체 한도에서 기존 월 부채 상환액을 빼 신규 대출에 쓸 수 있는 월 상환액을 구합니다.",
      "예상 금리와 기간을 적용한 원리금균등상환식으로 감당 가능한 원금을 역산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "입력한 비율은 사용자가 선택한 계획 기준이며 금융기관의 DSR·DTI 심사 기준과 다를 수 있습니다.",
      "스트레스 금리, 소득 인정 방식, 대출별 만기 제한과 예외는 반영하지 않습니다.",
      "계산 결과는 승인을 보장하지 않으므로 실제 한도는 금융기관에서 확인하세요.",
    ],
    faq: [
      [
        "대출 한도는 어떻게 계산하나요?",
        "소득 기준 월 부채상환 예산에서 기존 부채를 빼고 남은 금액으로 상환 가능한 원금을 계산합니다.",
      ],
      [
        "목표 비율은 무엇인가요?",
        "연소득 중 모든 부채의 연간 원리금 상환에 사용할 비율을 직접 입력하는 계획 기준입니다.",
      ],
      [
        "기존 월 부채에는 무엇을 넣나요?",
        "신용대출, 자동차 할부 등 현재 매달 갚는 원금과 이자의 합계를 입력하세요.",
      ],
      [
        "결과가 0원인 이유는 무엇인가요?",
        "기존 월 부채 상환액이 소득 기준 전체 한도 이상이면 신규 대출에 사용할 상환 여력이 없기 때문입니다.",
      ],
    ] as const,
  },
  en: {
    title: "Loan Affordability Calculator",
    metaTitle: "Loan Affordability Calculator",
    description:
      "Estimate an affordable loan amount from income, existing debt, a target debt-service ratio, rate, and term.",
    category: "Loan calculator",
    intro:
      "Choose how much of income can service debt, subtract existing monthly payments, and estimate the principal that fits the remaining budget.",
    input: "Income and loan assumptions",
    annualIncome: "Annual income",
    otherMonthlyDebt: "Existing monthly debt payments",
    debtServiceLimit: "Target debt-service ratio",
    interestRate: "Estimated annual interest rate",
    termYears: "Repayment term",
    calculate: "Calculate affordability",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated loan affordability",
    maximumLoan: "Maximum loan principal",
    availablePayment: "Available new-loan monthly payment",
    maximumMonthlyDebt: "Total monthly debt budget",
    details: "Repayment estimate details",
    totalRepayment: "Total new-loan repayment",
    totalInterest: "Total new-loan interest",
    limitUsed: "Debt-service ratio used",
    empty:
      "Calculate to see the estimated loan amount and monthly payment budget.",
    note: "A planning estimate assuming level principal-and-interest payments and the ratio entered.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Annual income is multiplied by the target debt-service ratio and divided by 12 to find the total monthly debt budget.",
      "Existing monthly debt payments are subtracted to find the amount available for a new loan.",
      "The affordable principal is derived with a level-payment amortization formula using the rate and term entered.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "The ratio entered is a planning assumption and may differ from a lender's DSR or DTI rules.",
      "Stress rates, recognized-income methods, loan-specific term limits, and exceptions are not modeled.",
      "The estimate does not guarantee approval; confirm an actual limit with a lender.",
    ],
    faq: [
      [
        "How is the affordable loan calculated?",
        "The calculator subtracts existing debt from an income-based monthly debt budget, then converts the remainder into an amortizing principal.",
      ],
      [
        "What is the target ratio?",
        "It is your planning limit for annual principal and interest payments across all debts as a share of annual income.",
      ],
      [
        "What counts as existing monthly debt?",
        "Enter combined principal and interest currently paid each month, such as personal loans or auto financing.",
      ],
      [
        "Why is the result zero?",
        "Existing monthly debt already meets or exceeds the total income-based debt budget.",
      ],
    ] as const,
  },
} as const;

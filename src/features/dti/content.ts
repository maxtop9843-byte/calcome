export type DtiLocale = "ko" | "en";

export const dtiContent = {
  ko: {
    title: "DTI 계산기",
    metaTitle: "DTI 계산기 | 총부채상환비율 계산",
    description:
      "연소득, 주택담보대출 조건과 기타 월 부채 상환액으로 예상 DTI를 계산합니다.",
    category: "대출 계산기",
    intro:
      "주택담보대출과 기타 부채의 연간 상환 부담이 소득에서 차지하는 비율을 확인하세요.",
    input: "소득과 부채 조건",
    annualIncome: "연소득",
    mortgagePrincipal: "주택담보대출금",
    interestRate: "주택담보대출 연이율",
    termYears: "상환 기간",
    otherMonthlyDebt: "기타 월 부채 상환액",
    calculate: "DTI 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 DTI",
    dti: "총부채상환비율",
    mortgagePayment: "주택담보대출 월 상환액",
    totalMonthlyDebt: "총 월 부채 상환액",
    details: "상환 부담 상세",
    annualDebt: "총 연간 부채 상환액",
    otherDebt: "기타 월 부채 상환액",
    income: "입력 연소득",
    empty: "계산하면 예상 DTI와 상환 부담이 표시됩니다.",
    note: "주택담보대출의 원리금균등상환과 입력한 기타 월 상환액을 가정한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "DTI는 연간 부채 상환액을 연소득으로 나눈 뒤 100을 곱합니다.",
      "주택담보대출은 입력한 금리와 기간에 따른 원리금균등 월 상환액으로 추정합니다.",
      "기타 월 부채 상환액을 더한 뒤 12배해 연간 부담을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "금융기관은 대출 종류별 원금 반영 방식과 인정소득을 별도 기준으로 산정할 수 있습니다.",
      "스트레스 금리, 규제 비율과 예외 대출은 이 계산에 반영되지 않습니다.",
      "실제 한도와 적용 기준은 금융기관에서 확인하세요.",
    ],
    faq: [
      [
        "DTI란 무엇인가요?",
        "총부채상환비율로, 연소득 대비 주택담보대출과 기타 부채의 연간 상환 부담을 나타냅니다.",
      ],
      [
        "DSR과 무엇이 다른가요?",
        "DSR은 일반적으로 모든 대출의 원리금을 반영하고, DTI는 주택담보대출 중심의 별도 심사 기준입니다.",
      ],
      [
        "기타 월 부채에는 무엇을 입력하나요?",
        "신용대출 등 주택담보대출 외 부채에 매달 갚는 금액을 입력하세요.",
      ],
      [
        "계산 결과가 대출 승인을 보장하나요?",
        "아닙니다. 실제 심사는 금융기관과 규제 기준에 따라 달라집니다.",
      ],
    ] as const,
  },
  en: {
    title: "DTI Calculator",
    metaTitle: "DTI Calculator",
    description:
      "Estimate debt-to-income ratio from annual income, mortgage terms, and other monthly debt payments.",
    category: "Loan calculator",
    intro:
      "See how estimated annual mortgage and other debt payments compare with gross annual income.",
    input: "Income and debt inputs",
    annualIncome: "Annual income",
    mortgagePrincipal: "Mortgage amount",
    interestRate: "Mortgage annual interest rate",
    termYears: "Repayment term",
    otherMonthlyDebt: "Other monthly debt payments",
    calculate: "Calculate DTI",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated DTI",
    dti: "Debt-to-income ratio",
    mortgagePayment: "Mortgage monthly payment",
    totalMonthlyDebt: "Total monthly debt payments",
    details: "Debt payment details",
    annualDebt: "Total annual debt payments",
    otherDebt: "Other monthly debt payments",
    income: "Annual income entered",
    empty: "Calculate to see estimated DTI and debt-payment amounts.",
    note: "A planning estimate assuming level mortgage payments plus the other monthly payments entered.",
    explanationTitle: "How it is calculated",
    explanation: [
      "DTI equals estimated annual debt payments divided by gross annual income, multiplied by 100.",
      "The mortgage uses a level principal-and-interest monthly payment based on the rate and term entered.",
      "Other monthly debt payments are added before the monthly total is annualized.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Lenders may use different rules for recognized income and principal treatment by loan type.",
      "Stress rates, regulatory thresholds, and excluded loans are not modeled.",
      "Confirm the applicable method and limit with a lender.",
    ],
    faq: [
      [
        "What is DTI?",
        "Debt-to-income ratio compares estimated annual mortgage and other debt payments with gross annual income.",
      ],
      [
        "How is DTI different from DSR?",
        "DSR generally counts principal and interest across all loans, while DTI is a separate mortgage-focused underwriting measure.",
      ],
      [
        "What belongs in other monthly debt?",
        "Enter monthly payments for debts other than the mortgage scenario, such as personal loans.",
      ],
      [
        "Does the result guarantee approval?",
        "No. Actual underwriting depends on lender and regulatory rules.",
      ],
    ] as const,
  },
} as const;

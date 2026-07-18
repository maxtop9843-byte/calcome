export type LtvLocale = "ko" | "en";

export const ltvContent = {
  ko: {
    title: "LTV 계산기",
    metaTitle: "LTV 계산기 | 주택담보대출비율 계산",
    description:
      "담보가치와 대출금액으로 예상 LTV와 목표 비율 기준 대출 여력을 계산합니다.",
    category: "대출 계산기",
    intro:
      "담보가치 대비 대출 비율과 목표 LTV에 따른 최대 대출금액을 한눈에 확인하세요.",
    input: "담보와 대출 조건",
    propertyValue: "담보가치",
    loanAmount: "대출금액",
    targetLtvRate: "목표 LTV",
    calculate: "LTV 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 LTV",
    ltvRate: "담보인정비율",
    maximumLoan: "목표 LTV 기준 최대 대출금액",
    remainingCapacity: "추가 대출 여력",
    details: "담보 구성 상세",
    equity: "담보가치 중 자기자본",
    enteredProperty: "입력 담보가치",
    enteredLoan: "입력 대출금액",
    empty: "계산하면 예상 LTV와 목표 비율 기준 대출 여력이 표시됩니다.",
    note: "단순 비율에 따른 계획용 추정치이며 금융기관의 인정 담보가치와 실제 대출 한도는 다를 수 있습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "LTV는 대출금액을 담보가치로 나눈 뒤 100을 곱합니다.",
      "목표 LTV 기준 최대 대출금액은 담보가치에 목표 비율을 곱합니다.",
      "추가 대출 여력은 목표 최대 금액에서 현재 대출금액을 뺀 값이며 음수는 0원으로 표시합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "금융기관은 시세, 감정가, 선순위 채권 등을 반영해 담보가치를 다르게 인정할 수 있습니다.",
      "지역, 주택 보유 수, 대출 목적과 규제에 따라 적용 LTV가 달라질 수 있습니다.",
      "실제 한도와 금리는 금융기관의 심사 결과를 확인하세요.",
    ],
    faq: [
      [
        "LTV란 무엇인가요?",
        "주택담보대출비율로, 담보가치 대비 대출금액의 비율입니다.",
      ],
      [
        "담보가치에는 무엇을 입력하나요?",
        "시세나 감정가 등 금융기관이 인정할 것으로 예상하는 담보가치를 입력합니다.",
      ],
      [
        "목표 LTV는 어떻게 정하나요?",
        "비교하려는 규제 또는 금융기관 기준 비율을 입력하세요. 실제 적용 비율은 개인별로 다릅니다.",
      ],
      [
        "추가 대출 여력이 실제 승인 한도인가요?",
        "아닙니다. 단순 LTV 차이이며 DSR, 소득, 신용도와 선순위 채권 등은 반영하지 않습니다.",
      ],
    ],
  },
  en: {
    title: "LTV Calculator",
    metaTitle: "LTV Calculator",
    description:
      "Estimate loan-to-value ratio and target-based borrowing capacity from property value and loan amount.",
    category: "Loan calculator",
    intro:
      "Compare a loan with its collateral value and see the maximum amount at a target LTV.",
    input: "Property and loan inputs",
    propertyValue: "Property value",
    loanAmount: "Loan amount",
    targetLtvRate: "Target LTV",
    calculate: "Calculate LTV",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated LTV",
    ltvRate: "Loan-to-value ratio",
    maximumLoan: "Maximum loan at target LTV",
    remainingCapacity: "Remaining borrowing capacity",
    details: "Collateral details",
    equity: "Owner equity in property",
    enteredProperty: "Property value entered",
    enteredLoan: "Loan amount entered",
    empty:
      "Calculate to see estimated LTV and target-based borrowing capacity.",
    note: "A planning estimate based on simple ratios; a lender's recognized collateral value and actual limit may differ.",
    explanationTitle: "How it is calculated",
    explanation: [
      "LTV equals the loan amount divided by property value, multiplied by 100.",
      "The maximum loan at the target LTV equals property value multiplied by the target rate.",
      "Remaining capacity is the target maximum minus the current loan and is shown as zero when negative.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Lenders may recognize a different collateral value after valuation and prior-lien adjustments.",
      "Applicable LTV can vary by location, ownership, loan purpose, and current regulation.",
      "Confirm the actual limit and rate through lender underwriting.",
    ],
    faq: [
      [
        "What is LTV?",
        "Loan-to-value ratio compares a secured loan amount with the collateral value.",
      ],
      [
        "Which property value should I enter?",
        "Use the market or appraised value you expect the lender to recognize.",
      ],
      [
        "How should I choose a target LTV?",
        "Enter the regulatory or lender ratio you want to compare. Your actual rate may differ.",
      ],
      [
        "Is remaining capacity an approved limit?",
        "No. It is only the LTV difference and excludes DSR, income, credit, and prior liens.",
      ],
    ],
  },
} as const;

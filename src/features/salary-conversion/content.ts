export type SalaryConversionLocale = "ko" | "en";

export const salaryConversionContent = {
  ko: {
    title: "연봉·월급 환산 계산기",
    metaTitle: "연봉·월급 환산 계산기",
    category: "근로·급여 계산기",
    description:
      "연봉 또는 월급을 입력해 월급·주급·연봉 기준 금액으로 환산합니다.",
    intro: "급여 조건을 같은 기준으로 바꿔 비교해 보세요.",
    input: "급여 조건",
    annual: "연봉 기준",
    monthly: "월급 기준",
    salary: "급여",
    placeholder: "예: 50,000,000",
    calculate: "급여 환산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "환산 결과",
    annualSalary: "연봉",
    monthlySalary: "월급",
    weeklySalary: "주급",
    note: "세전 기준의 단순 환산이며 상여금·수당·세금은 반영하지 않습니다.",
    empty: "급여를 입력하면 환산 결과가 표시됩니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "월급은 연봉을 12로 나누어 계산합니다.",
      "주급은 연봉을 52주로 나누어 계산합니다.",
    ],
    cautionsTitle: "주의사항",
    cautions: [
      "실제 지급 횟수와 상여금 구성은 회사별로 다를 수 있습니다.",
      "실수령액은 세금과 4대보험 공제에 따라 달라집니다.",
    ],
    faq: [
      [
        "월급을 연봉으로 어떻게 환산하나요?",
        "월급에 12를 곱해 연봉으로 환산합니다.",
      ],
      [
        "세후 금액도 계산되나요?",
        "아니요. 이 계산기는 세전 급여만 단순 환산합니다.",
      ],
    ],
  },
  en: {
    title: "Salary Conversion Calculator",
    metaTitle: "Salary Conversion Calculator",
    category: "Employment calculator",
    description:
      "Convert an annual or monthly salary into annual, monthly, and weekly gross pay.",
    intro: "Compare pay offers on a consistent basis.",
    input: "Salary inputs",
    annual: "Annual salary",
    monthly: "Monthly salary",
    salary: "Salary",
    placeholder: "e.g. 50,000,000",
    calculate: "Convert salary",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Converted pay",
    annualSalary: "Annual salary",
    monthlySalary: "Monthly salary",
    weeklySalary: "Weekly salary",
    note: "A simple gross-pay conversion; bonuses, allowances, tax, and deductions are excluded.",
    empty: "Enter a salary to see the converted amounts.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Monthly salary equals annual salary divided by 12.",
      "Weekly salary equals annual salary divided by 52.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Actual pay frequency and bonus structure vary by employer.",
      "Take-home pay changes with tax and social-insurance deductions.",
    ],
    faq: [
      ["How is monthly pay annualized?", "Monthly salary is multiplied by 12."],
      [
        "Does this calculate take-home pay?",
        "No. It converts gross salary only.",
      ],
    ],
  },
} as const;

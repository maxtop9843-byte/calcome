export type DebtRepaymentPeriodLocale = "ko" | "en";

export const debtRepaymentPeriodContent = {
  ko: {
    title: "대출 상환 기간 계산기",
    metaTitle: "대출 상환 기간 계산기 | 완납 기간과 이자 계산",
    description:
      "대출 잔액과 금리, 매월 상환액으로 예상 완납 기간과 총 이자를 계산합니다.",
    category: "대출 계산기",
    intro:
      "현재 조건을 유지할 때 빚을 모두 갚는 데 걸리는 기간과 마지막 상환액을 확인하세요.",
    input: "대출과 상환 조건",
    balance: "현재 대출 잔액",
    interestRate: "연이율",
    monthlyPayment: "매월 상환액",
    calculate: "상환 기간 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 상환 기간",
    payoffPeriod: "완납까지 걸리는 기간",
    totalRepayment: "총 상환액",
    totalInterest: "총 이자",
    finalPayment: "마지막 달 상환액",
    details: "상환 추정 상세",
    empty: "계산하면 예상 완납 기간과 총 이자가 표시됩니다.",
    unpayable:
      "월 상환액이 발생 이자보다 충분히 크지 않아 100년 안에 완납할 수 없습니다.",
    note: "매월 같은 금액을 납부하고 금리가 변하지 않는다고 가정한 계획용 추정치입니다.",
    monthUnit: "개월",
    yearMonth: (months: number) =>
      `${Math.floor(months / 12)}년 ${months % 12}개월`,
    explanationTitle: "계산 방법",
    explanation: [
      "매월 대출 잔액에 월 이율을 적용한 뒤 입력한 상환액을 차감합니다.",
      "잔액이 0원이 될 때까지 반복하며 마지막 달에는 남은 원금과 이자만 납부하는 것으로 계산합니다.",
      "총 상환액에서 최초 대출 잔액을 빼 총 이자를 구합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "변동금리, 중도상환수수료, 연체이자와 추가 대출은 반영하지 않습니다.",
      "실제 금융기관의 일할 이자 계산과 납부일에 따라 결과가 달라질 수 있습니다.",
      "월 상환액이 월 이자 이하이면 원금이 줄지 않으므로 상환액을 높여야 합니다.",
    ],
    faq: [
      [
        "상환 기간은 어떻게 계산하나요?",
        "매월 이자를 더하고 상환액을 빼는 과정을 잔액이 없어질 때까지 반복합니다.",
      ],
      [
        "마지막 달 상환액이 왜 다른가요?",
        "마지막 달에는 정해진 월 상환액보다 남은 원금과 이자의 합계가 작을 수 있습니다.",
      ],
      [
        "금리가 0%여도 계산할 수 있나요?",
        "네. 잔액을 월 상환액으로 나누고 마지막 일부 금액을 한 달로 계산합니다.",
      ],
      [
        "상환 불가 안내가 나오는 이유는 무엇인가요?",
        "월 상환액이 발생하는 이자를 넘지 못하거나 100년 안에 잔액이 없어지지 않기 때문입니다.",
      ],
    ] as const,
  },
  en: {
    title: "Debt Repayment Period Calculator",
    metaTitle: "Debt Repayment Period Calculator",
    description:
      "Estimate the time to repay a debt, total repayment, and interest from the balance, rate, and monthly payment.",
    category: "Loan calculator",
    intro:
      "See how long payoff may take and estimate the final payment if the current terms stay unchanged.",
    input: "Debt and payment assumptions",
    balance: "Current debt balance",
    interestRate: "Annual interest rate",
    monthlyPayment: "Monthly payment",
    calculate: "Calculate payoff period",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated repayment period",
    payoffPeriod: "Time until payoff",
    totalRepayment: "Total repayment",
    totalInterest: "Total interest",
    finalPayment: "Final monthly payment",
    details: "Repayment estimate details",
    empty: "Calculate to see the estimated payoff period and total interest.",
    unpayable:
      "The payment does not reduce the balance enough to repay it within 100 years.",
    note: "A planning estimate assuming a fixed rate and the same payment every month.",
    monthUnit: "months",
    yearMonth: (months: number) =>
      `${Math.floor(months / 12)} years ${months % 12} months`,
    explanationTitle: "How it is calculated",
    explanation: [
      "Each month, interest at the monthly rate is added to the remaining balance and the payment is subtracted.",
      "The process repeats until the balance reaches zero; the final payment is limited to the amount then due.",
      "Total interest is the total of all payments minus the starting debt balance.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Variable rates, prepayment fees, late charges, and additional borrowing are not modeled.",
      "Actual daily interest calculations and payment dates may change lender results.",
      "If the payment does not exceed monthly interest, principal will not fall and the payment must increase.",
    ],
    faq: [
      [
        "How is the repayment period calculated?",
        "The calculator adds monthly interest and subtracts the payment repeatedly until no balance remains.",
      ],
      [
        "Why is the final payment different?",
        "In the last month, the remaining principal and interest may be less than the regular payment.",
      ],
      [
        "Can I calculate a 0% interest debt?",
        "Yes. The balance is divided by the payment, with any partial remainder counted as one month.",
      ],
      [
        "Why does the calculator say payoff is not possible?",
        "The payment does not exceed accruing interest or the balance would remain after 100 years.",
      ],
    ] as const,
  },
} as const;

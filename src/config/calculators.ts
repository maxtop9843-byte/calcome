export type PublishedCalculator = {
  id: string;
  name: string;
  description: string;
  category: "금융";
  href: `/finance/${string}`;
};

export const publishedCalculators = [
  {
    id: "deposit",
    name: "예금 계산기",
    description: "목돈 예금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    category: "금융",
    href: "/finance/deposit",
  },
  {
    id: "savings",
    name: "적금 계산기",
    description: "정기 납입 적금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    category: "금융",
    href: "/finance/savings",
  },
  {
    id: "loan",
    name: "대출 계산기",
    description: "상환 방식별 월 납부액, 총 이자와 상환 일정을 계산합니다.",
    category: "금융",
    href: "/finance/loan",
  },
  {
    id: "compound-interest",
    name: "복리 계산기",
    description: "초기 투자금과 정기 납입액의 예상 복리 성장을 계산합니다.",
    category: "금융",
    href: "/finance/compound-interest",
  },
] as const satisfies readonly PublishedCalculator[];

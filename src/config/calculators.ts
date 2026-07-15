export type PublishedCalculator = {
  id: string;
  name: string;
  description: string;
  keywords: readonly string[];
  category: "금융";
  href: `/finance/${string}`;
};

export const publishedCalculators = [
  {
    id: "cagr",
    name: "CAGR 계산기",
    description: "시작값과 종료값의 연평균 복합성장률과 총수익률을 계산합니다.",
    keywords: ["cagr", "연평균", "성장률", "수익률", "투자"],
    category: "금융",
    href: "/finance/cagr",
  },
  {
    id: "deposit",
    name: "예금 계산기",
    description: "목돈 예금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    keywords: ["예금", "deposit", "목돈", "만기", "이자"],
    category: "금융",
    href: "/finance/deposit",
  },
  {
    id: "savings",
    name: "적금 계산기",
    description: "정기 납입 적금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    keywords: ["적금", "savings", "저축", "납입", "이자"],
    category: "금융",
    href: "/finance/savings",
  },
  {
    id: "loan",
    name: "대출 계산기",
    description: "상환 방식별 월 납부액, 총 이자와 상환 일정을 계산합니다.",
    keywords: ["대출", "loan", "상환", "원리금", "이자"],
    category: "금융",
    href: "/finance/loan",
  },
  {
    id: "compound-interest",
    name: "복리 계산기",
    description: "초기 투자금과 정기 납입액의 예상 복리 성장을 계산합니다.",
    keywords: ["복리", "compound interest", "투자", "저축", "이자"],
    category: "금융",
    href: "/finance/compound-interest",
  },
] as const satisfies readonly PublishedCalculator[];

export type PublishedCalculator = {
  id: string;
  name: string;
  description: string;
  keywords: readonly string[];
  category: "금융";
  href:
    | `/${"ko" | "en"}/finance/${string}`
    | `/${"ko" | "en"}/employment/${string}`;
};

export const publishedCalculators = [
  {
    id: "weekly-holiday-pay",
    name: "주휴수당 계산기",
    description: "시급과 주 소정근로시간으로 예상 주휴수당을 계산합니다.",
    keywords: ["주휴수당", "시급", "주급", "근로시간", "weekly holiday pay"],
    category: "금융",
    href: "/ko/employment/weekly-holiday-pay",
  },
  {
    id: "cagr",
    name: "CAGR 계산기",
    description: "시작값과 종료값의 연평균 복합성장률과 총수익률을 계산합니다.",
    keywords: ["cagr", "연평균", "성장률", "수익률", "투자"],
    category: "금융",
    href: "/ko/finance/cagr",
  },
  {
    id: "deposit",
    name: "예금 계산기",
    description: "목돈 예금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    keywords: ["예금", "deposit", "목돈", "만기", "이자"],
    category: "금융",
    href: "/ko/finance/fixed-deposit",
  },
  {
    id: "savings",
    name: "적금 계산기",
    description: "정기 납입 적금의 세전·세후 이자와 예상 만기액을 계산합니다.",
    keywords: ["적금", "savings", "저축", "납입", "이자"],
    category: "금융",
    href: "/ko/finance/savings",
  },
  {
    id: "loan",
    name: "대출 계산기",
    description: "상환 방식별 월 납부액, 총 이자와 상환 일정을 계산합니다.",
    keywords: ["대출", "loan", "상환", "원리금", "이자"],
    category: "금융",
    href: "/ko/finance/loan",
  },
  {
    id: "compound-interest",
    name: "복리 계산기",
    description: "초기 투자금과 정기 납입액의 예상 복리 성장을 계산합니다.",
    keywords: ["복리", "compound interest", "투자", "저축", "이자"],
    category: "금융",
    href: "/ko/finance/compound-interest",
  },
  {
    id: "severance-pay",
    name: "퇴직금 계산기",
    description: "평균임금과 계속근로기간으로 예상 법정 퇴직금을 계산합니다.",
    keywords: ["퇴직금", "severance", "평균임금", "근속기간"],
    category: "금융",
    href: "/ko/employment/severance-pay",
  },
  {
    id: "unemployment-benefits",
    name: "실업급여 계산기",
    description: "평균임금과 고용보험 가입기간으로 예상 구직급여를 계산합니다.",
    keywords: ["실업급여", "구직급여", "고용보험", "unemployment"],
    category: "금융",
    href: "/ko/employment/unemployment-benefits",
  },
  {
    id: "net-salary",
    name: "실수령액 계산기",
    description:
      "급여에서 4대보험과 예상 세금을 뺀 월·연 실수령액을 계산합니다.",
    keywords: ["연봉", "월급", "실수령액", "4대보험", "take home pay"],
    category: "금융",
    href: "/ko/employment/net-salary",
  },
] as const satisfies readonly PublishedCalculator[];

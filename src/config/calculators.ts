export type PublishedCalculator = {
  id: string;
  name: string;
  description: string;
  category: "금융";
  href: `/finance/${string}`;
};

export const publishedCalculators = [
  {
    id: "compound-interest",
    name: "복리 계산기",
    description: "초기 투자금과 정기 납입액의 예상 복리 성장을 계산합니다.",
    category: "금융",
    href: "/finance/compound-interest",
  },
] as const satisfies readonly PublishedCalculator[];

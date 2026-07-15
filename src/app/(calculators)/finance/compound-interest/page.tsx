import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { CompoundInterestCalculator } from "@/features/compound-interest/components/compound-interest-calculator";

const path = "/finance/compound-interest";

export const metadata: Metadata = {
  title: "복리 계산기 - 적립식 투자와 예상 이자",
  description:
    "초기 투자금과 정기 납입액, 기간, 연이율을 입력해 복리로 늘어나는 예상 자산과 이자를 계산해 보세요.",
  alternates: { canonical: path },
  openGraph: {
    title: "복리 계산기 - 적립식 투자와 예상 이자 | CalCome",
    description:
      "초기 투자금과 정기 납입액을 바탕으로 연도별 복리 성장과 예상 자산을 확인하세요.",
    type: "website",
    url: absoluteUrl(path),
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CalCome - 금융 계산을 쉽게.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "복리 계산기 - 적립식 투자와 예상 이자 | CalCome",
    description:
      "초기 투자금과 정기 납입액을 바탕으로 연도별 복리 성장과 예상 자산을 확인하세요.",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "CalCome - 금융 계산을 쉽게.",
      },
    ],
  },
};

const faqItems = [
  {
    question: "복리란 무엇인가요?",
    answer:
      "원금뿐 아니라 이전 기간에 쌓인 이자에도 다시 이자가 붙는 계산 방식입니다. 같은 수익률이라도 기간이 길수록 단리와의 차이가 커질 수 있습니다.",
  },
  {
    question: "월 납입과 연 납입은 어떻게 다른가요?",
    answer:
      "월 납입은 매달, 연 납입은 매년 같은 금액을 납입한다고 가정합니다. 납입 시점과 횟수가 달라 예상 잔액도 달라질 수 있습니다.",
  },
  {
    question: "기간 초 납입과 기간 말 납입은 어떻게 다른가요?",
    answer:
      "기간 초 납입은 각 납입금이 기간 말 납입보다 한 번 더 이자가 붙는다고 가정합니다. 이율과 납입액이 양수라면 기간 초 납입의 예상 잔액이 더 큽니다.",
  },
  {
    question: "복리 주기는 결과에 어떤 영향을 주나요?",
    answer:
      "같은 명목 연이율이라면 일반적으로 이자를 계산하는 횟수가 많을수록 예상 잔액이 커집니다. 이 계산기는 연, 반기, 분기, 월, 일 복리를 지원합니다.",
  },
  {
    question: "세금과 물가상승률은 어떻게 적용되나요?",
    answer:
      "선택한 기간 끝의 양수 이자에 간이 세율을 한 번 적용한 뒤, 해당 세후 잔액을 물가상승률로 할인합니다. 실제 세법이나 금융상품별 과세 방식과는 다를 수 있습니다.",
  },
  {
    question: "실제 결과가 계산값과 달라질 수 있는 이유는 무엇인가요?",
    answer:
      "실제 이율, 납입 시점, 수수료, 세법, 물가와 시장 상황은 시간에 따라 달라질 수 있습니다. 계산기는 입력 조건이 고정된 단순 시나리오이며 예측이나 보장이 아닙니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "복리 계산기 - 적립식 투자와 예상 이자",
    description:
      "초기 투자금과 정기 납입액을 바탕으로 복리 성장과 예상 자산을 계산합니다.",
    inLanguage: "ko-KR",
    url: absoluteUrl(path),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl() },
      {
        "@type": "ListItem",
        position: 2,
        name: "복리 계산기",
        item: absoluteUrl(path),
      },
    ],
  },
];

export default function CompoundInterestPage() {
  return (
    <main id="main-content" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8">
        <nav aria-label="현재 위치" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              복리 계산기
            </li>
          </ol>
        </nav>

        <header className="mt-3 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            금융 계산기
          </p>
          <h1 className="mt-1 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            복리 계산기
          </h1>
          <p className="mt-2 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            초기 투자금과 정기 납입액이 복리로 어떻게 성장하는지 계산하고,
            원금과 이자의 변화를 연도별로 확인하세요.
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            계산 결과는 입력값에 따른 수학적 추정치이며 투자 성과, 금융상품
            수익, 실제 세금 또는 구매력을 보장하지 않습니다.
          </p>
        </header>

        <div className="mt-4">
          <CompoundInterestCalculator />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border bg-card p-5 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">계산 방법</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                초기 투자금은 선택한 복리 주기마다 이자가 붙는다고 가정합니다.
                정기 납입액은 월 또는 연 단위로, 선택한 납입 시점에 추가됩니다.
              </p>
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                미래가치 = 초기 투자금의 복리 가치 + 정기 납입금의 복리 가치
              </p>
              <p>
                세금 옵션은 최종 시점의 양수 이자에만 한 번 적용합니다.
                물가상승률 옵션은 세후 예상 잔액을 현재가치로 환산하기 위한 단순
                추정입니다.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              계산 전 확인하세요
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
              <li>첫 버전의 투자 기간은 1년 단위로만 입력할 수 있습니다.</li>
              <li>
                이율과 납입액은 전체 기간 동안 변하지 않는다고 가정합니다.
              </li>
              <li>
                수수료, 중도 인출, 시장 변동, 금융상품별 과세 규정은 반영하지
                않습니다.
              </li>
              <li>
                예상 자산 배수는 납입 원금 대비 추정 자산의 배수이며 수익률이
                아닙니다.
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            자주 묻는 질문
          </h2>
          <div className="mt-5 divide-y rounded-2xl border bg-card px-5 sm:px-7">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t pt-10">
          <h2 className="text-2xl font-semibold tracking-tight">관련 계산기</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            관련 금융 계산기는 검증을 마친 뒤 순차적으로 제공할 예정입니다.
          </p>
        </section>
      </div>
    </main>
  );
}

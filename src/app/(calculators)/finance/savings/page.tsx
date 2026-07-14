import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { calculateSavings } from "@/features/savings/calculate";
import { SavingsCalculator } from "@/features/savings/components/savings-calculator";
import { formatSavingsWon } from "@/features/savings/format";
import { createPageMetadata } from "@/lib/seo/metadata";

const path = "/finance/savings";
const description =
  "매월 또는 매년 납입하는 적금의 단리·월복리 이자와 세금, 세전·세후 만기액을 납입 시점별로 계산하세요.";

export const metadata = createPageMetadata({
  title: "적금 계산기 - 단리·복리 세후 만기액",
  description,
  path,
});

const example = calculateSavings({
  regularDeposit: "300000",
  depositFrequency: "monthly",
  months: 12,
  annualInterestRate: "4",
  interestMethod: "simple",
  depositTiming: "end",
  taxRate: "15.4",
  taxOption: "general",
});

const faqItems = [
  {
    question: "적금 금리는 모든 납입금에 1년 내내 적용되나요?",
    answer:
      "아닙니다. 기간 말 월 납입 기준 첫 납입금은 만기까지 11개월, 마지막 납입금은 이자를 얻는 기간이 없는 것으로 계산됩니다. 금융기관의 실제 납입일·만기일 계산은 다를 수 있습니다.",
  },
  {
    question: "단리와 월복리 중 무엇이 더 유리한가요?",
    answer:
      "같은 양수 금리와 납입 조건이라면 이미 발생한 이자에도 다음 달 이자가 붙는 월복리 결과가 단리보다 같거나 큽니다. 다만 실제 상품의 표시 금리와 우대 조건이 다르면 방식만으로 유불리를 판단할 수 없습니다.",
  },
  {
    question: "일반과세 15.4%는 어떻게 정했나요?",
    answer:
      "일반 이자소득 원천징수 14%와 그 소득세의 10%인 지방소득세 1.4%를 합친 간이 추정입니다. 실제 과세는 가입자와 상품의 비과세·과세특례 적용에 따라 달라질 수 있습니다.",
  },
  {
    question: "자유적금도 계산할 수 있나요?",
    answer:
      "이 계산기는 매번 같은 금액을 정해진 주기에 납입하는 정액 적금만 다룹니다. 납입액이나 납입일이 달라지는 자유적금은 정확히 모델링하지 않습니다.",
  },
  {
    question: "중도해지 이자를 확인할 수 있나요?",
    answer:
      "지원하지 않습니다. 중도해지이율, 우대금리 조건, 만기 후 이율, 수수료와 상품별 일수 계산 규칙은 금융기관의 상품 설명서에서 확인해야 합니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "적금 계산기 - 단리·복리 세후 만기액",
    description,
    inLanguage: "ko-KR",
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: absoluteUrl() },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl() },
      {
        "@type": "ListItem",
        position: 2,
        name: "계산기",
        item: absoluteUrl("/calculators"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "적금 계산기",
        item: absoluteUrl(path),
      },
    ],
  },
];

export default function SavingsPage() {
  return (
    <main id="main-content" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="현재 위치" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/calculators"
                className="hover:text-foreground hover:underline"
              >
                계산기
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              적금 계산기
            </li>
          </ol>
        </nav>

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            금융 계산기
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            적금 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            고정 금액을 꾸준히 모을 때 납입 원금과 이자가 어떻게 만기액을
            만드는지 단리·월복리와 세금 조건별로 확인하세요.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            결과는 고정 금리와 규칙적인 납입을 가정한 추정치입니다. 우대금리,
            중도해지, 실제 납입일과 상품별 계산 규칙은 반영하지 않습니다.
          </p>
        </header>
        <div className="mt-10">
          <SavingsCalculator />
        </div>

        <section className="mt-16 max-w-3xl" aria-labelledby="savings-use">
          <p className="text-sm font-semibold text-primary">이해하기</p>
          <h2
            id="savings-use"
            className="mt-2 text-3xl font-semibold tracking-tight"
          >
            이 계산기는 언제 사용하나요?
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              월급에서 일정 금액을 떼어 목표 자금을 만들거나, 은행의 정액 적금
              조건을 비교하기 전에 예상 만기액을 가늠할 때 사용합니다. 금리만
              비교하는 대신 실제 납입 원금, 세전 이자와 세후 이자를 분리해 볼 수
              있습니다.
            </p>
            <p>
              금융기관이 제공한 상품 설명서에서 이자 방식, 납입 시점,
              기본·우대금리와 과세 조건을 확인한 뒤 같은 조건을 입력하세요. 이
              계산 결과 자체는 가입 권유나 특정 상품 추천이 아닙니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="interest-comparison">
          <h2
            id="interest-comparison"
            className="text-3xl font-semibold tracking-tight"
          >
            단리와 월복리의 차이
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">단리</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                각 납입 원금에 대해서만 이자를 계산합니다. 이미 쌓인 이자는 다음
                기간의 이자를 만들지 않습니다. 정액 적금에서 흔히 설명되는 기본
                구조입니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">월복리</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                매월 발생한 이자를 잔액에 더하고 다음 달에는 그 이자에도 다시
                이자를 계산합니다. 이 계산기는 명목 연이율을 12로 나눈 월
                이자율을 사용합니다.
              </p>
            </article>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border bg-card p-5 sm:p-7"
          aria-labelledby="deposit-timing"
        >
          <h2
            id="deposit-timing"
            className="text-3xl font-semibold tracking-tight"
          >
            납입 시점이 이자를 바꾸는 이유
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              <strong className="text-foreground">기간 초 납입</strong>은 주기가
              시작될 때 돈을 넣어 그 주기의 이자를 얻습니다.{" "}
              <strong className="text-foreground">기간 말 납입</strong>은 주기가
              끝난 뒤 돈을 넣으므로 같은 기간 초 납입보다 각 납입금의 이자 발생
              기간이 한 주기 짧습니다.
            </p>
            <p>
              예를 들어 12개월 동안 매월 말 납입하면 첫 납입금은 11개월 동안
              이자를 얻고 마지막 납입금은 만기 시점에 들어옵니다. 실제 상품은
              가입일과 만기일, 영업일 처리에 따라 달라질 수 있습니다.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border bg-card p-5 sm:p-7"
          aria-labelledby="savings-formula"
        >
          <h2
            id="savings-formula"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 공식
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              C는 납입액, r은 연 이자율, t는 각 납입금이 만기까지 이자를 얻는
              개월 수입니다.
            </p>
            <div className="grid gap-3 lg:grid-cols-2">
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                단리 납입금 만기값
                <br />C + C × r × t / 12
              </p>
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                월복리 납입금 만기값
                <br />C × (1 + r / 12)ᵗ
              </p>
            </div>
            <p>
              모든 납입금의 값을 합쳐 세전 만기액을 구하고, 세전 이자에만 선택한
              간이 세율을 적용합니다. 계산 중에는 반올림하지 않고 표시할 때만 원
              단위로 반올림합니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="savings-example">
          <h2
            id="savings-example"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 예시
          </h2>
          <div className="mt-5 rounded-2xl border bg-card p-5 sm:p-7">
            <p className="font-medium">
              매월 말 30만원 · 12개월 · 연 4% 단리 · 일반과세 15.4%
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted-foreground">납입 원금</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatSavingsWon(example.totalPrincipal)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">세전 이자</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatSavingsWon(example.grossInterest)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">세후 만기액</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatSavingsWon(example.maturityAfterTax)}
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              이 숫자는 페이지의 계산 엔진으로 생성했습니다. 매월 말 납입
              가정이라 납입금마다 이자를 얻는 기간이 다르며, 표시 금액은 원 단위
              반올림값입니다.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7"
          aria-labelledby="savings-cautions"
        >
          <h2
            id="savings-cautions"
            className="text-2xl font-semibold tracking-tight"
          >
            중요한 주의사항
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            <li>
              우대금리 조건을 충족하지 못하거나 금리가 변하면 실제 결과가
              달라집니다.
            </li>
            <li>
              중도해지이율, 만기 후 이율, 수수료와 자유 납입은 계산하지
              않습니다.
            </li>
            <li>
              일반과세 15.4%는 현재 일반적인 원천징수 구조를 단순화한 값이며
              개인별 세무 판단이 아닙니다.
            </li>
            <li>
              금융기관의 일수 계산, 원 단위 절사와 납입일 처리로 실제 만기액과
              차이가 날 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            자주 묻는 질문
          </h2>
          <div className="mt-5 divide-y rounded-2xl border bg-card px-5 sm:px-7">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="min-h-11 cursor-pointer list-none content-center pr-8 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="mt-14 border-t pt-10"
          aria-labelledby="related-calculators"
        >
          <h2
            id="related-calculators"
            className="text-2xl font-semibold tracking-tight"
          >
            관련 계산기
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                href: "/finance/compound-interest",
                name: "복리 계산기",
                description:
                  "초기 원금과 정기 납입의 장기 복리 성장을 계산합니다.",
              },
              {
                href: "/finance/loan",
                name: "대출 계산기",
                description: "상환 방식별 월 납부액과 총 이자를 계산합니다.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-semibold">{item.name}</span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                  {item.description}
                </span>
                <span className="mt-3 block text-sm text-primary">
                  계산하기
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

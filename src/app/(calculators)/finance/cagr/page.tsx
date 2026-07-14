import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { calculateCagr } from "@/features/cagr/calculate";
import { CagrCalculator } from "@/features/cagr/components/cagr-calculator";
import { formatCagrPercent, formatCagrWon } from "@/features/cagr/format";
import { createPageMetadata } from "@/lib/seo/metadata";

const path = "/finance/cagr";
const description =
  "시작값과 종료값, 투자 기간을 입력해 연평균 복합성장률(CAGR), 총수익률과 절대 손익을 계산하세요.";

export const metadata = createPageMetadata({
  title: "CAGR 계산기 - 연평균 복합성장률 계산",
  description,
  path,
});

const example = calculateCagr({
  initialValue: "10000000",
  finalValue: "15000000",
  years: "5",
});

const faqItems = [
  {
    question: "CAGR과 연평균 수익률은 같은 뜻인가요?",
    answer:
      "CAGR은 시작값과 종료값 사이의 복리 성장률을 기하평균으로 환산한 값입니다. 매년 실제 수익률의 산술평균과는 다르며, 중간 변동 경로를 보여 주지 않습니다.",
  },
  {
    question: "CAGR이 음수일 수 있나요?",
    answer:
      "가능합니다. 종료값이 시작값보다 작으면 연평균 감소율로 계산됩니다. 예를 들어 2년 동안 100에서 81로 줄었다면 CAGR은 -10%입니다.",
  },
  {
    question: "개월 단위 기간은 어떻게 계산하나요?",
    answer:
      "입력 개월을 12로 나누어 년으로 환산합니다. 1개월은 1/12년이므로 짧은 기간의 작은 변화도 연환산하면 큰 비율로 보일 수 있습니다.",
  },
  {
    question: "중간에 추가 투자한 금액도 반영되나요?",
    answer:
      "반영되지 않습니다. CAGR은 두 시점의 값과 기간만 사용합니다. 추가 납입이나 인출이 있다면 현금흐름을 반영하는 수익률 지표를 별도로 사용해야 합니다.",
  },
  {
    question: "CAGR이 높으면 변동성도 낮다는 뜻인가요?",
    answer:
      "아닙니다. 같은 CAGR이라도 중간 가격 경로와 손실 폭은 크게 다를 수 있습니다. 투자 판단에는 변동성, 최대 낙폭과 위험도 함께 확인해야 합니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CAGR 계산기 - 연평균 복합성장률 계산",
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
        name: "CAGR 계산기",
        item: absoluteUrl(path),
      },
    ],
  },
];

export default function CagrPage() {
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
              CAGR 계산기
            </li>
          </ol>
        </nav>

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold text-primary">금융 · 투자 성과</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            CAGR 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            시작값과 종료값 사이의 전체 변화를 연평균 복리 성장률로 환산하고,
            총수익률과 절대 손익을 함께 확인하세요.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            CAGR은 중간 변동과 현금흐름을 생략한 비교 지표입니다. 실제로 매년
            같은 수익이 발생했다는 뜻은 아닙니다.
          </p>
        </header>

        <div className="mt-10">
          <CagrCalculator />
        </div>

        <section className="mt-16 max-w-3xl" aria-labelledby="cagr-explanation">
          <p className="text-sm font-semibold text-primary">이해하기</p>
          <h2
            id="cagr-explanation"
            className="mt-2 text-3xl font-semibold tracking-tight"
          >
            CAGR은 언제 사용하나요?
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              CAGR은 기간이 다른 투자, 매출, 사용자 수처럼 시작과 끝이 있는
              성과를 연 단위로 비교할 때 유용합니다. 전체 수익률만 보면 투자
              기간의 차이를 놓치기 쉽지만, CAGR은 같은 시간 기준으로 환산합니다.
            </p>
            <p>
              다만 과정의 변동성은 사라집니다. 꾸준히 오른 자산과 큰 폭으로
              오르내린 자산이 시작값, 종료값과 기간이 같으면 CAGR도 같습니다.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border bg-card p-5 sm:p-7"
          aria-labelledby="cagr-formula"
        >
          <h2
            id="cagr-formula"
            className="text-3xl font-semibold tracking-tight"
          >
            CAGR 계산 공식
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>B는 시작값, E는 종료값, Y는 년으로 환산한 기간입니다.</p>
            <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-sm text-foreground">
              CAGR = (E / B)^(1 / Y) - 1
            </p>
            <p>
              개월을 선택하면 Y는 개월 수를 12로 나눈 값입니다. 계산 과정은
              Decimal.js 고정밀 값으로 유지하고 화면의 퍼센트와 금액만
              반올림합니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="cagr-examples">
          <h2
            id="cagr-examples"
            className="text-3xl font-semibold tracking-tight"
          >
            실전 투자 예시
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "장기 포트폴리오",
                "5년 전 1,000만원이 1,500만원이 되었을 때 연환산 성과와 전체 수익을 구분합니다.",
              ],
              [
                "사업 성장 비교",
                "기간이 다른 매출 성장 구간을 연 단위 성장률로 바꾸어 비교합니다.",
              ],
              [
                "손실 속도 해석",
                "종료값이 더 작을 때 매년 같은 비율로 감소했다고 보면 어느 정도인지 확인합니다.",
              ],
            ].map(([title, body]) => (
              <article key={title} className="rounded-2xl border bg-card p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {body}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border bg-card p-5 sm:p-7">
            <p className="font-medium">1,000만원 → 1,500만원 · 5년</p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted-foreground">CAGR</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatCagrPercent(example.cagrPercent)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">총수익률</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatCagrPercent(example.totalReturnPercent)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">절대 손익</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatCagrWon(example.absoluteProfit)}
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              전체로는 50% 증가했지만 이를 5년의 동일한 복리 성장으로 환산하면
              연 약 8.45%입니다. 표시값은 페이지의 실제 계산 엔진으로
              생성했습니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="interpretation-guide">
          <h2
            id="interpretation-guide"
            className="text-3xl font-semibold tracking-tight"
          >
            결과 해석 가이드
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold">CAGR이 양수</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                종료값이 시작값보다 크며 연환산 성장으로 해석합니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold">CAGR이 0%</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                기간 동안 시작값과 종료값이 같아 전체 변화가 없습니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold">CAGR이 음수</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                원금 손실 구간이며 절댓값은 연평균 감소 속도를 나타냅니다.
              </p>
            </article>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7"
          aria-labelledby="cagr-cautions"
        >
          <h2
            id="cagr-cautions"
            className="text-2xl font-semibold tracking-tight"
          >
            중요한 주의사항
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            <li>
              CAGR은 중간 변동, 변동성, 최대 낙폭과 회복 기간을 보여 주지
              않습니다.
            </li>
            <li>
              추가 납입, 인출, 배당 재투자처럼 중간 현금흐름을 반영하지
              않습니다.
            </li>
            <li>
              세금, 거래 비용, 물가와 환율 효과는 결과에 포함하지 않습니다.
            </li>
            <li>
              특히 1개월처럼 짧은 기간을 연환산한 수치는 장기 지속 가능성을
              뜻하지 않습니다.
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
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/finance/compound-interest",
                name: "복리 계산기",
                description: "정기 납입을 포함한 장기 복리 성장을 계산합니다.",
              },
              {
                href: "/finance/loan",
                name: "대출 계산기",
                description: "상환 방식별 납부액과 총 이자를 계산합니다.",
              },
              {
                href: "/finance/savings",
                name: "적금 계산기",
                description: "정기 납입 적금의 세후 만기액을 계산합니다.",
              },
              {
                href: "/finance/deposit",
                name: "예금 계산기",
                description: "목돈 예금의 이자와 세후 만기액을 계산합니다.",
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

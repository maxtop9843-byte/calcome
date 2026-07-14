import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { LoanCalculator } from "@/features/loan/components/loan-calculator";
import { createPageMetadata } from "@/lib/seo/metadata";

const path = "/finance/loan";
const description =
  "대출 금액, 금리, 기간을 입력해 원리금균등·원금균등·만기일시상환의 월 납부액, 총 상환액, 총 이자와 상환 일정을 계산하세요.";

export const metadata = createPageMetadata({
  title: "대출 계산기 - 상환 방식별 원금과 이자",
  description,
  path,
});

const faqItems = [
  {
    question: "원리금균등과 원금균등 중 어느 쪽이 유리한가요?",
    answer:
      "원리금균등은 매월 납부액이 일정해 현금 흐름을 관리하기 쉽습니다. 원금균등은 초기에 더 많이 내지만 원금이 빠르게 줄어 같은 금리와 기간이라면 총 이자가 더 적습니다. 유리함은 초기 상환 여력과 월 예산에 따라 달라집니다.",
  },
  {
    question: "만기일시상환의 월 납부액은 무엇을 뜻하나요?",
    answer:
      "만기 전까지 매월 내는 이자 금액입니다. 마지막 달에는 이자와 함께 대출 원금 전액을 갚아야 하므로, 월 이자만 보고 상환 부담을 판단하면 안 됩니다.",
  },
  {
    question: "계산 결과에 중도상환수수료가 포함되나요?",
    answer:
      "포함되지 않습니다. 보증료, 인지세, 취급 수수료, 연체이자, 금리 변동, 거치 기간과 실제 납부일 차이도 반영하지 않습니다.",
  },
  {
    question: "금리가 0%인 대출도 계산할 수 있나요?",
    answer:
      "가능합니다. 원리금균등은 원금을 기간으로 나눈 금액을 매월 내고, 원금균등도 같은 결과가 됩니다. 만기일시상환은 만기 전 월 납부액이 0원이고 마지막에 원금 전액을 상환합니다.",
  },
  {
    question: "표의 금액을 더하면 결과와 몇 원 차이 날 수 있나요?",
    answer:
      "계산기는 중간값을 반올림하지 않고 표시에만 원 단위 반올림을 적용합니다. 따라서 화면에 표시된 각 월 금액을 직접 더하면 총액과 소액 차이가 날 수 있습니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "대출 계산기 - 상환 방식별 원금과 이자",
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
        name: "대출 계산기",
        item: absoluteUrl(path),
      },
    ],
  },
];

export default function LoanPage() {
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
              대출 계산기
            </li>
          </ol>
        </nav>
        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            금융 계산기
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            대출 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            세 가지 대표 상환 방식을 같은 조건에서 비교하고, 매월 원금과 이자가
            어떻게 달라지는지 확인하세요.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            계산 결과는 고정 금리와 매월 말 상환을 가정한 추정치이며 금융기관의
            실제 상환표나 대출 제안이 아닙니다.
          </p>
        </header>
        <div className="mt-10">
          <LoanCalculator />
        </div>

        <section className="mt-16 max-w-3xl" aria-labelledby="loan-explanation">
          <p className="text-sm font-semibold text-primary">이해하기</p>
          <h2
            id="loan-explanation"
            className="mt-2 text-3xl font-semibold tracking-tight"
          >
            이 계산기는 언제 사용하나요?
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              주택담보대출, 전세자금대출, 신용대출처럼 원금을 빌린 뒤 매월 갚는
              계획을 세울 때 사용합니다. 대출 금액과 금리가 같아도 상환 방식에
              따라 첫 달 부담, 이후 납부액, 총 이자가 달라집니다.
            </p>
            <p>
              은행의 대출 상담 전 월 예산을 가늠하거나 여러 조건을 비교하는 데
              유용하지만, 실제 계약 전에는 금융기관이 제공한 금리 유형, 상환일,
              수수료와 상환표를 반드시 확인해야 합니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="repayment-differences">
          <h2
            id="repayment-differences"
            className="text-3xl font-semibold tracking-tight"
          >
            상환 방식의 차이
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">원리금균등</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                원금과 이자를 합친 월 납부액이 같습니다. 초반에는 이자 비중이
                높고, 시간이 갈수록 원금 비중이 커집니다. 일정한 월 예산이
                중요할 때 살펴보기 좋습니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">원금균등</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                매월 같은 원금을 갚고 남은 원금에 대한 이자를 냅니다. 첫 달
                부담이 가장 크지만 납부액이 계속 줄고, 같은 조건의
                원리금균등보다 총 이자가 적습니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">만기일시상환</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                기간 중에는 이자만 내고 만기에 원금 전액을 갚습니다. 평소
                납부액은 작지만 총 이자가 크고 만기 원금 마련 부담이 집중됩니다.
              </p>
            </article>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border bg-card p-5 sm:p-7"
          aria-labelledby="loan-formula"
        >
          <h2
            id="loan-formula"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 공식
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              월 이자율은 연 이자율을 12로 나누어 계산하고, 매월 말 납부한다고
              가정합니다. P는 대출 원금, r은 월 이자율, n은 전체 개월 수입니다.
            </p>
            <div className="grid gap-3 lg:grid-cols-3">
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                원리금균등 월 납부액
                <br />A = P × r(1+r)ⁿ / ((1+r)ⁿ-1)
              </p>
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                원금균등 월 원금
                <br />P / n<br />월 이자 = 남은 원금 × r
              </p>
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                만기일시상환 월 이자
                <br />P × r<br />
                만기에 원금 P 상환
              </p>
            </div>
            <p>
              0% 금리는 나눗셈 오류가 없도록 별도 처리합니다. 계산 과정은 고정밀
              소수로 유지하고 화면에 표시할 때만 원 단위 반올림합니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="loan-example">
          <h2
            id="loan-example"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 예시
          </h2>
          <div className="mt-5 rounded-2xl border bg-card p-5 sm:p-7">
            <p className="font-medium">1억원 · 연 4.5% · 30년</p>
            <p className="mt-3 leading-8 text-muted-foreground">
              원리금균등을 선택하면 매월 거의 같은 금액을 내므로 장기 월 예산을
              세우기 쉽습니다. 원금균등은 첫 달 납부액이 더 크지만 원금이 빠르게
              줄어 이후 부담과 총 이자가 감소합니다. 만기일시상환은 매월 이자만
              내지만 30년 뒤 1억원을 한 번에 상환해야 합니다. 위 계산기에 같은
              조건을 넣어 총 이자와 월별 일정을 직접 비교해 보세요.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7"
          aria-labelledby="loan-cautions"
        >
          <h2
            id="loan-cautions"
            className="text-2xl font-semibold tracking-tight"
          >
            중요한 주의사항
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            <li>
              변동금리는 실제 적용 금리가 바뀌므로 고정 금리 계산 결과와
              달라집니다.
            </li>
            <li>
              중도상환수수료, 보증료, 인지세, 취급 비용과 연체이자는 포함하지
              않습니다.
            </li>
            <li>
              금융기관의 일수 계산 방식, 납부일, 첫 회차 길이와 원 단위 조정에
              따라 실제 상환표와 차이가 날 수 있습니다.
            </li>
            <li>
              만기일시상환은 마지막 원금 상환 재원을 별도로 준비해야 합니다.
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
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Link
              href="/finance/compound-interest"
              className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-semibold">복리 계산기</span>
              <span className="mt-2 block text-sm text-primary">계산하기</span>
            </Link>
            <Link
              href="/finance/savings"
              className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="font-semibold">적금 계산기</span>
              <span className="mt-2 block text-sm text-primary">계산하기</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

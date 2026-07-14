import Link from "next/link";

import { absoluteUrl, siteConfig } from "@/config/site";
import { calculateDeposit } from "@/features/deposit/calculate";
import { DepositCalculator } from "@/features/deposit/components/deposit-calculator";
import { formatDepositWon } from "@/features/deposit/format";
import { createPageMetadata } from "@/lib/seo/metadata";

const path = "/finance/deposit";
const description =
  "예치 금액과 기간, 연이율을 입력해 단리·월복리 예금의 세전 이자, 예상 세금과 세후 만기액을 계산하세요.";

export const metadata = createPageMetadata({
  title: "예금 계산기 - 단리·복리 세후 만기액",
  description,
  path,
});

const example = calculateDeposit({
  principal: "10000000",
  months: 12,
  annualInterestRate: "4",
  interestMethod: "simple",
  taxRate: "15.4",
  taxOption: "general",
});

const faqItems = [
  {
    question: "예금과 적금은 어떻게 다른가요?",
    answer:
      "예금은 원금을 한 번에 맡기고 전체 기간 동안 이자를 얻습니다. 적금은 정해진 주기마다 나누어 납입하므로 각 납입금이 이자를 얻는 기간이 다릅니다.",
  },
  {
    question: "단리와 월복리 중 어느 쪽의 이자가 더 큰가요?",
    answer:
      "같은 양수 금리와 기간이라면 이미 발생한 이자에도 다음 달 이자가 붙는 월복리가 단리보다 같거나 큽니다. 실제 상품 비교에서는 표시 금리, 우대 조건과 복리 주기를 함께 확인해야 합니다.",
  },
  {
    question: "일반과세 15.4%는 무엇인가요?",
    answer:
      "일반 이자소득의 소득세 14%와 그 소득세의 10%인 개인지방소득세 1.4%를 합친 간이 추정입니다. 가입자와 상품의 비과세·과세특례에 따라 실제 세액은 달라질 수 있습니다.",
  },
  {
    question: "1개월 예금도 계산할 수 있나요?",
    answer:
      "가능합니다. 단리는 연이율의 12분의 1을 적용하고, 월복리는 한 번의 월 복리 기간을 적용합니다. 금융기관의 실제 일수 계산 결과와는 차이가 날 수 있습니다.",
  },
  {
    question: "중도해지 결과도 알 수 있나요?",
    answer:
      "지원하지 않습니다. 중도해지이율, 만기 후 이율, 수수료, 우대금리와 실제 일수 계산은 상품 설명서나 금융기관에서 확인해야 합니다.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "예금 계산기 - 단리·복리 세후 만기액",
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
        name: "예금 계산기",
        item: absoluteUrl(path),
      },
    ],
  },
];

export default function DepositPage() {
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
              예금 계산기
            </li>
          </ol>
        </nav>

        <header className="mt-7 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            금융 계산기
          </p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            예금 계산기
          </h1>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            목돈을 일정 기간 맡길 때 단리와 월복리로 쌓이는 이자, 예상 세금과
            실제로 받게 될 세후 만기액을 확인하세요.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            결과는 원금과 금리가 만기까지 유지된다는 가정의 추정치입니다.
            우대금리, 중도해지, 수수료와 상품별 계산 규칙은 반영하지 않습니다.
          </p>
        </header>
        <div className="mt-10">
          <DepositCalculator />
        </div>

        <section
          className="mt-16 max-w-3xl"
          aria-labelledby="deposit-explanation"
        >
          <p className="text-sm font-semibold text-primary">이해하기</p>
          <h2
            id="deposit-explanation"
            className="mt-2 text-3xl font-semibold tracking-tight"
          >
            예금 계산기는 언제 사용하나요?
          </h2>
          <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
            <p>
              이미 마련한 목돈을 정기예금처럼 한 번에 맡길 때 예상 이자와 만기
              수령액을 가늠하는 데 사용합니다. 같은 표시 금리라도 기간, 이자
              방식과 과세 조건에 따라 세후 결과가 달라질 수 있습니다.
            </p>
            <p>
              실제 가입 전에는 금융기관의 기본·우대금리, 이자 지급 방식, 가입
              기간과 과세 조건을 확인하세요. 이 계산기는 상품 추천이나 실제
              지급액 보장이 아닙니다.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border bg-card p-5 sm:p-7"
          aria-labelledby="deposit-formula"
        >
          <h2
            id="deposit-formula"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 공식
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <p>P는 예치 원금, r은 연 이자율, m은 전체 예치 개월 수입니다.</p>
            <div className="grid gap-3 lg:grid-cols-2">
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                단리 세전 이자
                <br />P × r × m / 12
              </p>
              <p className="overflow-x-auto rounded-xl bg-muted p-4 font-mono text-xs text-foreground">
                월복리 세전 만기액
                <br />P × (1 + r / 12)ᵐ
              </p>
            </div>
            <p>
              세전 이자에만 선택한 간이 세율을 적용하고, 원금에는 세금을
              적용하지 않습니다. 모든 중간값은 고정밀로 유지하며 화면에 표시할
              때만 원 단위로 반올림합니다.
            </p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="interest-methods">
          <h2
            id="interest-methods"
            className="text-3xl font-semibold tracking-tight"
          >
            단리와 월복리 이해하기
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">단리</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                처음 맡긴 원금에만 기간 비례 이자를 계산합니다. 이자가 발생해도
                다음 기간의 이자 계산 원금에는 포함하지 않습니다.
              </p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <h3 className="text-lg font-semibold">월복리</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                매월 발생한 이자를 잔액에 더하고 다음 달에는 그 이자에도 다시
                이자를 계산합니다. 이 페이지는 명목 연이율을 12로 나눕니다.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="deposit-example">
          <h2
            id="deposit-example"
            className="text-3xl font-semibold tracking-tight"
          >
            계산 예시
          </h2>
          <div className="mt-5 rounded-2xl border bg-card p-5 sm:p-7">
            <p className="font-medium">
              1,000만원 · 12개월 · 연 4% 단리 · 일반과세 15.4%
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-muted-foreground">원금</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatDepositWon(example.principal)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">세전 이자</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatDepositWon(example.grossInterest)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">세후 만기액</dt>
                <dd className="mt-1 font-semibold tabular-nums">
                  {formatDepositWon(example.maturityAfterTax)}
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              표시된 숫자는 페이지의 실제 계산 엔진으로 생성했습니다. 일반과세는
              세전 이자에 15.4%를 적용한 간이 추정이며 원 단위로 반올림해
              표시합니다.
            </p>
          </div>
        </section>

        <section
          className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7"
          aria-labelledby="deposit-cautions"
        >
          <h2
            id="deposit-cautions"
            className="text-2xl font-semibold tracking-tight"
          >
            중요한 주의사항
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
            <li>변동금리와 우대금리 충족 여부는 계산하지 않습니다.</li>
            <li>
              중도해지이율, 만기 후 이율, 수수료와 재예치는 포함하지 않습니다.
            </li>
            <li>
              일반과세 15.4%는 일반적인 원천징수 구조의 간이 추정이며 개인별
              세무 판단이 아닙니다.
            </li>
            <li>
              실제 일수, 윤년, 영업일과 금융기관의 원 단위 처리에 따라 실제
              지급액과 차이가 날 수 있습니다.
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
              {
                href: "/finance/savings",
                name: "적금 계산기",
                description: "정기 납입 적금의 세후 만기액을 계산합니다.",
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

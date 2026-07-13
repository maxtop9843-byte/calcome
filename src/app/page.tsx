import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: absoluteUrl(),
  description: siteConfig.description,
  inLanguage: "ko-KR",
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replaceAll(
            "<",
            "\\u003c",
          ),
        }}
      />
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-primary">
            CALCLAB
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            금융 계산을 쉽게.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            <span className="block">복리, 대출, 적금, 예금, ETF까지.</span>
            <span className="block">
              누구나 쉽게 사용할 수 있는 금융 계산기를 제공합니다.
            </span>
          </p>
          <div className="mt-8">
            <Link
              href="#calculators"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              모든 계산기 보기
            </Link>
          </div>
        </div>
      </section>
      <section
        id="calculators"
        aria-labelledby="calculators-heading"
        className="border-t bg-muted/30"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <h2
            id="calculators-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            금융 계산기
          </h2>
          <ul className="mt-6 max-w-xl">
            <li>
              <Link
                href="/finance/compound-interest"
                className="block rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                <span className="block text-lg font-semibold">복리 계산기</span>
                <span className="mt-2 block leading-7 text-muted-foreground">
                  초기 투자금과 정기 납입액의 예상 복리 성장을 계산합니다.
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

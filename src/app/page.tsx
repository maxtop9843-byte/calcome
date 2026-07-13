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
    <main id="main-content" className="flex flex-1 items-center">
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
            더 나은 판단을 돕는 현대적인 계산 플랫폼
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            CalcLab은 빠르고 이해하기 쉬우며 신뢰할 수 있는 한국 금융 계산
            경험을 제공합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/finance/compound-interest"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              복리 계산기 사용하기
            </Link>
            <Link
              href={siteConfig.repository}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5",
              )}
            >
              GitHub에서 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

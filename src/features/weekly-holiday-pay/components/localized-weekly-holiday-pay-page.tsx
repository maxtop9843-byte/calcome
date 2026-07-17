import Link from "next/link";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  weeklyHolidayPayContent,
  type WeeklyHolidayPayLocale,
} from "../content";
import { WeeklyHolidayPayCalculator } from "./weekly-holiday-pay-calculator";

export function LocalizedWeeklyHolidayPayPage({
  locale,
}: {
  locale: WeeklyHolidayPayLocale;
}) {
  const copy = weeklyHolidayPayContent[locale];
  const path = `/${locale}/employment/weekly-holiday-pay`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.title,
      description: copy.description,
      inLanguage: locale === "ko" ? "ko-KR" : "en-US",
      url: absoluteUrl(path),
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: absoluteUrl(),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ko" ? "홈" : "Home",
          item: absoluteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.title,
          item: absoluteUrl(path),
        },
      ],
    },
  ];
  return (
    <main id="main-content" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 sm:py-10">
        <nav
          aria-label={locale === "ko" ? "경로" : "Breadcrumb"}
          className="text-sm text-muted-foreground"
        >
          <Link href="/">{locale === "ko" ? "홈" : "Home"}</Link> /{" "}
          <span aria-current="page">{copy.title}</span>
        </nav>
        <header className="mt-5 max-w-3xl">
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            {copy.description}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{copy.intro}</p>
        </header>
        <div className="mt-6">
          <WeeklyHolidayPayCalculator locale={locale} />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Info title={copy.explanationTitle} items={copy.explanation} />
          <Info title={copy.cautionsTitle} items={copy.cautions} />
        </div>
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {copy.faq.map(([q, a]) => (
              <details key={q} className="rounded-xl border bg-card p-4">
                <summary className="min-h-11 cursor-pointer font-medium">
                  {q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold">
            {locale === "ko" ? "공식 참고자료" : "Official references"}
          </h2>
          <a
            className="mt-3 inline-block text-primary underline"
            href="https://www.law.go.kr/법령/근로기준법/제55조"
            target="_blank"
            rel="noreferrer"
          >
            {locale === "ko"
              ? "국가법령정보센터 근로기준법 제55조"
              : "Korean Labor Standards Act, Article 55"}
          </a>
        </section>
      </div>
    </main>
  );
}
function Info({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

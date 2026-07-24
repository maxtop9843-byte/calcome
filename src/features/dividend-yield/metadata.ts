import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dividendYieldContent } from "./content";
import type { DividendYieldLocale } from "./validation";

export function createDividendYieldMetadata(
  locale: DividendYieldLocale,
): Metadata {
  const copy = dividendYieldContent[locale];
  const path = `/${locale}/finance/dividend-yield`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dividend-yield",
        en: "/en/finance/dividend-yield",
        "x-default": "/ko/finance/dividend-yield",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
    },
  };
}

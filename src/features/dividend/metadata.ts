import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dividendContent, type DividendLocale } from "./content";

export function createDividendMetadata(locale: DividendLocale): Metadata {
  const copy = dividendContent[locale];
  const path = `/${locale}/finance/dividend`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dividend",
        en: "/en/finance/dividend",
        "x-default": "/ko/finance/dividend",
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
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.description,
    },
  };
}

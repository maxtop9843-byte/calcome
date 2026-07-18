import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { ltvContent, type LtvLocale } from "./content";

export function createLtvMetadata(locale: LtvLocale): Metadata {
  const copy = ltvContent[locale];
  const path = `/${locale}/finance/ltv`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/ltv",
        en: "/en/finance/ltv",
        "x-default": "/ko/finance/ltv",
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

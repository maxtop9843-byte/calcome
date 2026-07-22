import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { valueAddedTaxContent, type ValueAddedTaxLocale } from "./content";

export function createValueAddedTaxMetadata(
  locale: ValueAddedTaxLocale,
): Metadata {
  const copy = valueAddedTaxContent[locale];
  const path = `/${locale}/finance/value-added-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/value-added-tax",
        en: "/en/finance/value-added-tax",
        "x-default": "/ko/finance/value-added-tax",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { capitalGainsTaxContent, type CapitalGainsTaxLocale } from "./content";

export function createCapitalGainsTaxMetadata(
  locale: CapitalGainsTaxLocale,
): Metadata {
  const copy = capitalGainsTaxContent[locale];
  const path = `/${locale}/finance/capital-gains-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/capital-gains-tax",
        en: "/en/finance/capital-gains-tax",
        "x-default": "/ko/finance/capital-gains-tax",
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

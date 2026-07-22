import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { withholdingTaxContent, type WithholdingTaxLocale } from "./content";

export function createWithholdingTaxMetadata(
  locale: WithholdingTaxLocale,
): Metadata {
  const copy = withholdingTaxContent[locale];
  const path = `/${locale}/finance/withholding-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/withholding-tax",
        en: "/en/finance/withholding-tax",
        "x-default": "/ko/finance/withholding-tax",
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

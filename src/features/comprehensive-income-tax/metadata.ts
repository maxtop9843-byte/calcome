import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  comprehensiveIncomeTaxContent,
  type ComprehensiveIncomeTaxLocale,
} from "./content";

export function createComprehensiveIncomeTaxMetadata(
  locale: ComprehensiveIncomeTaxLocale,
): Metadata {
  const copy = comprehensiveIncomeTaxContent[locale];
  const path = `/${locale}/finance/comprehensive-income-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/comprehensive-income-tax",
        en: "/en/finance/comprehensive-income-tax",
        "x-default": "/ko/finance/comprehensive-income-tax",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  comprehensiveRealEstateHoldingTaxContent,
  type ComprehensiveRealEstateHoldingTaxLocale,
} from "./content";

export function createComprehensiveRealEstateHoldingTaxMetadata(
  locale: ComprehensiveRealEstateHoldingTaxLocale,
): Metadata {
  const copy = comprehensiveRealEstateHoldingTaxContent[locale];
  const path = `/${locale}/finance/comprehensive-real-estate-holding-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/comprehensive-real-estate-holding-tax",
        en: "/en/finance/comprehensive-real-estate-holding-tax",
        "x-default": "/ko/finance/comprehensive-real-estate-holding-tax",
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

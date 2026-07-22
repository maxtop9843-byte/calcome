import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  loanAffordabilityContent,
  type LoanAffordabilityLocale,
} from "./content";

export function createLoanAffordabilityMetadata(
  locale: LoanAffordabilityLocale,
): Metadata {
  const copy = loanAffordabilityContent[locale];
  const path = `/${locale}/finance/loan-affordability`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/loan-affordability",
        en: "/en/finance/loan-affordability",
        "x-default": "/ko/finance/loan-affordability",
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

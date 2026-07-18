import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  loanInterestComparisonContent,
  type LoanInterestComparisonLocale,
} from "./content";

export function createLoanInterestComparisonMetadata(
  locale: LoanInterestComparisonLocale,
): Metadata {
  const copy = loanInterestComparisonContent[locale];
  const path = `/${locale}/finance/loan-interest-comparison`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/loan-interest-comparison",
        en: "/en/finance/loan-interest-comparison",
        "x-default": "/ko/finance/loan-interest-comparison",
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

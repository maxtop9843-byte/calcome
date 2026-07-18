import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { loanRefinancingContent, type LoanRefinancingLocale } from "./content";

export function createLoanRefinancingMetadata(
  locale: LoanRefinancingLocale,
): Metadata {
  const copy = loanRefinancingContent[locale];
  const path = `/${locale}/finance/loan-refinancing-savings`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/loan-refinancing-savings",
        en: "/en/finance/loan-refinancing-savings",
        "x-default": "/ko/finance/loan-refinancing-savings",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  creditLoanInterestContent,
  type CreditLoanInterestLocale,
} from "./content";

export function createCreditLoanInterestMetadata(
  locale: CreditLoanInterestLocale,
): Metadata {
  const copy = creditLoanInterestContent[locale];
  const path = `/${locale}/finance/credit-loan-interest`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/credit-loan-interest",
        en: "/en/finance/credit-loan-interest",
        "x-default": "/ko/finance/credit-loan-interest",
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

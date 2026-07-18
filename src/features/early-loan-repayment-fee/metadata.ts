import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  earlyRepaymentFeeContent,
  type EarlyRepaymentFeeLocale,
} from "./content";

export function createEarlyRepaymentFeeMetadata(
  locale: EarlyRepaymentFeeLocale,
): Metadata {
  const copy = earlyRepaymentFeeContent[locale];
  const path = `/${locale}/finance/early-loan-repayment-fee`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/early-loan-repayment-fee",
        en: "/en/finance/early-loan-repayment-fee",
        "x-default": "/ko/finance/early-loan-repayment-fee",
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

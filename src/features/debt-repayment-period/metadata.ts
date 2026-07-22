import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  debtRepaymentPeriodContent,
  type DebtRepaymentPeriodLocale,
} from "./content";

export function createDebtRepaymentPeriodMetadata(
  locale: DebtRepaymentPeriodLocale,
): Metadata {
  const copy = debtRepaymentPeriodContent[locale];
  const path = `/${locale}/finance/debt-repayment-period`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/debt-repayment-period",
        en: "/en/finance/debt-repayment-period",
        "x-default": "/ko/finance/debt-repayment-period",
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

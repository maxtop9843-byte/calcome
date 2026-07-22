import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  creditCardInstallmentInterestContent,
  type CreditCardInstallmentInterestLocale,
} from "./content";

export function createCreditCardInstallmentInterestMetadata(
  locale: CreditCardInstallmentInterestLocale,
): Metadata {
  const copy = creditCardInstallmentInterestContent[locale];
  const path = `/${locale}/finance/credit-card-installment-interest`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/credit-card-installment-interest",
        en: "/en/finance/credit-card-installment-interest",
        "x-default": "/ko/finance/credit-card-installment-interest",
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

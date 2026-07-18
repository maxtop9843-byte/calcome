import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { mortgagePaymentContent, type MortgagePaymentLocale } from "./content";

export function createMortgagePaymentMetadata(
  locale: MortgagePaymentLocale,
): Metadata {
  const copy = mortgagePaymentContent[locale];
  const path = `/${locale}/finance/mortgage-payment`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/mortgage-payment",
        en: "/en/finance/mortgage-payment",
        "x-default": "/ko/finance/mortgage-payment",
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

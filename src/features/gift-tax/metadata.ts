import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { giftTaxContent, type GiftTaxLocale } from "./content";

export function createGiftTaxMetadata(locale: GiftTaxLocale): Metadata {
  const copy = giftTaxContent[locale];
  const path = `/${locale}/finance/gift-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/gift-tax",
        en: "/en/finance/gift-tax",
        "x-default": "/ko/finance/gift-tax",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  realEstateBrokerageFeeContent,
  type RealEstateBrokerageFeeLocale,
} from "./content";

export function createRealEstateBrokerageFeeMetadata(
  locale: RealEstateBrokerageFeeLocale,
): Metadata {
  const copy = realEstateBrokerageFeeContent[locale];
  const path = `/${locale}/finance/real-estate-brokerage-fee`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/real-estate-brokerage-fee",
        en: "/en/finance/real-estate-brokerage-fee",
        "x-default": "/ko/finance/real-estate-brokerage-fee",
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

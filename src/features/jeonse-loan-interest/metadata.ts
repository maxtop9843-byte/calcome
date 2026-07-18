import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  jeonseLoanInterestContent,
  type JeonseLoanInterestLocale,
} from "./content";

export function createJeonseLoanInterestMetadata(
  locale: JeonseLoanInterestLocale,
): Metadata {
  const copy = jeonseLoanInterestContent[locale];
  const path = `/${locale}/finance/jeonse-loan-interest`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/jeonse-loan-interest",
        en: "/en/finance/jeonse-loan-interest",
        "x-default": "/ko/finance/jeonse-loan-interest",
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

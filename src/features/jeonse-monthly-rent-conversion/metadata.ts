import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  jeonseMonthlyRentConversionContent,
  type JeonseMonthlyRentConversionLocale,
} from "./content";

export function createJeonseMonthlyRentConversionMetadata(
  locale: JeonseMonthlyRentConversionLocale,
): Metadata {
  const copy = jeonseMonthlyRentConversionContent[locale];
  const path = `/${locale}/finance/jeonse-monthly-rent-conversion`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/jeonse-monthly-rent-conversion",
        en: "/en/finance/jeonse-monthly-rent-conversion",
        "x-default": "/ko/finance/jeonse-monthly-rent-conversion",
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

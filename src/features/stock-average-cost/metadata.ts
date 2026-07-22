import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  stockAverageCostContent,
  type StockAverageCostLocale,
} from "./content";

export function createStockAverageCostMetadata(
  locale: StockAverageCostLocale,
): Metadata {
  const copy = stockAverageCostContent[locale];
  const path = `/${locale}/finance/stock-average-cost`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/stock-average-cost",
        en: "/en/finance/stock-average-cost",
        "x-default": "/ko/finance/stock-average-cost",
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

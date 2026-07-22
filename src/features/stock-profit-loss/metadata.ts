import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { stockProfitLossContent, type StockProfitLossLocale } from "./content";

export function createStockProfitLossMetadata(
  locale: StockProfitLossLocale,
): Metadata {
  const copy = stockProfitLossContent[locale];
  const path = `/${locale}/finance/stock-profit-loss`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/stock-profit-loss",
        en: "/en/finance/stock-profit-loss",
        "x-default": "/ko/finance/stock-profit-loss",
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

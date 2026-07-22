import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  rentConversionRateContent,
  type RentConversionRateLocale,
} from "./content";

export function createRentConversionRateMetadata(
  locale: RentConversionRateLocale,
): Metadata {
  const copy = rentConversionRateContent[locale];
  const path = `/${locale}/finance/rent-conversion-rate`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/rent-conversion-rate",
        en: "/en/finance/rent-conversion-rate",
        "x-default": "/ko/finance/rent-conversion-rate",
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

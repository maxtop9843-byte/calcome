import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";
import { hourlyWageContent } from "./content";
import type { HourlyWageLocale } from "./types";

export function createHourlyWageMetadata(locale: HourlyWageLocale): Metadata {
  const copy = hourlyWageContent[locale];
  const path = `/${locale}/employment/hourly-wage`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/hourly-wage",
        en: "/en/employment/hourly-wage",
        "x-default": "/ko/employment/hourly-wage",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  weeklyHolidayPayContent,
  type WeeklyHolidayPayLocale,
} from "./content";

export function createWeeklyHolidayPayMetadata(
  locale: WeeklyHolidayPayLocale,
): Metadata {
  const copy = weeklyHolidayPayContent[locale];
  const path = `/${locale}/employment/weekly-holiday-pay`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/weekly-holiday-pay",
        en: "/en/employment/weekly-holiday-pay",
        "x-default": "/ko/employment/weekly-holiday-pay",
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

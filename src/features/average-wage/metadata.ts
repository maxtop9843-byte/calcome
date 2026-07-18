import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { averageWageContent, type AverageWageLocale } from "./content";
export function createAverageWageMetadata(locale: AverageWageLocale): Metadata {
  const copy = averageWageContent[locale];
  const path = `/${locale}/employment/average-wage`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/average-wage",
        en: "/en/employment/average-wage",
        "x-default": "/ko/employment/average-wage",
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

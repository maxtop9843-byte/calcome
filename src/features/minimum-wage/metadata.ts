import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { minimumWageContent, type MinimumWageLocale } from "./content";

export function createMinimumWageMetadata(locale: MinimumWageLocale): Metadata {
  const copy = minimumWageContent[locale];
  const path = `/${locale}/employment/minimum-wage`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/minimum-wage",
        en: "/en/employment/minimum-wage",
        "x-default": "/ko/employment/minimum-wage",
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

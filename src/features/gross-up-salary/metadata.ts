import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { grossUpSalaryContent, type GrossUpSalaryLocale } from "./content";

export function createGrossUpSalaryMetadata(
  locale: GrossUpSalaryLocale,
): Metadata {
  const copy = grossUpSalaryContent[locale];
  const path = `/${locale}/employment/gross-up-salary`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/gross-up-salary",
        en: "/en/employment/gross-up-salary",
        "x-default": "/ko/employment/gross-up-salary",
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

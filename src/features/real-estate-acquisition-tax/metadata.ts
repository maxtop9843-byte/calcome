import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { acquisitionTaxContent, type AcquisitionTaxLocale } from "./content";

export function createAcquisitionTaxMetadata(
  locale: AcquisitionTaxLocale,
): Metadata {
  const copy = acquisitionTaxContent[locale];
  const path = `/${locale}/finance/real-estate-acquisition-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/real-estate-acquisition-tax",
        en: "/en/finance/real-estate-acquisition-tax",
        "x-default": "/ko/finance/real-estate-acquisition-tax",
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

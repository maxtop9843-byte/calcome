import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { propertyTaxContent, type PropertyTaxLocale } from "./content";
export function createPropertyTaxMetadata(locale: PropertyTaxLocale): Metadata {
  const copy = propertyTaxContent[locale];
  const path = `/${locale}/finance/property-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/property-tax",
        en: "/en/finance/property-tax",
        "x-default": "/ko/finance/property-tax",
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

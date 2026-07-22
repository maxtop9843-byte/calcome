import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { inheritanceTaxContent, type InheritanceTaxLocale } from "./content";
export function createInheritanceTaxMetadata(
  locale: InheritanceTaxLocale,
): Metadata {
  const copy = inheritanceTaxContent[locale];
  const path = `/${locale}/finance/inheritance-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/inheritance-tax",
        en: "/en/finance/inheritance-tax",
        "x-default": "/ko/finance/inheritance-tax",
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

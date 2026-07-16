import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

import { getCompoundDictionary, type CompoundLocale } from "./i18n";

export function createCompoundMetadata(locale: CompoundLocale): Metadata {
  const copy = getCompoundDictionary(locale).page;
  const path = `/${locale}/finance/compound-interest`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/compound-interest",
        en: "/en/finance/compound-interest",
        "x-default": "/ko/finance/compound-interest",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.metaDescription,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${copy.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.metaDescription,
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${copy.title}`,
        },
      ],
    },
  };
}

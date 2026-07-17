import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";
import {
  getUnemploymentBenefitsDictionary,
  type UnemploymentBenefitsLocale,
} from "./i18n";

export function createUnemploymentBenefitsMetadata(
  locale: UnemploymentBenefitsLocale,
): Metadata {
  const copy = getUnemploymentBenefitsDictionary(locale).page;
  const path = `/${locale}/employment/unemployment-benefits`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/unemployment-benefits",
        en: "/en/employment/unemployment-benefits",
        "x-default": "/ko/employment/unemployment-benefits",
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
      images: ["/twitter-image"],
    },
  };
}

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getLoanDictionary, type LoanLocale } from "./i18n";

export function createLoanMetadata(locale: LoanLocale): Metadata {
  const copy = getLoanDictionary(locale).page;
  const path = `/${locale}/finance/loan`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/loan",
        en: "/en/finance/loan",
        "x-default": "/ko/finance/loan",
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

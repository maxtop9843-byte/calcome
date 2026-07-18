import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { dtiContent, type DtiLocale } from "./content";

export function createDtiMetadata(locale: DtiLocale): Metadata {
  const copy = dtiContent[locale];
  const path = `/${locale}/finance/dti`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/dti",
        en: "/en/finance/dti",
        "x-default": "/ko/finance/dti",
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

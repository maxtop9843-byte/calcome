import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getNetSalaryDictionary, type NetSalaryLocale } from "./i18n";
export function createNetSalaryMetadata(locale: NetSalaryLocale): Metadata {
  const copy = getNetSalaryDictionary(locale).page;
  const path = `/${locale}/employment/net-salary`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/net-salary",
        en: "/en/employment/net-salary",
        "x-default": "/ko/employment/net-salary",
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
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.metaDescription,
    },
  };
}

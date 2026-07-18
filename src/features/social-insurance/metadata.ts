import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getSocialInsuranceDictionary } from "./i18n";
import type { SocialInsuranceLocale } from "./types";
export function createSocialInsuranceMetadata(
  locale: SocialInsuranceLocale,
): Metadata {
  const copy = getSocialInsuranceDictionary(locale).page;
  const path = `/${locale}/employment/social-insurance`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/social-insurance",
        en: "/en/employment/social-insurance",
        "x-default": "/ko/employment/social-insurance",
      },
    },
    openGraph: {
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.metaDescription,
      type: "website",
      url: absoluteUrl(path),
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.metaTitle} | ${siteConfig.name}`,
      description: copy.metaDescription,
    },
  };
}

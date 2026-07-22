import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { freelancerTaxContent, type FreelancerTaxLocale } from "./content";

export function createFreelancerTaxMetadata(
  locale: FreelancerTaxLocale,
): Metadata {
  const copy = freelancerTaxContent[locale];
  const path = `/${locale}/finance/freelancer-3-3-tax`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/freelancer-3-3-tax",
        en: "/en/finance/freelancer-3-3-tax",
        "x-default": "/ko/finance/freelancer-3-3-tax",
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

import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { salaryRaiseContent, type SalaryRaiseLocale } from "./content";
export function createSalaryRaiseMetadata(locale: SalaryRaiseLocale): Metadata {
  const copy = salaryRaiseContent[locale];
  const path = `/${locale}/employment/salary-raise`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/salary-raise",
        en: "/en/employment/salary-raise",
        "x-default": "/ko/employment/salary-raise",
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

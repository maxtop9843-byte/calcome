import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { annualLeaveContent, type AnnualLeaveLocale } from "./content";

export function createAnnualLeaveMetadata(locale: AnnualLeaveLocale): Metadata {
  const copy = annualLeaveContent[locale];
  const path = `/${locale}/employment/annual-leave-allowance`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/annual-leave-allowance",
        en: "/en/employment/annual-leave-allowance",
        "x-default": "/ko/employment/annual-leave-allowance",
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
  };
}

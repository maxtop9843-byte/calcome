import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  salaryConversionContent,
  type SalaryConversionLocale,
} from "./content";

export function createSalaryConversionMetadata(
  locale: SalaryConversionLocale,
): Metadata {
  const copy = salaryConversionContent[locale];
  const path = `/${locale}/employment/salary-conversion`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/employment/salary-conversion",
        en: "/en/employment/salary-conversion",
        "x-default": "/ko/employment/salary-conversion",
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

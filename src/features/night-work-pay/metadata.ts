import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { content, type Locale } from "./content";
export function createMetadata(locale: Locale): Metadata {
  const c = content[locale],
    p = `/${locale}/employment/night-work-pay`;
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: {
      canonical: p,
      languages: {
        ko: "/ko/employment/night-work-pay",
        en: "/en/employment/night-work-pay",
        "x-default": "/ko/employment/night-work-pay",
      },
    },
    openGraph: {
      title: `${c.metaTitle} | ${siteConfig.name}`,
      description: c.description,
      type: "website",
      url: absoluteUrl(p),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.description,
    },
  };
}

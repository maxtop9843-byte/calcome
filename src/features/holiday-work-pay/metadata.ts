import type { Metadata } from "next";
import { absoluteUrl } from "@/config/site";
import { content, type Locale } from "./content";
export function createMetadata(locale: Locale): Metadata {
  const c = content[locale],
    p = `/${locale}/employment/holiday-work-pay`;
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: {
      canonical: p,
      languages: {
        ko: "/ko/employment/holiday-work-pay",
        en: "/en/employment/holiday-work-pay",
        "x-default": "/ko/employment/holiday-work-pay",
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.description,
      url: absoluteUrl(p),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.description,
    },
  };
}

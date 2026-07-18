import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { balloonPaymentContent, type BalloonPaymentLocale } from "./content";

export function createBalloonPaymentMetadata(
  locale: BalloonPaymentLocale,
): Metadata {
  const copy = balloonPaymentContent[locale];
  const path = `/${locale}/finance/balloon-payment`;
  return {
    title: copy.metaTitle,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        ko: "/ko/finance/balloon-payment",
        en: "/en/finance/balloon-payment",
        "x-default": "/ko/finance/balloon-payment",
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

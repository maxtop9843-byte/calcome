import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const socialImageAlt = "CalcLab - 더 나은 판단을 위한 현대적인 계산 플랫폼";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      type: "website",
      url: absoluteUrl(path),
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
  };
}

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
  const socialImageAlt = "CalCome - 금융 계산을 쉽게.";

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

import type { MetadataRoute } from "next";

import {
  publishedCalculators,
  type PublishedCalculator,
} from "@/config/published-calculators";
import { absoluteUrl } from "@/config/site";

const publicStaticPaths = [
  "/",
  "/calculators",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
] as const;

export function calculatorSitemapEntries(
  calculators: readonly Pick<
    PublishedCalculator,
    "href"
  >[] = publishedCalculators,
): MetadataRoute.Sitemap {
  return calculators.flatMap(({ href }) => {
    const englishHref = href.replace(/^\/ko\//, "/en/");
    const languages = {
      ko: absoluteUrl(href),
      en: absoluteUrl(englishHref),
    };

    return [
      { url: languages.ko, alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicStaticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...calculatorSitemapEntries(),
  ];
}

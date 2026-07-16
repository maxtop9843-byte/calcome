import type { MetadataRoute } from "next";

import { publishedCalculators } from "@/config/calculators";
import { absoluteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...publishedCalculators
      .filter(
        (calculator) =>
          calculator.id !== "compound-interest" && calculator.id !== "savings",
      )
      .map((calculator) => ({
        url: absoluteUrl(calculator.href),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      })),
    {
      url: absoluteUrl("/ko/finance/compound-interest"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/compound-interest"),
          en: absoluteUrl("/en/finance/compound-interest"),
        },
      },
    },
    {
      url: absoluteUrl("/en/finance/compound-interest"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/compound-interest"),
          en: absoluteUrl("/en/finance/compound-interest"),
        },
      },
    },
    {
      url: absoluteUrl("/ko/finance/savings"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/savings"),
          en: absoluteUrl("/en/finance/savings"),
        },
      },
    },
    {
      url: absoluteUrl("/en/finance/savings"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/savings"),
          en: absoluteUrl("/en/finance/savings"),
        },
      },
    },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ];
}

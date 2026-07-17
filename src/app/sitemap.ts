import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/calculators"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/ko/employment/severance-pay"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/employment/severance-pay"),
          en: absoluteUrl("/en/employment/severance-pay"),
        },
      },
    },
    {
      url: absoluteUrl("/en/employment/severance-pay"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/employment/severance-pay"),
          en: absoluteUrl("/en/employment/severance-pay"),
        },
      },
    },
    {
      url: absoluteUrl("/ko/finance/cagr"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/cagr"),
          en: absoluteUrl("/en/finance/cagr"),
        },
      },
    },
    {
      url: absoluteUrl("/en/finance/cagr"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/cagr"),
          en: absoluteUrl("/en/finance/cagr"),
        },
      },
    },
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
    {
      url: absoluteUrl("/ko/finance/fixed-deposit"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/fixed-deposit"),
          en: absoluteUrl("/en/finance/fixed-deposit"),
        },
      },
    },
    {
      url: absoluteUrl("/en/finance/fixed-deposit"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/fixed-deposit"),
          en: absoluteUrl("/en/finance/fixed-deposit"),
        },
      },
    },
    {
      url: absoluteUrl("/ko/finance/loan"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/loan"),
          en: absoluteUrl("/en/finance/loan"),
        },
      },
    },
    {
      url: absoluteUrl("/en/finance/loan"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: absoluteUrl("/ko/finance/loan"),
          en: absoluteUrl("/en/finance/loan"),
        },
      },
    },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
  ];
}

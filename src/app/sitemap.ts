import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl(), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/finance/compound-interest"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

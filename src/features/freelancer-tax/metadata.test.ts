import { describe, expect, it } from "vitest";
import { createFreelancerTaxMetadata } from "./metadata";

describe("createFreelancerTaxMetadata", () => {
  it("uses canonical localized production URLs", () => {
    const metadata = createFreelancerTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/freelancer-3-3-tax",
      languages: {
        ko: "/ko/finance/freelancer-3-3-tax",
        en: "/en/finance/freelancer-3-3-tax",
        "x-default": "/ko/finance/freelancer-3-3-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/freelancer-3-3-tax",
    });
  });
});

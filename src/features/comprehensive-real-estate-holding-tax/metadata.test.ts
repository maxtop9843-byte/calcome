import { describe, expect, it } from "vitest";
import { createComprehensiveRealEstateHoldingTaxMetadata } from "./metadata";

describe("createComprehensiveRealEstateHoldingTaxMetadata", () => {
  it("uses canonical localized production URLs", () => {
    const metadata = createComprehensiveRealEstateHoldingTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/comprehensive-real-estate-holding-tax",
      languages: {
        ko: "/ko/finance/comprehensive-real-estate-holding-tax",
        en: "/en/finance/comprehensive-real-estate-holding-tax",
        "x-default": "/ko/finance/comprehensive-real-estate-holding-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/comprehensive-real-estate-holding-tax",
    });
  });
});

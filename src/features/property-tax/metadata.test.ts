import { describe, expect, it } from "vitest";
import { createPropertyTaxMetadata } from "./metadata";
describe("createPropertyTaxMetadata", () => {
  it("uses canonical localized production URLs", () => {
    const metadata = createPropertyTaxMetadata("ko");
    expect(metadata.alternates).toEqual({
      canonical: "/ko/finance/property-tax",
      languages: {
        ko: "/ko/finance/property-tax",
        en: "/en/finance/property-tax",
        "x-default": "/ko/finance/property-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/ko/finance/property-tax",
    });
  });
});

import { describe, expect, it } from "vitest";
import { createAcquisitionTaxMetadata } from "./metadata";

describe("createAcquisitionTaxMetadata", () => {
  it("creates localized canonical and alternate URLs", () => {
    const metadata = createAcquisitionTaxMetadata("en");
    expect(metadata.alternates).toEqual({
      canonical: "/en/finance/real-estate-acquisition-tax",
      languages: {
        ko: "/ko/finance/real-estate-acquisition-tax",
        en: "/en/finance/real-estate-acquisition-tax",
        "x-default": "/ko/finance/real-estate-acquisition-tax",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/real-estate-acquisition-tax",
      locale: "en_US",
    });
  });
});

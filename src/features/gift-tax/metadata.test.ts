import { describe, expect, it } from "vitest";
import { createGiftTaxMetadata } from "./metadata";

describe("createGiftTaxMetadata", () => {
  it("creates localized canonical and alternate metadata", () => {
    const metadata = createGiftTaxMetadata("en");
    expect(metadata.alternates?.canonical).toBe("/en/finance/gift-tax");
    expect(metadata.alternates?.languages).toEqual({
      ko: "/ko/finance/gift-tax",
      en: "/en/finance/gift-tax",
      "x-default": "/ko/finance/gift-tax",
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/gift-tax",
      locale: "en_US",
    });
  });
});

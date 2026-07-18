import { describe, expect, it } from "vitest";
import { createDtiMetadata } from "./metadata";

describe("createDtiMetadata", () => {
  it("creates localized canonical and alternate URLs", () => {
    const metadata = createDtiMetadata("en");
    expect(metadata.alternates).toEqual({
      canonical: "/en/finance/dti",
      languages: {
        ko: "/ko/finance/dti",
        en: "/en/finance/dti",
        "x-default": "/ko/finance/dti",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/finance/dti",
      locale: "en_US",
    });
  });
});

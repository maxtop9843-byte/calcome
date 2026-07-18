import { describe, expect, it } from "vitest";
import { createSocialInsuranceMetadata } from "./metadata";
describe("social insurance metadata", () => {
  it("provides localized canonical and hreflang metadata", () => {
    const metadata = createSocialInsuranceMetadata("en");
    expect(metadata.alternates).toEqual({
      canonical: "/en/employment/social-insurance",
      languages: {
        ko: "/ko/employment/social-insurance",
        en: "/en/employment/social-insurance",
        "x-default": "/ko/employment/social-insurance",
      },
    });
  });
});

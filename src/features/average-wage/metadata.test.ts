import { describe, expect, it } from "vitest";
import { createAverageWageMetadata } from "./metadata";
describe("average wage metadata", () => {
  it("uses localized canonical and hreflang URLs", () => {
    expect(createAverageWageMetadata("en").alternates).toEqual({
      canonical: "/en/employment/average-wage",
      languages: {
        ko: "/ko/employment/average-wage",
        en: "/en/employment/average-wage",
        "x-default": "/ko/employment/average-wage",
      },
    });
  });
});

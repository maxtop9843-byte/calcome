import { describe, expect, it } from "vitest";
import { createSalaryRaiseMetadata } from "./metadata";
describe("salary raise metadata", () => {
  it("uses localized canonical and hreflang URLs", () => {
    expect(createSalaryRaiseMetadata("en").alternates).toEqual({
      canonical: "/en/employment/salary-raise",
      languages: {
        ko: "/ko/employment/salary-raise",
        en: "/en/employment/salary-raise",
        "x-default": "/ko/employment/salary-raise",
      },
    });
  });
});

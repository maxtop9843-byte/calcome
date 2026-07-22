import { describe, expect, it } from "vitest";
import { createRentConversionRateMetadata } from "./metadata";

describe("createRentConversionRateMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createRentConversionRateMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/rent-conversion-rate",
        languages: {
          ko: "/ko/finance/rent-conversion-rate",
          en: "/en/finance/rent-conversion-rate",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/rent-conversion-rate",
      },
    });
  });
});

import { describe, expect, it } from "vitest";
import { createRealEstateBrokerageFeeMetadata } from "./metadata";

describe("createRealEstateBrokerageFeeMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createRealEstateBrokerageFeeMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/real-estate-brokerage-fee",
        languages: {
          ko: "/ko/finance/real-estate-brokerage-fee",
          en: "/en/finance/real-estate-brokerage-fee",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/real-estate-brokerage-fee",
      },
    });
  });
});

import { describe, expect, it } from "vitest";
import { createDividendMetadata } from "./metadata";

describe("createDividendMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createDividendMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/dividend",
        languages: {
          ko: "/ko/finance/dividend",
          en: "/en/finance/dividend",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/dividend",
      },
    });
  });
});

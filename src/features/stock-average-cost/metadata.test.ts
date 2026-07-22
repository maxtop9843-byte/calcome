import { describe, expect, it } from "vitest";
import { createStockAverageCostMetadata } from "./metadata";

describe("createStockAverageCostMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createStockAverageCostMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/stock-average-cost",
        languages: {
          ko: "/ko/finance/stock-average-cost",
          en: "/en/finance/stock-average-cost",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/stock-average-cost",
      },
    });
  });
});

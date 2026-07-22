import { describe, expect, it } from "vitest";
import { createStockProfitLossMetadata } from "./metadata";

describe("createStockProfitLossMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createStockProfitLossMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/stock-profit-loss",
        languages: {
          ko: "/ko/finance/stock-profit-loss",
          en: "/en/finance/stock-profit-loss",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/stock-profit-loss",
      },
    });
  });
});

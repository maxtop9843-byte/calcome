import { describe, expect, it } from "vitest";
import { createLoanAffordabilityMetadata } from "./metadata";
describe("createLoanAffordabilityMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createLoanAffordabilityMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/loan-affordability",
        languages: {
          ko: "/ko/finance/loan-affordability",
          en: "/en/finance/loan-affordability",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/loan-affordability",
      },
    });
  });
});

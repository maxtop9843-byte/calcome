import { describe, expect, it } from "vitest";
import { createCreditCardInstallmentInterestMetadata } from "./metadata";

describe("createCreditCardInstallmentInterestMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createCreditCardInstallmentInterestMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/credit-card-installment-interest",
        languages: {
          ko: "/ko/finance/credit-card-installment-interest",
          en: "/en/finance/credit-card-installment-interest",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/credit-card-installment-interest",
      },
    });
  });
});

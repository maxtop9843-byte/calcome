import { describe, expect, it } from "vitest";
import { createDebtRepaymentPeriodMetadata } from "./metadata";

describe("createDebtRepaymentPeriodMetadata", () => {
  it("provides localized canonical and alternate URLs", () => {
    expect(createDebtRepaymentPeriodMetadata("en")).toMatchObject({
      alternates: {
        canonical: "/en/finance/debt-repayment-period",
        languages: {
          ko: "/ko/finance/debt-repayment-period",
          en: "/en/finance/debt-repayment-period",
        },
      },
      openGraph: {
        url: "https://www.calcome.com/en/finance/debt-repayment-period",
      },
    });
  });
});

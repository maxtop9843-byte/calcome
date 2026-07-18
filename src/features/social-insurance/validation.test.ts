import { describe, expect, it } from "vitest";
import { validateSocialInsurance } from "./validation";
describe("validateSocialInsurance", () => {
  it("rejects invalid, negative, and excessive values without throwing", () => {
    expect(
      validateSocialInsurance(
        {
          monthlyPay: ".",
          nonTaxablePay: "-",
          accidentRate: "word",
          workplaceSize: "under150",
        },
        "ko",
      ).data,
    ).toBeUndefined();
    expect(
      validateSocialInsurance(
        {
          monthlyPay: "3,000,000",
          nonTaxablePay: "3,000,000",
          accidentRate: "21",
          workplaceSize: "under150",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
  it("accepts decimals and optional zero-value fields", () => {
    const result = validateSocialInsurance(
      {
        monthlyPay: "3,500,000",
        nonTaxablePay: "",
        accidentRate: "0.75",
        workplaceSize: "under150",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.accidentRate.toString()).toBe("0.75");
  });
  it("rejects an unrecognized workplace size before calculation", () => {
    const result = validateSocialInsurance(
      {
        monthlyPay: "3,500,000",
        nonTaxablePay: "",
        accidentRate: "0.75",
        workplaceSize: "invalid" as "under150",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(result.errors.workplaceSize).toBe("Choose a workplace size.");
  });
});

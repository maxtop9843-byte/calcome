import { describe, expect, it } from "vitest";
import {
  validateAcquisitionTax,
  type AcquisitionTaxValues,
} from "./validation";

const valid: AcquisitionTaxValues = {
  acquisitionPrice: "500,000,000",
  acquisitionTaxRate: "1",
  localEducationTaxRate: "0.1",
  ruralSpecialTaxRate: "0",
  otherCosts: "2,000,000",
};

describe("validateAcquisitionTax", () => {
  it("parses localized money and decimal rates", () => {
    const result = validateAcquisitionTax(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.acquisitionPrice.toNumber()).toBe(500_000_000);
  });
  it("accepts zero rates and costs", () => {
    expect(
      validateAcquisitionTax(
        {
          ...valid,
          localEducationTaxRate: "0",
          ruralSpecialTaxRate: "0",
          otherCosts: "0",
        },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects invalid price, rates, and costs", () => {
    const result = validateAcquisitionTax(
      {
        ...valid,
        acquisitionPrice: "0",
        acquisitionTaxRate: "101",
        localEducationTaxRate: "-1",
        otherCosts: "-1",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(Object.keys(result.errors)).toEqual([
      "acquisitionPrice",
      "acquisitionTaxRate",
      "localEducationTaxRate",
      "otherCosts",
    ]);
  });
});

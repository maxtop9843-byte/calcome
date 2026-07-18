import { describe, expect, it } from "vitest";
import { validateLtv } from "./validation";

describe("validateLtv", () => {
  it("accepts comma-formatted property and loan values", () => {
    const result = validateLtv(
      {
        propertyValue: "500,000,000",
        loanAmount: "300,000,000",
        targetLtvRate: "70",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.propertyValue.toNumber()).toBe(500_000_000);
  });

  it("rejects a missing property value and an out-of-range target", () => {
    const result = validateLtv(
      { propertyValue: "", loanAmount: "100000000", targetLtvRate: "101" },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(result.errors.propertyValue).toBeTruthy();
    expect(result.errors.targetLtvRate).toBeTruthy();
  });
});

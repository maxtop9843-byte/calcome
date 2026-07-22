import { describe, expect, it } from "vitest";
import { validateValueAddedTax } from "./validation";

describe("validateValueAddedTax", () => {
  it("parses formatted amounts and the selected mode", () => {
    const result = validateValueAddedTax(
      { amount: "1,100,000", taxRate: "10", mode: "inclusive" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.amount.toNumber()).toBe(1_100_000);
    expect(result.data?.mode).toBe("inclusive");
  });

  it("rejects invalid amounts and rates", () => {
    const result = validateValueAddedTax(
      { amount: "0", taxRate: "101", mode: "exclusive" },
      "en",
    );
    expect(result.errors.amount).toBeTruthy();
    expect(result.errors.taxRate).toBeTruthy();
  });
});

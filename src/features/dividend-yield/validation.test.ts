import { describe, expect, it } from "vitest";
import { validateDividendYield } from "./validation";

describe("validateDividendYield", () => {
  it("accepts valid positive inputs", () => {
    const result = validateDividendYield(
      { sharePrice: "50,000", annualDividendPerShare: "2,000" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.sharePrice.toNumber()).toBe(50_000);
  });

  it("rejects zero share price", () => {
    const result = validateDividendYield(
      { sharePrice: "0", annualDividendPerShare: "2,000" },
      "ko",
    );
    expect(result.errors.sharePrice).toBeTruthy();
  });
});

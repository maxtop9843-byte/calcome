import { describe, expect, it } from "vitest";
import { validateRentConversionRate } from "./validation";

describe("validateRentConversionRate", () => {
  it("parses valid localized money values", () => {
    const result = validateRentConversionRate(
      {
        jeonseDeposit: "300,000,000",
        monthlyDeposit: "100,000,000",
        monthlyRent: "1,000,000",
      },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.jeonseDeposit.toNumber()).toBe(300_000_000);
  });

  it("rejects a non-positive conversion deposit and rent", () => {
    const result = validateRentConversionRate(
      {
        jeonseDeposit: "100,000,000",
        monthlyDeposit: "100,000,000",
        monthlyRent: "0",
      },
      "ko",
    );
    expect(result.errors).toHaveProperty("monthlyDeposit");
    expect(result.errors).toHaveProperty("monthlyRent");
  });
});

import { describe, expect, it } from "vitest";
import { validateJeonseMonthlyRentConversion } from "./validation";

describe("validateJeonseMonthlyRentConversion", () => {
  it("parses valid localized values", () => {
    const result = validateJeonseMonthlyRentConversion(
      {
        jeonseDeposit: "300,000,000",
        monthlyDeposit: "100,000,000",
        annualRate: "6",
      },
      "en",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.annualRate.toNumber()).toBe(6);
  });

  it("rejects a non-positive deposit difference and rate", () => {
    const result = validateJeonseMonthlyRentConversion(
      {
        jeonseDeposit: "100,000,000",
        monthlyDeposit: "100,000,000",
        annualRate: "0",
      },
      "ko",
    );
    expect(result.errors).toHaveProperty("monthlyDeposit");
    expect(result.errors).toHaveProperty("annualRate");
  });
});

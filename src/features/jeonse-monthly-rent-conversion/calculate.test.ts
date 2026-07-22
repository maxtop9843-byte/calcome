import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateJeonseMonthlyRentConversion } from "./calculate";

describe("calculateJeonseMonthlyRentConversion", () => {
  it("converts a jeonse deposit difference into monthly rent", () => {
    const result = calculateJeonseMonthlyRentConversion({
      jeonseDeposit: new Decimal(300_000_000),
      monthlyDeposit: new Decimal(100_000_000),
      annualRate: new Decimal(6),
    });

    expect(result.convertedDeposit.toNumber()).toBe(200_000_000);
    expect(result.annualRent.toNumber()).toBe(12_000_000);
    expect(result.monthlyRent.toNumber()).toBe(1_000_000);
    expect(result.monthlyRate.toNumber()).toBe(0.5);
  });
});

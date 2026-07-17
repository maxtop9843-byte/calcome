import { describe, expect, it } from "vitest";
import { calculateSeverancePay } from "./calculate";

describe("calculateSeverancePay", () => {
  it("applies the statutory daily-wage formula without intermediate rounding", () => {
    expect(
      calculateSeverancePay({ averageDailyWage: "100000", serviceDays: "365" }),
    ).toEqual({
      estimatedSeverancePay: "3000000",
      averageDailyWage: "100000",
      thirtyDayWage: "3000000",
      serviceDays: "365",
      serviceYears: "1",
    });
    expect(
      calculateSeverancePay({ averageDailyWage: "100000", serviceDays: "730" })
        .estimatedSeverancePay,
    ).toBe("6000000");
  });
});

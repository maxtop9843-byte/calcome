import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import {
  calculateUnemploymentBenefit,
  getPrescribedBenefitDays,
} from "./calculate";

describe("calculateUnemploymentBenefit", () => {
  it("uses the current 68,100 won statutory cap", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: new Decimal(200_000),
      insuredMonths: 48,
      age: 40,
      dailyHours: 8,
      disabled: false,
    });
    expect(result.dailyBenefit.toString()).toBe("68100");
    expect(result.benefitDays).toBe(180);
    expect(result.totalBenefit.toString()).toBe("12258000");
    expect(result.appliedLimit).toBe("upper");
  });

  it("applies the 2026 minimum-wage floor", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: new Decimal(50_000),
      insuredMonths: 6,
      age: 30,
      dailyHours: 8,
      disabled: false,
    });
    expect(result.lowerLimit.toString()).toBe("66048");
    expect(result.dailyBenefit.toString()).toBe("66048");
    expect(result.appliedLimit).toBe("lower");
  });

  it("supports shorter scheduled days without fabricating an eight-hour floor", () => {
    const result = calculateUnemploymentBenefit({
      averageDailyWage: new Decimal(60_000),
      insuredMonths: 12,
      age: 30,
      dailyHours: 4,
      disabled: false,
    });
    expect(result.lowerLimit.toString()).toBe("33024");
    expect(result.dailyBenefit.toString()).toBe("36000");
    expect(result.appliedLimit).toBe("none");
  });

  it.each([
    [0, false, 120],
    [12, false, 150],
    [36, false, 180],
    [60, false, 210],
    [120, false, 240],
    [12, true, 180],
    [36, true, 210],
    [60, true, 240],
    [120, true, 270],
  ] as const)(
    "maps %i months and older=%s to %i days",
    (months, older, days) => {
      expect(getPrescribedBenefitDays(months, older)).toBe(days);
    },
  );
});

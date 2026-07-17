import { describe, expect, it } from "vitest";

import { validateWeeklyHolidayPayInput } from "./validation";

describe("weekly holiday pay input validation", () => {
  it.each(["", " ", ".", "-", "not-a-number", "0", "-1", "40.1"])(
    "rejects invalid weekly hours %j without throwing",
    (weeklyHours) => {
      expect(() =>
        validateWeeklyHolidayPayInput({
          hourlyWage: "12,000",
          weeklyHours,
        }),
      ).not.toThrow();
      expect(
        validateWeeklyHolidayPayInput({
          hourlyWage: "12,000",
          weeklyHours,
        }),
      ).toBeNull();
    },
  );

  it.each(["", " ", ".", "-", "not-a-number", "0", "-1"])(
    "rejects invalid hourly wage %j without throwing",
    (hourlyWage) => {
      expect(() =>
        validateWeeklyHolidayPayInput({ hourlyWage, weeklyHours: "15.5" }),
      ).not.toThrow();
      expect(
        validateWeeklyHolidayPayInput({ hourlyWage, weeklyHours: "15.5" }),
      ).toBeNull();
    },
  );

  it.each(["14.5", "15.5", "40"])(
    "preserves valid decimal weekly hours %s",
    (weeklyHours) => {
      const result = validateWeeklyHolidayPayInput({
        hourlyWage: "12,000",
        weeklyHours,
      });

      expect(result?.hourlyWage.toString()).toBe("12000");
      expect(result?.weeklyHours.toString()).toBe(weeklyHours);
    },
  );
});

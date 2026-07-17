import { describe, expect, it } from "vitest";

import { validateHourlyWageInput } from "./validation";

const valid = {
  payAmount: "2,500,000",
  payUnit: "monthly" as const,
  dailyHours: "8",
  weeklyHours: "40",
  includePaidHoliday: true,
};

describe("hourly wage input validation", () => {
  it.each(["", " ", ".", "-", "invalid", "0", "-1"])(
    "rejects malformed or non-positive pay %j without throwing",
    (payAmount) => {
      expect(() =>
        validateHourlyWageInput({ ...valid, payAmount }),
      ).not.toThrow();
      expect(validateHourlyWageInput({ ...valid, payAmount })).toBeNull();
    },
  );

  it.each([
    { dailyHours: "0" },
    { dailyHours: "8.1" },
    { weeklyHours: "0" },
    { weeklyHours: "40.1" },
    { weeklyHours: "-" },
  ])("rejects hours outside the supported range: %j", (override) => {
    expect(validateHourlyWageInput({ ...valid, ...override })).toBeNull();
  });

  it("preserves valid decimal hours and grouped pay", () => {
    const result = validateHourlyWageInput({
      ...valid,
      dailyHours: "7.5",
      weeklyHours: "15.5",
    });

    expect(result?.payAmount.toString()).toBe("2500000");
    expect(result?.dailyHours.toString()).toBe("7.5");
    expect(result?.weeklyHours.toString()).toBe("15.5");
  });
});

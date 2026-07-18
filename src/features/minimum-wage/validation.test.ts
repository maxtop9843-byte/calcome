import { describe, expect, it } from "vitest";
import { validateMinimumWageHours } from "./validation";

describe("minimum wage hour validation", () => {
  it.each(["", " ", ".", "-", "invalid", "0", "40.1"])(
    "rejects invalid hours %j without throwing",
    (hours) => {
      expect(() => validateMinimumWageHours(hours)).not.toThrow();
      expect(validateMinimumWageHours(hours)).toBeNull();
    },
  );

  it("accepts decimal hours", () => {
    expect(validateMinimumWageHours("15.5")?.toString()).toBe("15.5");
  });
});

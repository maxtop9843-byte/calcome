import { describe, expect, it } from "vitest";
import { validateSalaryRaise } from "./validation";
describe("validateSalaryRaise", () => {
  it("accepts comma money and decimal raise rates", () => {
    const result = validateSalaryRaise(
      { salary: "50,000,000", raiseRate: "4.5", period: "annual" },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.raiseRate.toString()).toBe("4.5");
  });
  it.each(["", " ", ".", "-", "bad"])(
    "rejects unsafe rate %j without throwing",
    (raiseRate) => {
      expect(() =>
        validateSalaryRaise(
          { salary: "50000000", raiseRate, period: "annual" },
          "en",
        ),
      ).not.toThrow();
      expect(
        validateSalaryRaise(
          { salary: "50000000", raiseRate, period: "annual" },
          "en",
        ).data,
      ).toBeUndefined();
    },
  );
});

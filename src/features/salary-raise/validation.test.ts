import { describe, expect, it, vi } from "vitest";
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
  it.each(["annual", "monthly"])("accepts the %s salary period", (period) => {
    const result = validateSalaryRaise(
      { salary: "50,000,000", raiseRate: "4.5", period },
      "en",
    );
    expect(result.data?.period).toBe(period);
  });
  it("rejects an unknown salary period", () => {
    const result = validateSalaryRaise(
      { salary: "50,000,000", raiseRate: "4.5", period: "weekly" },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(result.errors.period).toBe("Choose annual or monthly salary.");
  });
  it("does not call calculation when the salary period is invalid", () => {
    const calculate = vi.fn();
    const result = validateSalaryRaise(
      { salary: "50,000,000", raiseRate: "4.5", period: "weekly" },
      "ko",
    );
    if (result.data) calculate(result.data);
    expect(calculate).not.toHaveBeenCalled();
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

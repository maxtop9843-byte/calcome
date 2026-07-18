import { describe, expect, it } from "vitest";
import { validateGrossUpSalary } from "./validation";

describe("validateGrossUpSalary", () => {
  it("accepts comma money and a decimal deduction rate", () => {
    const result = validateGrossUpSalary(
      {
        targetNetSalary: "45,000,000",
        deductionRate: "12.5",
        period: "annual",
      },
      "ko",
    );
    expect(result.errors).toEqual({});
    expect(result.data?.deductionRate.toString()).toBe("12.5");
  });

  it.each(["", ".", "100", "101", "bad"])(
    "rejects unsafe rate %j",
    (deductionRate) => {
      const result = validateGrossUpSalary(
        { targetNetSalary: "45000000", deductionRate, period: "annual" },
        "en",
      );
      expect(result.data).toBeUndefined();
      expect(result.errors.deductionRate).toBeTruthy();
    },
  );

  it("rejects an unknown period", () => {
    const result = validateGrossUpSalary(
      { targetNetSalary: "3000000", deductionRate: "10", period: "weekly" },
      "en",
    );
    expect(result.errors.period).toBe(
      "Choose an annual or monthly target net salary.",
    );
  });
});

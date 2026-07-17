import { describe, expect, it } from "vitest";
import { INITIAL_UNEMPLOYMENT_VALUES } from "./constants";
import { validateUnemploymentBenefit } from "./validation";

describe("validateUnemploymentBenefit", () => {
  it("requires every numeric input", () => {
    const result = validateUnemploymentBenefit(
      INITIAL_UNEMPLOYMENT_VALUES,
      "ko",
    );
    expect(result.errors).toMatchObject({
      averageDailyWage: expect.any(String),
      insuredMonths: expect.any(String),
      age: expect.any(String),
    });
  });
  it("accepts a valid localized money value", () => {
    expect(
      validateUnemploymentBenefit(
        {
          ...INITIAL_UNEMPLOYMENT_VALUES,
          averageDailyWage: "100,000",
          insuredMonths: "48",
          age: "40",
        },
        "ko",
      ).data,
    ).toMatchObject({ insuredMonths: 48, age: 40, dailyHours: 8 });
  });
  it("rejects out-of-range hours and age", () => {
    const result = validateUnemploymentBenefit(
      {
        ...INITIAL_UNEMPLOYMENT_VALUES,
        averageDailyWage: "100000",
        insuredMonths: "48",
        age: "101",
        dailyHours: "9",
      },
      "en",
    );
    expect(result.errors.age).toBeTruthy();
    expect(result.errors.dailyHours).toBeTruthy();
  });
});

import { describe, expect, it } from "vitest";
import { validateNightWorkPay } from "./validation";

const valid = {
  hourlyWage: "12,000",
  nightHours: "7.5",
  premiumRate: "50",
  workplaceSize: "fiveOrMore",
};

describe("night-work validation", () => {
  it("accepts the five-or-more default and rates of 50% or 100%", () => {
    expect(validateNightWorkPay(valid, "ko").errors).toEqual({});
    expect(
      validateNightWorkPay({ ...valid, premiumRate: "100" }, "en").errors,
    ).toEqual({});
  });

  it("rejects a rate lower than 50% at workplaces with five or more employees", () => {
    expect(
      validateNightWorkPay({ ...valid, premiumRate: "49" }, "en").data,
    ).toBeUndefined();
  });

  it("accepts a contractual premium, including 0%, below five employees", () => {
    expect(
      validateNightWorkPay(
        { ...valid, workplaceSize: "underFive", premiumRate: "0" },
        "ko",
      ).errors,
    ).toEqual({});
  });

  it("rejects invalid workplace sizes and invalid values", () => {
    expect(
      validateNightWorkPay({ ...valid, workplaceSize: "unknown" }, "en").data,
    ).toBeUndefined();
    expect(
      validateNightWorkPay(
        {
          hourlyWage: "bad",
          nightHours: "-1",
          premiumRate: "bad",
          workplaceSize: "fiveOrMore",
        },
        "en",
      ).data,
    ).toBeUndefined();
  });
});

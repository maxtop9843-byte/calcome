import { describe, expect, it } from "vitest";
import { validateHolidayWorkPay } from "./validation";

const valid = {
  hourlyWage: "10,000",
  holidayHours: "8",
  workplaceSize: "fiveOrMore",
  contractualPremiumRate: "0",
};
describe("holiday-work validation", () => {
  it("accepts the under-five default contractual rate of zero", () =>
    expect(
      validateHolidayWorkPay({ ...valid, workplaceSize: "underFive" }, "ko")
        .errors,
    ).toEqual({}));
  it("accepts an under-five contractual rate and rejects invalid workplace sizes", () => {
    expect(
      validateHolidayWorkPay(
        { ...valid, workplaceSize: "underFive", contractualPremiumRate: "300" },
        "en",
      ).errors,
    ).toEqual({});
    expect(
      validateHolidayWorkPay({ ...valid, workplaceSize: "unknown" }, "en").data,
    ).toBeUndefined();
  });
  it("rejects malformed, negative, and unsafe numeric values", () => {
    expect(
      validateHolidayWorkPay({ ...valid, hourlyWage: "-1" }, "en").data,
    ).toBeUndefined();
    expect(
      validateHolidayWorkPay({ ...valid, holidayHours: "169" }, "en").data,
    ).toBeUndefined();
    expect(
      validateHolidayWorkPay({ ...valid, contractualPremiumRate: "301" }, "en")
        .data,
    ).toBeUndefined();
  });
});

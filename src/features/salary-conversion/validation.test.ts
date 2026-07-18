import { describe, expect, it } from "vitest";
import { validateSalaryConversion } from "./validation";

describe("validateSalaryConversion", () => {
  it("accepts formatted money", () => {
    expect(
      validateSalaryConversion(
        { salary: "50,000,000", period: "annual" },
        "ko",
      ).data?.salary.toString(),
    ).toBe("50000000");
  });
  it("rejects unsafe values", () => {
    expect(
      validateSalaryConversion({ salary: ".", period: "weekly" }, "en").data,
    ).toBeUndefined();
  });
});

import { describe, expect, it } from "vitest";
import { validateAnnualLeaveAllowance } from "./validation";

describe("validateAnnualLeaveAllowance", () => {
  it("accepts bounded whole numbers", () => {
    expect(
      validateAnnualLeaveAllowance(
        {
          completedYears: "5",
          attendanceAtLeast80: true,
          fullAttendanceMonths: "12",
          usedDays: "3",
          hourlyWage: "12000",
          dailyHours: "8",
        },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects decimals and out-of-range values", () => {
    const result = validateAnnualLeaveAllowance(
      {
        completedYears: "1.5",
        attendanceAtLeast80: true,
        fullAttendanceMonths: "13",
        usedDays: "-1",
        hourlyWage: "0",
        dailyHours: "25",
      },
      "en",
    );
    expect(result.data).toBeUndefined();
    expect(Object.keys(result.errors)).toHaveLength(5);
  });
});

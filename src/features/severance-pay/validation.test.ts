import { describe, expect, it } from "vitest";
import { INITIAL_SEVERANCE_VALUES } from "./constants";
import { validateSeveranceForm } from "./validation";

describe("validateSeveranceForm", () => {
  it("counts exact calendar days in date mode", () => {
    const result = validateSeveranceForm({
      ...INITIAL_SEVERANCE_VALUES,
      averageDailyWage: "100,000",
      startDate: "2020-01-01",
      endDate: "2021-01-01",
    });
    expect(result.data).toEqual({
      averageDailyWage: "100000",
      serviceDays: "366",
    });
  });
  it("converts manual years, months, and days proportionally", () => {
    const result = validateSeveranceForm({
      ...INITIAL_SEVERANCE_VALUES,
      averageDailyWage: "100000",
      periodMode: "manual",
      yearsWorked: "1",
      monthsWorked: "6",
      daysWorked: "0",
    });
    expect(result.data?.serviceDays).toBe("547.5");
  });
  it("rejects short service and localizes errors", () => {
    expect(
      validateSeveranceForm({
        ...INITIAL_SEVERANCE_VALUES,
        averageDailyWage: "100000",
        startDate: "2024-01-01",
        endDate: "2024-12-30",
      }).errors.endDate,
    ).toBeDefined();
    expect(
      validateSeveranceForm(INITIAL_SEVERANCE_VALUES, "en").errors
        .averageDailyWage,
    ).toBe("Enter the average daily wage.");
  });
});

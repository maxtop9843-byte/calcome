import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateAverageWage } from "./calculate";
describe("calculateAverageWage", () => {
  it("uses the calculated daily wage when it is higher than ordinary daily wage", () => {
    const result = calculateAverageWage({
      wageTotal: new Decimal(9_000_000),
      calendarDays: new Decimal(92),
      ordinaryDailyWage: new Decimal(90_000),
    });
    expect(result.calculatedDailyWage.mul(92).eq(9_000_000)).toBe(true);
    expect(result.appliedDailyWage?.eq(result.calculatedDailyWage)).toBe(true);
  });
  it("uses ordinary daily wage when it is higher than the calculated wage", () => {
    const result = calculateAverageWage({
      wageTotal: new Decimal(9_000_000),
      calendarDays: new Decimal(92),
      ordinaryDailyWage: new Decimal(100_000),
    });
    expect(result.appliedDailyWage?.eq(100_000)).toBe(true);
    expect(result.thirtyDayWage.eq(3_000_000)).toBe(true);
  });
  it("keeps the same value when ordinary and calculated wages are equal", () => {
    const result = calculateAverageWage({
      wageTotal: new Decimal(9_000_000),
      calendarDays: new Decimal(90),
      ordinaryDailyWage: new Decimal(100_000),
    });
    expect(result.appliedDailyWage?.eq(result.calculatedDailyWage)).toBe(true);
  });
  it("does not present an applied wage when ordinary wage was not entered", () => {
    const result = calculateAverageWage({
      wageTotal: new Decimal(9_000_000),
      calendarDays: new Decimal(92),
    });
    expect(result.ordinaryWageCompared).toBe(false);
    expect(result.appliedDailyWage).toBeUndefined();
    expect(result.thirtyDayWage.eq(result.calculatedDailyWage.mul(30))).toBe(
      true,
    );
  });
});

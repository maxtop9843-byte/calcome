import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import { calculateCagr } from "./calculate";

describe("calculateCagr", () => {
  it("calculates compound annual growth", () => {
    const result = calculateCagr({
      initialValue: "100",
      finalValue: "121",
      years: "2",
    });
    expect(new Decimal(result.cagrPercent).toDecimalPlaces(12).toString()).toBe(
      "10",
    );
    expect(result.totalReturnPercent).toBe("21");
    expect(result.absoluteProfit).toBe("21");
  });

  it("calculates loss scenarios", () => {
    const result = calculateCagr({
      initialValue: "100",
      finalValue: "81",
      years: "2",
    });
    expect(new Decimal(result.cagrPercent).toDecimalPlaces(12).toString()).toBe(
      "-10",
    );
    expect(result.totalReturnPercent).toBe("-19");
    expect(result.absoluteProfit).toBe("-19");
  });

  it("handles zero growth and a complete loss", () => {
    expect(
      calculateCagr({ initialValue: "100", finalValue: "100", years: "5" }),
    ).toMatchObject({
      cagrPercent: "0",
      totalReturnPercent: "0",
      absoluteProfit: "0",
    });
    expect(
      calculateCagr({ initialValue: "100", finalValue: "0", years: "5" }),
    ).toMatchObject({
      cagrPercent: "-100",
      totalReturnPercent: "-100",
      absoluteProfit: "-100",
    });
  });

  it("supports one month and one hundred years", () => {
    const month = calculateCagr({
      initialValue: "100",
      finalValue: "101",
      years: new Decimal(1).div(12).toString(),
    });
    expect(new Decimal(month.cagrPercent).toDecimalPlaces(6).toString()).toBe(
      "12.682503",
    );
    const century = calculateCagr({
      initialValue: "100",
      finalValue: "200",
      years: "100",
    });
    expect(new Decimal(century.cagrPercent).isFinite()).toBe(true);
    expect(new Decimal(century.cagrPercent).isPositive()).toBe(true);
  });
});

import { describe, expect, it } from "vitest";

import { formatMultiplier, formatPercent, formatWon } from "./format";

describe("compound interest formatting", () => {
  it("rounds won half-up only for presentation", () => {
    expect(formatWon("1000.5")).toContain("1,001");
    expect(formatWon("1000.49")).toContain("1,000");
  });

  it("labels unavailable and available multipliers", () => {
    expect(formatMultiplier(null)).toBe("계산할 수 없음");
    expect(formatMultiplier("1.2345")).toBe("1.23×");
  });

  it("formats Korean grouping without scientific notation", () => {
    expect(formatWon("12345678901234567890")).toContain(
      "12,345,678,901,234,567,890",
    );
    expect(formatWon("12345678901234567890")).not.toMatch(/[eE][+-]?\d/);
  });

  it("formats optional percentages explicitly", () => {
    expect(formatPercent(null)).toBe("사용 안 함");
    expect(formatPercent("3.456")).toBe("3.46%");
  });
});

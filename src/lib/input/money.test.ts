import { describe, expect, it } from "vitest";

import { formatMoneyInput, isValidMoneyInput } from "./money";

describe("money input formatting", () => {
  it("groups pasted and continuously typed digits", () => {
    expect(formatMoneyInput("1000000")).toBe("1,000,000");
    expect(formatMoneyInput("1,0000", "1,000")).toBe("10,000");
  });

  it("supports deletion without corrupting the value", () => {
    expect(formatMoneyInput("1,00", "1,000")).toBe("100");
    expect(formatMoneyInput("", "100")).toBe("");
  });

  it("keeps malformed pasted grouping invalid", () => {
    expect(formatMoneyInput("10,00")).toBe("10,00");
    expect(isValidMoneyInput("10,00")).toBe(false);
    expect(isValidMoneyInput("10,000")).toBe(true);
  });
});

import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateDividendYield } from "./calculate";

describe("calculateDividendYield", () => {
  it("calculates yield and annual dividend per million won", () => {
    const result = calculateDividendYield({
      annualDividendPerShare: new Decimal(2_000),
      sharePrice: new Decimal(50_000),
    });

    expect(result.dividendYield.toNumber()).toBe(4);
    expect(result.annualDividendPerMillion.toNumber()).toBe(40_000);
  });
});

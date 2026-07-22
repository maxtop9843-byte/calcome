import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";
import { calculateValueAddedTax } from "./calculate";

describe("calculateValueAddedTax", () => {
  it("adds VAT to a supply amount", () => {
    const result = calculateValueAddedTax({
      amount: new Decimal(100_000),
      taxRate: new Decimal(10),
      mode: "exclusive",
    });

    expect(result.supplyAmount.toNumber()).toBe(100_000);
    expect(result.taxAmount.toNumber()).toBe(10_000);
    expect(result.totalAmount.toNumber()).toBe(110_000);
  });

  it("extracts VAT from an inclusive amount without losing precision", () => {
    const result = calculateValueAddedTax({
      amount: new Decimal(110_000),
      taxRate: new Decimal(10),
      mode: "inclusive",
    });

    expect(result.supplyAmount.toNumber()).toBe(100_000);
    expect(result.taxAmount.toNumber()).toBe(10_000);
    expect(result.totalAmount.toNumber()).toBe(110_000);
  });
});

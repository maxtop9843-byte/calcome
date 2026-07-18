import { describe, expect, it } from "vitest";
import { validateEarlyRepaymentFee } from "./validation";

const valid = {
  repaymentAmount: "100,000,000",
  feeRate: "1.2",
  originalTermMonths: "36",
  elapsedMonths: "12",
};

describe("validateEarlyRepaymentFee", () => {
  it("accepts valid localized inputs", () => {
    expect(
      validateEarlyRepaymentFee(valid, "ko").data?.repaymentAmount.toNumber(),
    ).toBe(100_000_000);
  });
  it("rejects elapsed time beyond the contract term", () => {
    expect(
      validateEarlyRepaymentFee({ ...valid, elapsedMonths: "37" }, "en").errors
        .elapsedMonths,
    ).toContain("cannot exceed");
  });
  it("accepts a zero fee rate and zero elapsed months", () => {
    expect(
      validateEarlyRepaymentFee(
        { ...valid, feeRate: "0", elapsedMonths: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
});

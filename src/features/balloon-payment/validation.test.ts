import { describe, expect, it } from "vitest";
import { validateBalloonPayment } from "./validation";

const valid = {
  principal: "100,000,000",
  annualRate: "5",
  termMonths: "60",
  balloonAmount: "40,000,000",
};

describe("validateBalloonPayment", () => {
  it("parses valid localized money values", () => {
    const result = validateBalloonPayment(valid, "ko");
    expect(result.errors).toEqual({});
    expect(result.data?.principal.toString()).toBe("100000000");
  });
  it("accepts zero rates and a zero balloon", () => {
    expect(
      validateBalloonPayment(
        { ...valid, annualRate: "0", balloonAmount: "0" },
        "en",
      ).data,
    ).toBeDefined();
  });
  it("rejects a balloon larger than principal and other invalid values", () => {
    const result = validateBalloonPayment(
      {
        principal: "100",
        annualRate: "101",
        termMonths: "0",
        balloonAmount: "101",
      },
      "en",
    );
    expect(result.errors).toEqual(
      expect.objectContaining({
        annualRate: expect.any(String),
        termMonths: expect.any(String),
        balloonAmount: expect.any(String),
      }),
    );
    expect(result.data).toBeUndefined();
  });
});

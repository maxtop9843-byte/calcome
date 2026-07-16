import { describe, expect, it } from "vitest";

import { localeFromPathname } from "./proxy";

describe("localized document language", () => {
  it("selects the correct root document language from the route", () => {
    expect(localeFromPathname("/ko/finance/compound-interest")).toBe("ko");
    expect(localeFromPathname("/en/finance/compound-interest")).toBe("en");
    expect(localeFromPathname("/finance/loan")).toBe("ko");
  });
});

import { describe, expect, it } from "vitest";

import { config, localeFromPathname } from "./proxy";

describe("localized document language", () => {
  it("selects the correct root document language from the route", () => {
    expect(localeFromPathname("/ko/finance/compound-interest")).toBe("ko");
    expect(localeFromPathname("/en/finance/compound-interest")).toBe("en");
    expect(localeFromPathname("/finance/loan")).toBe("ko");
  });

  it("leaves App Router metadata routes to their native route handlers", () => {
    const matcher = new RegExp(config.matcher[0]);

    expect(matcher.test("/sitemap.xml")).toBe(false);
    expect(matcher.test("/robots.txt")).toBe(false);
    expect(matcher.test("/manifest.webmanifest")).toBe(false);
    expect(matcher.test("/en/finance/compound-interest")).toBe(true);
  });
});

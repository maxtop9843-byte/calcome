import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import LegacyCompoundInterestPage from "./page";

vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));

describe("legacy compound interest route", () => {
  it("permanently redirects to the canonical Korean route", () => {
    LegacyCompoundInterestPage();
    expect(permanentRedirect).toHaveBeenCalledWith(
      "/ko/finance/compound-interest",
    );
  });
});

import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";

import SavingsRedirectPage from "./page";

vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));

describe("legacy savings route", () => {
  it("permanently redirects to the canonical Korean route", () => {
    SavingsRedirectPage();
    expect(permanentRedirect).toHaveBeenCalledWith("/ko/finance/savings");
  });
});

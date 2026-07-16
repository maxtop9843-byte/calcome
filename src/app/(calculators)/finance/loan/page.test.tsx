import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import LoanRedirectPage from "./page";
vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));
describe("legacy loan route", () => {
  it("redirects permanently to the Korean canonical route", () => {
    LoanRedirectPage();
    expect(permanentRedirect).toHaveBeenCalledWith("/ko/finance/loan");
  });
});

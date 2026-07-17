import { describe, expect, it, vi } from "vitest";
const redirect = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({ permanentRedirect: redirect }));
import Page from "./page";
describe("legacy net salary route", () => {
  it("redirects permanently to Korean canonical", () => {
    Page();
    expect(redirect).toHaveBeenCalledWith("/ko/employment/net-salary");
  });
});

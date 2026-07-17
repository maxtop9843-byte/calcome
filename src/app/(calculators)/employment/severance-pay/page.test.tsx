import { permanentRedirect } from "next/navigation";
import { describe, expect, it, vi } from "vitest";
import Page from "./page";
vi.mock("next/navigation", () => ({ permanentRedirect: vi.fn() }));
describe("legacy severance route", () => {
  it("redirects permanently", () => {
    Page();
    expect(permanentRedirect).toHaveBeenCalledWith(
      "/ko/employment/severance-pay",
    );
  });
});

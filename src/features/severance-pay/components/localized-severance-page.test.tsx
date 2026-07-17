import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createSeveranceMetadata } from "../metadata";
import { LocalizedSeverancePage } from "./localized-severance-page";

describe("LocalizedSeverancePage", () => {
  it("renders localized metadata and structured data", () => {
    const { container } = render(<LocalizedSeverancePage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "퇴직금 계산기" }),
    ).toBeVisible();
    expect(createSeveranceMetadata("ko").alternates).toMatchObject({
      canonical: "/ko/employment/severance-pay",
      languages: { en: "/en/employment/severance-pay" },
    });
    const schemas = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(
      schemas["@graph"].map((item: { "@type": string }) => item["@type"]),
    ).toEqual(["WebSite", "WebPage", "BreadcrumbList"]);
  });
  it("renders English without Korean", () => {
    const { container } = render(<LocalizedSeverancePage locale="en" />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Severance Pay Calculator",
      }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
});

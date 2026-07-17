import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createCagrMetadata } from "../metadata";
import { LocalizedCagrPage } from "./localized-cagr-page";

describe("LocalizedCagrPage", () => {
  it("renders Korean content and localized metadata", () => {
    const { container } = render(<LocalizedCagrPage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CAGR 계산기" }),
    ).toBeVisible();
    expect(createCagrMetadata("ko").alternates).toMatchObject({
      canonical: "/ko/finance/cagr",
      languages: { ko: "/ko/finance/cagr", en: "/en/finance/cagr" },
    });
    const schemas = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(
      schemas["@graph"].map((item: { "@type": string }) => item["@type"]),
    ).toEqual(["WebSite", "WebPage", "BreadcrumbList"]);
  });

  it("renders English without unintended Korean", () => {
    const { container } = render(<LocalizedCagrPage locale="en" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CAGR Calculator" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
    expect(createCagrMetadata("en").alternates).toMatchObject({
      canonical: "/en/finance/cagr",
    });
  });
});

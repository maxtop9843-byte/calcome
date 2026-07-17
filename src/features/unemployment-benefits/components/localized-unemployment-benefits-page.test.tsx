import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createUnemploymentBenefitsMetadata } from "../metadata";
import { LocalizedUnemploymentBenefitsPage } from "./localized-unemployment-benefits-page";

describe("LocalizedUnemploymentBenefitsPage", () => {
  it("renders complete Korean content and visible source links", () => {
    const { container } = render(
      <LocalizedUnemploymentBenefitsPage locale="ko" />,
    );
    expect(
      screen.getByRole("heading", { name: "실업급여 계산기", level: 1 }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "자주 묻는 질문" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: /고용24/ })).toBeVisible();
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toHaveTextContent("BreadcrumbList");
  });
  it("renders English without Korean UI", () => {
    const { container } = render(
      <LocalizedUnemploymentBenefitsPage locale="en" />,
    );
    expect(
      screen.getByRole("heading", {
        name: "Korean Unemployment Benefits Calculator",
      }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
  it("defines canonical, hreflang, Open Graph, and Twitter metadata", () => {
    const metadata = createUnemploymentBenefitsMetadata("en");
    expect(metadata.alternates).toMatchObject({
      canonical: "/en/employment/unemployment-benefits",
      languages: {
        ko: "/ko/employment/unemployment-benefits",
        en: "/en/employment/unemployment-benefits",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/en/employment/unemployment-benefits",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });
});

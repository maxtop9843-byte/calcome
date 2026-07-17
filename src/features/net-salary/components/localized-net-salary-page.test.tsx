import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LocalizedNetSalaryPage } from "./localized-net-salary-page";
import { createNetSalaryMetadata } from "../metadata";
describe("LocalizedNetSalaryPage", () => {
  it("renders Korean content and structured data", () => {
    const { container } = render(<LocalizedNetSalaryPage locale="ko" />);
    expect(
      screen.getByRole("heading", { name: "실수령액 계산기", level: 1 }),
    ).toBeVisible();
    expect(
      container.querySelector('script[type="application/ld+json"]'),
    ).toHaveTextContent("BreadcrumbList");
  });
  it("renders English without Korean shared calculator copy", () => {
    const { container } = render(<LocalizedNetSalaryPage locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Korean Net Salary Calculator" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
  });
  it("defines localized canonical and hreflang metadata", () => {
    expect(createNetSalaryMetadata("en").alternates).toMatchObject({
      canonical: "/en/employment/net-salary",
      languages: {
        ko: "/ko/employment/net-salary",
        en: "/en/employment/net-salary",
      },
    });
  });
});

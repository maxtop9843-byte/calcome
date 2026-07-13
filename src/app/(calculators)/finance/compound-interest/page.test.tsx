import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CompoundInterestPage, { metadata } from "./page";

describe("compound interest page SEO", () => {
  it("exports unique metadata and the approved canonical path", () => {
    expect(metadata.title).toContain("복리 계산기");
    expect(metadata.description).toContain("복리");
    expect(metadata.alternates).toEqual({
      canonical: "/finance/compound-interest",
    });
  });

  it("renders indexable explanations, breadcrumbs, and matching structured data", () => {
    const { container } = render(<CompoundInterestPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "복리 계산기" }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "현재 위치" }),
    ).toHaveTextContent("홈/금융/복리 계산기");
    expect(screen.getByRole("heading", { name: "계산 방법" })).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "자주 묻는 질문" }),
    ).toBeVisible();

    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(jsonLd).not.toBeNull();
    const data = JSON.parse(jsonLd!.textContent!);
    expect(data.map((item: { "@type": string }) => item["@type"])).toEqual([
      "WebPage",
      "BreadcrumbList",
    ]);
    expect(data[0].name).toContain("복리 계산기");
    expect(data[1].itemListElement.at(-1).name).toBe("복리 계산기");
  });
});

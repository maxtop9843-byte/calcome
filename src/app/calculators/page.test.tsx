import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CalculatorsPage, { metadata } from "./page";

describe("calculator directory", () => {
  it("defines unique metadata and a canonical URL", () => {
    expect(metadata.title).toBe("금융 계산기 모음");
    expect(metadata.alternates).toEqual({ canonical: "/calculators" });
    expect(metadata.openGraph).toMatchObject({
      url: "http://localhost:3000/calculators",
      siteName: "CalcLab",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("lists the currently published calculators", () => {
    const { container } = render(<CalculatorsPage />);

    expect(screen.getByRole("heading", { name: "모든 계산기" })).toBeVisible();
    expect(
      within(screen.getByRole("list", { name: "공개 계산기" })).getAllByRole(
        "listitem",
      ),
    ).toHaveLength(4);
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toHaveAttribute(
      "href",
      "/finance/deposit",
    );
    expect(screen.getByRole("link", { name: /적금 계산기/ })).toHaveAttribute(
      "href",
      "/finance/savings",
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/finance/loan",
    );
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );

    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 4,
        itemListElement: [
          {
            position: 1,
            name: "예금 계산기",
            url: "http://localhost:3000/finance/deposit",
          },
          {
            position: 2,
            name: "적금 계산기",
            url: "http://localhost:3000/finance/savings",
          },
          {
            position: 3,
            name: "대출 계산기",
            url: "http://localhost:3000/finance/loan",
          },
          {
            position: 4,
            name: "복리 계산기",
            url: "http://localhost:3000/finance/compound-interest",
          },
        ],
      },
    });
  });
});

import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CalculatorsPage, { metadata } from "./page";

describe("calculator directory", () => {
  it("defines unique metadata and a canonical URL", () => {
    expect(metadata.title).toBe("금융 계산기 모음");
    expect(metadata.alternates).toEqual({ canonical: "/calculators" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://calcome.com/calculators",
      siteName: "CalCome",
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
    ).toHaveLength(5);
    expect(screen.getByRole("link", { name: /CAGR 계산기/ })).toHaveAttribute(
      "href",
      "/finance/cagr",
    );
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
        numberOfItems: 5,
        itemListElement: [
          {
            position: 1,
            name: "CAGR 계산기",
            url: "https://calcome.com/finance/cagr",
          },
          {
            position: 2,
            name: "예금 계산기",
            url: "https://calcome.com/finance/deposit",
          },
          {
            position: 3,
            name: "적금 계산기",
            url: "https://calcome.com/finance/savings",
          },
          {
            position: 4,
            name: "대출 계산기",
            url: "https://calcome.com/finance/loan",
          },
          {
            position: 5,
            name: "복리 계산기",
            url: "https://calcome.com/finance/compound-interest",
          },
        ],
      },
    });
  });
});

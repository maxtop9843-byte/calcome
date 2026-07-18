import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CalculatorsPage, { metadata } from "./page";

describe("calculator directory", () => {
  it("defines unique metadata and a canonical URL", () => {
    expect(metadata.title).toBe("금융 계산기 모음");
    expect(metadata.alternates).toEqual({ canonical: "/calculators" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.calcome.com/calculators",
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
    ).toHaveLength(15);
    expect(
      screen.getByRole("link", { name: /주휴수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/weekly-holiday-pay");
    expect(screen.getByRole("link", { name: /CAGR 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/cagr",
    );
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/fixed-deposit",
    );
    expect(screen.getByRole("link", { name: /적금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/savings",
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/compound-interest",
    );
    expect(screen.getByRole("link", { name: /퇴직금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/employment/severance-pay",
    );
    expect(
      screen.getByRole("link", { name: /실업급여 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/unemployment-benefits");
    expect(
      screen.getByRole("link", { name: /실수령액 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/net-salary");
    expect(screen.getByRole("link", { name: /시급 계산기/ })).toHaveAttribute(
      "href",
      "/ko/employment/hourly-wage",
    );
    expect(
      screen.getByRole("link", { name: /4대보험 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/social-insurance");
    expect(
      screen.getByRole("link", { name: /평균임금 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/average-wage");
    expect(
      screen.getByRole("link", { name: /연봉 인상률 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/salary-raise");
    expect(
      screen.getByRole("link", { name: /연장근로수당 계산기/ }),
    ).toHaveAttribute("href", "/ko/employment/overtime-pay");

    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "CollectionPage",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: 15,
        itemListElement: [
          {
            position: 1,
            name: "주휴수당 계산기",
            url: "https://www.calcome.com/ko/employment/weekly-holiday-pay",
          },
          {
            position: 2,
            name: "CAGR 계산기",
            url: "https://www.calcome.com/ko/finance/cagr",
          },
          {
            position: 3,
            name: "예금 계산기",
            url: "https://www.calcome.com/ko/finance/fixed-deposit",
          },
          {
            position: 4,
            name: "적금 계산기",
            url: "https://www.calcome.com/ko/finance/savings",
          },
          {
            position: 5,
            name: "대출 계산기",
            url: "https://www.calcome.com/ko/finance/loan",
          },
          {
            position: 6,
            name: "복리 계산기",
            url: "https://www.calcome.com/ko/finance/compound-interest",
          },
          {
            position: 7,
            name: "퇴직금 계산기",
            url: "https://www.calcome.com/ko/employment/severance-pay",
          },
          {
            position: 8,
            name: "실업급여 계산기",
            url: "https://www.calcome.com/ko/employment/unemployment-benefits",
          },
          {
            position: 9,
            name: "실수령액 계산기",
            url: "https://www.calcome.com/ko/employment/net-salary",
          },
          {
            position: 10,
            name: "시급 계산기",
            url: "https://www.calcome.com/ko/employment/hourly-wage",
          },
          {
            position: 11,
            name: "4대보험 계산기",
            url: "https://www.calcome.com/ko/employment/social-insurance",
          },
          {
            position: 12,
            name: "평균임금 계산기",
            url: "https://www.calcome.com/ko/employment/average-wage",
          },
          {
            position: 13,
            name: "연봉 인상률 계산기",
            url: "https://www.calcome.com/ko/employment/salary-raise",
          },
          {
            position: 14,
            name: "연장근로수당 계산기",
            url: "https://www.calcome.com/ko/employment/overtime-pay",
          },
          {
            position: 15,
            name: "야간근로수당 계산기",
            url: "https://www.calcome.com/ko/employment/night-work-pay",
          },
        ],
      },
    });
  });
});

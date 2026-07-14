import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SavingsPage, { metadata } from "./page";

describe("savings page", () => {
  it("exports unique canonical and social metadata", () => {
    expect(metadata.title).toContain("적금 계산기");
    expect(metadata.description).toContain("단리");
    expect(metadata.alternates).toEqual({ canonical: "/finance/savings" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://calcome.com/finance/savings",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("renders complete content, truthful structured data, and published links", () => {
    const { container } = render(<SavingsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "적금 계산기" }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "현재 위치" }),
    ).toHaveTextContent("홈/계산기/적금 계산기");
    for (const heading of [
      "이 계산기는 언제 사용하나요?",
      "단리와 월복리의 차이",
      "납입 시점이 이자를 바꾸는 이유",
      "계산 공식",
      "계산 예시",
      "중요한 주의사항",
      "자주 묻는 질문",
      "관련 계산기",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
    }
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/finance/loan",
    );
    expect(screen.queryByText("Coming Soon")).not.toBeInTheDocument();
    const data = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(data.map((item: { "@type": string }) => item["@type"])).toEqual([
      "WebPage",
      "BreadcrumbList",
    ]);
    expect(data[1].itemListElement.at(-1)).toMatchObject({
      name: "적금 계산기",
      item: "https://calcome.com/finance/savings",
    });
  });
});

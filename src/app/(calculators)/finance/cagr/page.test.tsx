import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CagrPage, { metadata } from "./page";

describe("CAGR page", () => {
  it("exports unique canonical and social metadata", () => {
    expect(metadata.title).toContain("CAGR 계산기");
    expect(metadata.description).toContain("연평균 복합성장률");
    expect(metadata.alternates).toEqual({ canonical: "/finance/cagr" });
    expect(metadata.openGraph).toMatchObject({
      url: "https://calcome.com/finance/cagr",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("renders complete content, structured data, and published links", () => {
    const { container } = render(<CagrPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CAGR 계산기" }),
    ).toBeVisible();
    for (const heading of [
      "CAGR은 언제 사용하나요?",
      "CAGR 계산 공식",
      "실전 투자 예시",
      "결과 해석 가이드",
      "중요한 주의사항",
      "자주 묻는 질문",
      "관련 계산기",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
    }
    for (const [name, href] of [
      ["복리 계산기", "/finance/compound-interest"],
      ["대출 계산기", "/finance/loan"],
      ["적금 계산기", "/finance/savings"],
      ["예금 계산기", "/finance/deposit"],
    ]) {
      expect(
        screen.getByRole("link", { name: new RegExp(name) }),
      ).toHaveAttribute("href", href);
    }
    const data = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(data.map((item: { "@type": string }) => item["@type"])).toEqual([
      "WebPage",
      "BreadcrumbList",
    ]);
    expect(data[1].itemListElement.at(-1)).toMatchObject({
      name: "CAGR 계산기",
      item: "https://calcome.com/finance/cagr",
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoanPage, { metadata } from "./page";

describe("loan page", () => {
  it("exports unique canonical and social metadata", () => {
    expect(metadata.title).toContain("대출 계산기");
    expect(metadata.description).toContain("원리금균등");
    expect(metadata.alternates).toEqual({ canonical: "/finance/loan" });
    expect(metadata.openGraph).toMatchObject({
      url: expect.stringContaining("/finance/loan"),
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });
  it("renders every complete content section and navigation", () => {
    render(<LoanPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "대출 계산기" }),
    ).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "현재 위치" }),
    ).toHaveTextContent("홈/계산기/대출 계산기");
    for (const heading of [
      "이 계산기는 언제 사용하나요?",
      "상환 방식의 차이",
      "계산 공식",
      "계산 예시",
      "중요한 주의사항",
      "자주 묻는 질문",
      "관련 계산기",
    ])
      expect(screen.getByRole("heading", { name: heading })).toBeVisible();
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );
    expect(screen.getAllByText("Coming Soon")).toHaveLength(2);
  });
});

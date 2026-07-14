import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage, { metadata as aboutMetadata } from "./about/page";
import ContactPage, { metadata as contactMetadata } from "./contact/page";
import PrivacyPage, { metadata as privacyMetadata } from "./privacy/page";
import TermsPage, { metadata as termsMetadata } from "./terms/page";

const pageMetadata = [
  { metadata: aboutMetadata, title: "소개", path: "/about" },
  { metadata: privacyMetadata, title: "개인정보처리방침", path: "/privacy" },
  { metadata: termsMetadata, title: "이용약관", path: "/terms" },
  { metadata: contactMetadata, title: "문의", path: "/contact" },
];

describe("trust page metadata", () => {
  it.each(pageMetadata)(
    "defines unique metadata for $path",
    ({ metadata, title, path }) => {
      expect(metadata.title).toBe(title);
      expect(metadata.description).toBeTruthy();
      expect(metadata.alternates).toEqual({ canonical: path });
      expect(metadata.openGraph).toMatchObject({
        url: `https://calcome.com${path}`,
        siteName: "CalCome",
      });
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    },
  );
});

describe("trust page content", () => {
  it("states the product purpose and estimate limitations", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: "CalCome 소개" })).toBeVisible();
    expect(screen.getByText(/한국 금융 계산기를 제공합니다/)).toBeVisible();
    expect(
      screen.getByText(/금융, 투자, 세금 또는 법률 자문이 아니며/),
    ).toBeVisible();
  });

  it("accurately describes browser input processing and infrastructure logs", () => {
    const { container } = render(<PrivacyPage />);

    expect(screen.getByText(/사용자의 브라우저에서 처리됩니다/)).toBeVisible();
    expect(
      screen.getByText(/표준 접속 기록을 처리할 수 있습니다/),
    ).toBeVisible();
    expect(screen.getByText(/광고 네트워크/)).toBeVisible();

    for (const fabricatedDetail of [
      "주식회사 CalCome",
      "사업자등록번호",
      "대표자",
    ]) {
      expect(container).not.toHaveTextContent(fabricatedDetail);
    }
  });

  it("states permitted use and calculator limitations without company fiction", () => {
    const { container } = render(<TermsPage />);

    expect(screen.getByText(/정보성 추정치입니다/)).toBeVisible();
    expect(
      screen.getByText(/실제 금융 결과를 보장하지 않습니다/),
    ).toBeVisible();

    for (const fabricatedDetail of [
      "주식회사 CalCome",
      "사업자등록번호",
      "대표자",
    ]) {
      expect(container).not.toHaveTextContent(fabricatedDetail);
    }
  });

  it("uses the verified GitHub Issues contact path", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("link", { name: "GitHub Issues 열기" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/maxtop9843-byte/calcome/issues",
    );
    expect(screen.getByText(/민감한 개인정보를 게시하지 마세요/)).toBeVisible();
  });
});

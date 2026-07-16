import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import ErrorPage from "./error";
import { metadata } from "./layout";
import Loading from "./loading";
import manifest from "./manifest";
import NotFound from "./not-found";
import Home, { metadata as homeMetadata } from "./page";
import robots from "./robots";
import sitemap from "./sitemap";

describe("production metadata routes", () => {
  it("defines consistent global metadata and social cards", () => {
    expect(metadata.title).toMatchObject({
      default: "CalCome - 금융 계산을 쉽게.",
      template: "%s | CalCome",
    });
    expect(metadata.alternates).toBeUndefined();
    expect(homeMetadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      locale: "ko_KR",
      siteName: "CalCome",
      url: "/",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("provides a Korean web app manifest with branded icons", () => {
    expect(manifest()).toMatchObject({
      name: "CalCome - 금융 계산을 쉽게.",
      short_name: "CalCome",
      start_url: "/",
      scope: "/",
      display: "standalone",
      lang: "ko-KR",
    });
    expect(manifest().icons).toEqual([
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ]);
  });

  it("publishes crawl rules and only canonical public routes", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://calcome.com/sitemap.xml",
      host: "https://calcome.com",
    });
    expect(sitemap()).toEqual([
      {
        url: "https://calcome.com/",
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "https://calcome.com/calculators",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://calcome.com/finance/cagr",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://calcome.com/finance/deposit",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://calcome.com/finance/loan",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "https://calcome.com/ko/finance/compound-interest",
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ko: "https://calcome.com/ko/finance/compound-interest",
            en: "https://calcome.com/en/finance/compound-interest",
          },
        },
      },
      {
        url: "https://calcome.com/en/finance/compound-interest",
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ko: "https://calcome.com/ko/finance/compound-interest",
            en: "https://calcome.com/en/finance/compound-interest",
          },
        },
      },
      {
        url: "https://calcome.com/ko/finance/savings",
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ko: "https://calcome.com/ko/finance/savings",
            en: "https://calcome.com/en/finance/savings",
          },
        },
      },
      {
        url: "https://calcome.com/en/finance/savings",
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            ko: "https://calcome.com/ko/finance/savings",
            en: "https://calcome.com/en/finance/savings",
          },
        },
      },
      {
        url: "https://calcome.com/about",
        changeFrequency: "yearly",
        priority: 0.5,
      },
      {
        url: "https://calcome.com/privacy",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "https://calcome.com/terms",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "https://calcome.com/contact",
        changeFrequency: "yearly",
        priority: 0.4,
      },
    ]);
  });
});

describe("production recovery and navigation", () => {
  it("positions the homepage around the calculator catalog", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", { name: "금융 계산을 쉽게." }),
    ).toBeVisible();
    expect(screen.getByText("CalCome")).toBeVisible();
    expect(screen.getByText("복리, 대출, 적금, 예금, ETF까지.")).toBeVisible();
    expect(
      screen.getByText("누구나 쉽게 사용할 수 있는 금융 계산기를 제공합니다."),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "전체 계산기 보기" }),
    ).toHaveAttribute("href", "/calculators");
    expect(
      screen.queryByRole("link", { name: "GitHub에서 보기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "인기 계산기" })).toBeVisible();
    const popularGrid = screen.getByTestId("popular-calculator-grid");
    expect(popularGrid).toHaveClass("sm:grid-cols-2");
    expect(
      Array.from(popularGrid.children).map((item) => item.textContent),
    ).toEqual([
      expect.stringContaining("복리 계산기"),
      expect.stringContaining("대출 계산기"),
      expect.stringContaining("예금 계산기"),
      expect.stringContaining("적금 계산기"),
      expect.stringContaining("CAGR 계산기"),
    ]);
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toHaveAttribute(
      "href",
      "/finance/deposit",
    );
    expect(screen.getByRole("link", { name: /적금 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/savings",
    );
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "WebSite",
      name: "CalCome",
      url: "https://calcome.com/",
    });
  });

  it("keeps shared navigation limited to valid destinations", () => {
    const { unmount } = render(<SiteHeader />);
    const headerNavigation = screen.getByRole("navigation", {
      name: "주요 탐색",
    });
    expect(headerNavigation).toHaveTextContent("계산기");
    expect(screen.getByRole("link", { name: "계산기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
    expect(
      screen.queryByRole("link", { name: "모든 계산기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /모드로 전환/ })).toBeVisible();
    expect(screen.queryByText("금융 가이드")).not.toBeInTheDocument();
    expect(screen.queryByText("블로그")).not.toBeInTheDocument();
    expect(screen.queryByText("즐겨찾기")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "복리 계산기" }),
    ).not.toBeInTheDocument();
    unmount();

    render(<SiteFooter />);
    const footerNavigation = screen.getByRole("navigation", {
      name: "하단 탐색",
    });
    expect(footerNavigation).toHaveTextContent(
      "계산기소개개인정보처리방침이용약관문의",
    );
    expect(screen.getByRole("link", { name: "계산기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(
      screen.getByRole("link", { name: "개인정보처리방침" }),
    ).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "이용약관" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: "문의" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(
      screen.queryByRole("link", { name: "GitHub" }),
    ).not.toBeInTheDocument();
  });

  it("offers useful recovery from a missing page", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "페이지를 찾을 수 없습니다" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "홈으로 돌아가기" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "복리 계산기" })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );
  });

  it("announces loading without requiring motion", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "페이지를 불러오는 중입니다.",
    );
  });

  it("lets users retry a route error", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    render(<ErrorPage error={new Error("test")} unstable_retry={retry} />);

    await user.click(screen.getByRole("button", { name: "다시 시도" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});

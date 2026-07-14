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
      default: "CalcLab - 현대적인 계산 플랫폼",
      template: "%s | CalcLab",
    });
    expect(metadata.alternates).toBeUndefined();
    expect(homeMetadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({
      locale: "ko_KR",
      siteName: "CalcLab",
      url: "/",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("provides a Korean web app manifest with branded icons", () => {
    expect(manifest()).toMatchObject({
      short_name: "CalcLab",
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
      sitemap: "http://localhost:3000/sitemap.xml",
      host: "http://localhost:3000",
    });
    expect(sitemap()).toEqual([
      {
        url: "http://localhost:3000/",
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: "http://localhost:3000/calculators",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/finance/loan",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/finance/compound-interest",
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/about",
        changeFrequency: "yearly",
        priority: 0.5,
      },
      {
        url: "http://localhost:3000/privacy",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "http://localhost:3000/terms",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "http://localhost:3000/contact",
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
    expect(screen.getByText("복리, 대출, 적금, 예금, ETF까지.")).toBeVisible();
    expect(
      screen.getByText("누구나 쉽게 사용할 수 있는 금융 계산기를 제공합니다."),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "모든 계산기 보기" }),
    ).toHaveAttribute("href", "/calculators");
    expect(
      screen.queryByRole("link", { name: "GitHub에서 보기" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "인기 계산기" })).toBeVisible();
    expect(screen.getByRole("link", { name: /복리 계산기/ })).toHaveAttribute(
      "href",
      "/finance/compound-interest",
    );
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(jsonLd!.textContent!)).toMatchObject({
      "@type": "WebSite",
      name: "CalcLab",
      url: "http://localhost:3000/",
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
      screen.queryByRole("link", { name: "복리 계산기" }),
    ).not.toBeInTheDocument();
    unmount();

    render(<SiteFooter />);
    const footerNavigation = screen.getByRole("navigation", {
      name: "하단 탐색",
    });
    expect(footerNavigation).toHaveTextContent(
      "계산기소개개인정보처리방침이용약관문의GitHub",
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

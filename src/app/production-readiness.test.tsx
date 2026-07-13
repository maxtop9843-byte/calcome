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
        url: "http://localhost:3000/finance/compound-interest",
        changeFrequency: "monthly",
        priority: 0.9,
      },
    ]);
  });
});

describe("production recovery and navigation", () => {
  it("links the homepage directly to the published calculator", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("link", { name: "복리 계산기 사용하기" }),
    ).toHaveAttribute("href", "/finance/compound-interest");
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
    expect(
      screen.getByRole("navigation", { name: "주요 탐색" }),
    ).toHaveTextContent("복리 계산기");
    unmount();

    render(<SiteFooter />);
    const footerNavigation = screen.getByRole("navigation", {
      name: "하단 탐색",
    });
    expect(footerNavigation).toHaveTextContent("홈복리 계산기GitHub");
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

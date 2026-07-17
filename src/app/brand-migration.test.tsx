import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { canonicalSiteUrl, siteConfig } from "@/config/site";
import { socialImageAlt } from "@/lib/seo/social-image";

import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import Home from "./page";
import PrivacyPage from "./privacy/page";
import TermsPage from "./terms/page";

describe("CalCome brand migration", () => {
  it("uses the official identity and production origin", () => {
    expect(siteConfig).toMatchObject({
      name: "CalCome",
      slogan: "금융 계산을 쉽게.",
      url: "https://www.calcome.com",
      description: "금융 계산을 쉽게. 누구나 이해하기 쉬운 금융 계산기입니다.",
    });
    expect(socialImageAlt).toBe("CalCome - 금융 계산을 쉽게.");
  });

  it("normalizes the redirecting apex host without changing local overrides", () => {
    expect(canonicalSiteUrl("https://calcome.com")).toBe(
      "https://www.calcome.com",
    );
    expect(canonicalSiteUrl("http://localhost:3000")).toBe(
      "http://localhost:3000",
    );
  });

  it("shows CalCome and removes the stale public wordmark", () => {
    const { container } = render(
      <>
        <SiteHeader />
        <Home />
        <AboutPage />
        <PrivacyPage />
        <TermsPage />
        <ContactPage />
        <SiteFooter />
      </>,
    );
    const staleBrand = ["Calc", "Lab"].join("");
    expect(container).toHaveTextContent("CalCome");
    expect(container).toHaveTextContent("금융 계산을 쉽게.");
    expect(container).not.toHaveTextContent(staleBrand);
    expect(container).not.toHaveTextContent("한국 금융 계산기");
    expect(container.textContent).not.toMatch(/@gmail\.com/i);
  });
});

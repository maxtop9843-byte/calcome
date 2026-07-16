import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createSavingsMetadata } from "../metadata";
import { LocalizedSavingsPage } from "./localized-savings-page";

describe("LocalizedSavingsPage", () => {
  it("renders Korean content and locale-specific metadata", () => {
    render(<LocalizedSavingsPage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "적금 계산기" }),
    ).toBeVisible();
    expect(createSavingsMetadata("ko").alternates).toMatchObject({
      canonical: "/ko/finance/savings",
      languages: { ko: "/ko/finance/savings", en: "/en/finance/savings" },
    });
  });

  it("renders English content without unintended Korean text", () => {
    const { container } = render(<LocalizedSavingsPage locale="en" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Savings Calculator" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
    expect(createSavingsMetadata("en").alternates).toMatchObject({
      canonical: "/en/finance/savings",
      languages: { ko: "/ko/finance/savings", en: "/en/finance/savings" },
    });
  });
});

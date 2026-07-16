import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createLoanMetadata } from "../metadata";
import { LocalizedLoanPage } from "./localized-loan-page";
describe("LocalizedLoanPage", () => {
  it("renders Korean content and canonical metadata", () => {
    render(<LocalizedLoanPage locale="ko" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "대출 계산기" }),
    ).toBeVisible();
    expect(createLoanMetadata("ko").alternates).toMatchObject({
      canonical: "/ko/finance/loan",
      languages: { ko: "/ko/finance/loan", en: "/en/finance/loan" },
    });
  });
  it("renders English content without unintended Korean", () => {
    const { container } = render(<LocalizedLoanPage locale="en" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Loan Calculator" }),
    ).toBeVisible();
    expect(container.textContent).not.toMatch(/[가-힣]/);
    expect(createLoanMetadata("en").alternates).toMatchObject({
      canonical: "/en/finance/loan",
    });
  });
});

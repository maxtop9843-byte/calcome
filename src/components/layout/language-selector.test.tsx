import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LanguageSelector } from "./language-selector";

describe("LanguageSelector", () => {
  it("preserves the compound calculator destination in both directions", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("calcome-theme", "dark");
    const { rerender } = render(
      <LanguageSelector locale="ko" pathname="/ko/finance/compound-interest" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/compound-interest",
    );
    expect(window.localStorage.getItem("calcome-theme")).toBe("dark");

    rerender(
      <LanguageSelector locale="en" pathname="/en/finance/compound-interest" />,
    );
    expect(screen.getByLabelText("Select language")).toHaveTextContent(
      "English",
    );
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/finance/compound-interest",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("is keyboard accessible, closes after selection, and exposes only implemented languages", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/compound-interest" />,
    );
    screen.getByLabelText("언어 선택").focus();
    expect(screen.getByLabelText("언어 선택")).toHaveFocus();
    await user.click(screen.getByLabelText("언어 선택"));
    const english = screen.getByRole("link", { name: "English" });
    expect(english).toBeVisible();
    await user.click(english);
    expect(english).not.toBeVisible();
    expect(screen.getAllByRole("link", { hidden: true })).toHaveLength(2);
    expect(screen.queryByText("日本語")).not.toBeInTheDocument();
  });

  it("preserves the localized savings destination", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LanguageSelector locale="ko" pathname="/ko/finance/savings" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/savings",
    );
    rerender(<LanguageSelector locale="en" pathname="/en/finance/savings" />);
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/finance/savings",
    );
  });

  it("preserves the localized fixed-deposit destination", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LanguageSelector locale="ko" pathname="/ko/finance/fixed-deposit" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/fixed-deposit",
    );
    rerender(
      <LanguageSelector locale="en" pathname="/en/finance/fixed-deposit" />,
    );
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/finance/fixed-deposit",
    );
  });

  it("preserves the localized loan destination", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LanguageSelector locale="ko" pathname="/ko/finance/loan" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/loan",
    );
    rerender(<LanguageSelector locale="en" pathname="/en/finance/loan" />);
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );
  });

  it("preserves the localized CAGR destination", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <LanguageSelector locale="ko" pathname="/ko/finance/cagr" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/cagr",
    );
    rerender(<LanguageSelector locale="en" pathname="/en/finance/cagr" />);
    await user.click(screen.getByLabelText("Select language"));
    expect(screen.getByRole("link", { name: "한국어" })).toHaveAttribute(
      "href",
      "/ko/finance/cagr",
    );
  });

  it("preserves the localized DSR destination", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/finance/dsr" />);
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/dsr",
    );
  });

  it("preserves the localized DTI destination", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/finance/dti" />);
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/dti",
    );
  });

  it("preserves the localized LTV destination", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/finance/ltv" />);
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/ltv",
    );
  });

  it("preserves the localized loan interest comparison destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/loan-interest-comparison"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/loan-interest-comparison",
    );
  });

  it("preserves the localized loan refinancing destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/loan-refinancing-savings"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/loan-refinancing-savings",
    );
  });

  it("preserves the localized balloon payment destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/balloon-payment" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/balloon-payment",
    );
  });

  it("preserves the localized mortgage payment destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/mortgage-payment" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/mortgage-payment",
    );
  });

  it("preserves the localized jeonse loan interest destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/jeonse-loan-interest"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/jeonse-loan-interest",
    );
  });

  it("preserves the localized credit loan interest destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/credit-loan-interest"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/credit-loan-interest",
    );
  });

  it("preserves the localized severance destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/employment/severance-pay" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/severance-pay",
    );
  });

  it("preserves the localized net-salary destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/employment/net-salary" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/net-salary",
    );
  });

  it("preserves the localized unemployment-benefits destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/employment/unemployment-benefits"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/unemployment-benefits",
    );
  });

  it("preserves the localized hourly-wage destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/employment/hourly-wage" />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/hourly-wage",
    );
  });

  it("preserves the localized minimum-wage destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/employment/minimum-wage" />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/minimum-wage",
    );
  });

  it("preserves the localized salary-conversion destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/employment/salary-conversion"
      />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/salary-conversion",
    );
  });

  it("preserves the localized annual-leave destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/employment/annual-leave-allowance"
      />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/annual-leave-allowance",
    );
  });

  it("preserves the localized gross-up salary destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/employment/gross-up-salary"
      />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/employment/gross-up-salary",
    );
  });

  it("preserves the localized early repayment fee destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/early-loan-repayment-fee"
      />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/early-loan-repayment-fee",
    );
  });

  it("preserves the localized real estate acquisition tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/real-estate-acquisition-tax"
      />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/real-estate-acquisition-tax",
    );
  });

  it("preserves the localized capital gains tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/capital-gains-tax" />,
    );

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/capital-gains-tax",
    );
  });

  it("preserves the localized gift tax destination", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/finance/gift-tax" />);

    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/gift-tax",
    );
  });

  it("preserves the localized inheritance tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/inheritance-tax" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/inheritance-tax",
    );
  });

  it("preserves the localized property tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/property-tax" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/property-tax",
    );
  });

  it("preserves the localized comprehensive holding tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/comprehensive-real-estate-holding-tax"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/comprehensive-real-estate-holding-tax",
    );
  });

  it("preserves the localized value added tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/value-added-tax" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/value-added-tax",
    );
  });

  it("preserves the localized comprehensive income tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/comprehensive-income-tax"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/comprehensive-income-tax",
    );
  });

  it("preserves the localized withholding tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/withholding-tax" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/withholding-tax",
    );
  });

  it("preserves the localized freelancer tax destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/freelancer-3-3-tax"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/freelancer-3-3-tax",
    );
  });

  it("preserves the localized debt repayment period destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/debt-repayment-period"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/debt-repayment-period",
    );
  });

  it("preserves the localized credit card installment destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/credit-card-installment-interest"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/credit-card-installment-interest",
    );
  });

  it("preserves the localized rent conversion rate destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/rent-conversion-rate"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/rent-conversion-rate",
    );
  });

  it("preserves the localized jeonse to monthly rent destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/jeonse-monthly-rent-conversion"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/jeonse-monthly-rent-conversion",
    );
  });

  it("preserves the localized real estate brokerage fee destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/real-estate-brokerage-fee"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/real-estate-brokerage-fee",
    );
  });

  it("preserves the localized stock average cost destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector
        locale="ko"
        pathname="/ko/finance/stock-average-cost"
      />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/stock-average-cost",
    );
  });

  it("preserves the localized stock profit and loss destination", async () => {
    const user = userEvent.setup();
    render(
      <LanguageSelector locale="ko" pathname="/ko/finance/stock-profit-loss" />,
    );
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/stock-profit-loss",
    );
  });

  it("preserves the localized dividend destination", async () => {
    const user = userEvent.setup();
    render(<LanguageSelector locale="ko" pathname="/ko/finance/dividend" />);
    await user.click(screen.getByLabelText("언어 선택"));
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en/finance/dividend",
    );
  });
});

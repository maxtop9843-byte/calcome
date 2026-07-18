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
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { publishedCalculators } from "@/config/calculators";

import { CalculatorSearch } from "./calculator-search";

describe("CalculatorSearch", () => {
  it("matches Korean partial words, aliases, and case-insensitive Latin text", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={publishedCalculators} />);
    const search = screen.getByRole("searchbox", { name: "계산기 검색" });

    await user.type(search, "  출  ");
    expect(screen.getByRole("link", { name: /대출 계산기/ })).toHaveAttribute(
      "href",
      "/ko/finance/loan",
    );

    await user.clear(search);
    await user.type(search, "DEPOSIT");
    expect(screen.getByRole("link", { name: /예금 계산기/ })).toBeVisible();
  });

  it("shows an accessible no-result state and only searches the registry", async () => {
    const user = userEvent.setup();
    render(<CalculatorSearch calculators={publishedCalculators} />);
    await user.type(screen.getByRole("searchbox"), "없는 계산기");
    expect(
      screen.getByText("검색어와 일치하는 계산기가 없습니다."),
    ).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

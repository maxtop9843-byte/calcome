import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CagrCalculator } from "./cagr-calculator";

describe("CagrCalculator", () => {
  async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("시작값 *"), "10000000");
    await user.type(screen.getByLabelText("종료값 *"), "15000000");
    await user.type(screen.getByLabelText("투자 기간 *"), "5");
  }
  it("renders empty inputs, select defaults, and an empty result state", () => {
    render(<CagrCalculator />);
    expect(screen.getByLabelText("시작값 *")).toHaveValue("");
    expect(screen.getByLabelText("기간 단위 *")).toHaveValue("years");
    const result = screen.getByRole("region", {
      name: "연평균 복합성장률(CAGR)",
    });
    expect(within(result).getByText(/시작값과 종료값/)).toBeVisible();
    expect(within(result).queryByText("총수익률")).not.toBeInTheDocument();
  });

  it("renders a loss summary and polite announcement", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    const finalValue = screen.getByLabelText("종료값 *");
    await user.clear(finalValue);
    await user.type(finalValue, "8100000");
    const period = screen.getByLabelText("투자 기간 *");
    await user.clear(period);
    await user.type(period, "2");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByText(/연평균 감소/)).toBeVisible();
    expect(screen.getByTestId("primary-results").children).toHaveLength(3);
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("associates errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    const initial = screen.getByLabelText("시작값 *");
    await user.clear(initial);
    await user.type(initial, "0");
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() => expect(initial).toHaveFocus());
    expect(initial).toHaveAccessibleDescription(/0보다 크고/);
  });

  it("resets inputs and removes calculated results", async () => {
    const user = userEvent.setup();
    render(<CagrCalculator />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: "CAGR 계산하기" }));
    expect(screen.getByTestId("primary-results")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByLabelText("시작값 *")).toHaveValue("");
    expect(screen.queryByTestId("primary-results")).not.toBeInTheDocument();
  });
});

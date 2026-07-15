import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CompoundInterestCalculator } from "./compound-interest-calculator";

describe("CompoundInterestCalculator", () => {
  async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("초기 원금 *"), "1000000");
    await user.type(screen.getByLabelText("정기 납입액 *"), "100000");
    await user.type(screen.getByLabelText("투자 기간 *"), "10");
    await user.type(screen.getByLabelText("연 이자율 *"), "5");
  }
  it("renders empty inputs with reserved result and chart space", () => {
    render(<CompoundInterestCalculator />);

    expect(screen.getByLabelText("초기 원금 *")).toHaveValue("");
    expect(screen.getByPlaceholderText("예: 1,000,000")).toBeVisible();
    expect(screen.getByTestId("primary-results").children).toHaveLength(3);
    expect(screen.getAllByText("—")).toHaveLength(3);
    expect(
      screen.getByRole("img", { name: /누적 납입 원금과 예상 총자산/ }),
    ).toBeVisible();
    expect(screen.getByText(/투자 조건을 계산하면 이곳에/)).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("keeps inflation and tax disabled with empty visible presets", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    await user.click(screen.getByText(/선택 고급 설정: 물가·간이 세금/));

    expect(screen.getByLabelText("연 물가상승률")).toHaveValue("");
    expect(screen.getByLabelText("수익 간이 세율")).toHaveValue("");
  });

  it("reports invalid zero contributions and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    const principal = screen.getByLabelText("초기 원금 *");
    const contribution = screen.getByLabelText("정기 납입액 *");
    await user.clear(principal);
    await user.type(principal, "0");
    await user.clear(contribution);
    await user.type(contribution, "0");
    await user.type(screen.getByLabelText("투자 기간 *"), "10");
    await user.type(screen.getByLabelText("연 이자율 *"), "5");
    await user.click(
      screen.getByRole("button", { name: "예상 결과 계산하기" }),
    );

    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.getAllByText(/하나는 0원보다 커야/)).toHaveLength(2);
    await waitFor(() => expect(principal).toHaveFocus());
  });

  it("makes the tax-adjusted balance primary and retains gross balance", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    await fillRequired(user);

    await user.click(screen.getByText(/선택 고급 설정: 물가·간이 세금/));
    await user.type(screen.getByLabelText("수익 간이 세율"), "20");
    expect(screen.getByText(/물가·간이 세금 \(입력됨\)/)).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "예상 결과 계산하기" }),
    );

    expect(
      screen.getByRole("heading", { name: "세금 반영 예상 최종 금액" }),
    ).toBeVisible();
    const resultRegion = screen.getByRole("region", {
      name: "세금 반영 예상 최종 금액",
    });
    expect(
      within(resultRegion).getByTestId("primary-results").children,
    ).toHaveLength(3);
    expect(screen.getByText("세전 예상 잔액")).toBeVisible();
    expect(screen.getByText(/간이 세율 20%/)).toBeVisible();
    expect(
      screen.getByRole("img", { name: /누적 납입 원금과 예상 총자산/ }),
    ).toBeVisible();
    const details = screen
      .getByText("연도별 상세 내역 보기")
      .closest("details");
    expect(details).not.toHaveAttribute("open");
    expect(screen.getByRole("table", { hidden: true })).not.toBeVisible();
    await user.click(screen.getByText("연도별 상세 내역 보기"));
    expect(
      screen.getByRole("table", { name: "연도별 복리 계산 상세 내역" }),
    ).toBeVisible();
    expect(screen.getByText(/계산이 완료되었습니다/)).toHaveAttribute(
      "aria-live",
      "polite",
    );
  });

  it("associates field errors with invalid inputs", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    const duration = screen.getByLabelText("투자 기간 *");
    await user.clear(duration);
    await user.type(duration, "1.5");
    await user.tab();

    expect(duration).toHaveAttribute("aria-invalid", "true");
    expect(duration).toHaveAccessibleDescription(/정수여야 합니다/);
  });
});

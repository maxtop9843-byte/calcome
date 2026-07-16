import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CompoundInterestCalculator } from "./compound-interest-calculator";

const DETAILS_LABEL = "상세 내역 보기";
const ADDITIONAL_DETAILS_LABEL = "추가 결과와 적용 가정";

describe("CompoundInterestCalculator", () => {
  function getDetails(label: string) {
    const details = screen.getByText(label).closest("details");
    expect(details).not.toBeNull();
    return details as HTMLDetailsElement;
  }

  async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("초기 투자금 *"), "1000000");
    await user.type(screen.getByLabelText("정기 납입액 *"), "100000");
    await user.type(screen.getByLabelText("투자 기간 *"), "10");
    await user.type(screen.getByLabelText("연 이자율 *"), "5");
  }

  async function calculate(user: ReturnType<typeof userEvent.setup>) {
    await user.click(
      screen.getByRole("button", { name: "예상 결과 계산하기" }),
    );
  }

  it("starts with empty inputs, placeholders, and open empty yearly details", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    const fields = [
      ["초기 투자금 *", "예: 10,000,000"],
      ["정기 납입액 *", "예: 500,000"],
      ["투자 기간 *", "예: 10"],
      ["연 이자율 *", "예: 5"],
    ] as const;
    for (const [label, placeholder] of fields) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveValue("");
      expect(input).toHaveAttribute("placeholder", placeholder);
    }

    const principal = screen.getByLabelText("초기 투자금 *");
    await user.click(principal);
    expect(principal).toHaveValue("");
    await user.type(principal, "1234567");
    expect(principal).toHaveValue("1,234,567");
    expect(principal).not.toHaveValue("10,000,000");

    expect(getDetails(DETAILS_LABEL)).toHaveAttribute("open");
    expect(screen.getByText(/계산 후 연도별 원금/)).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.queryByText("연도별 상세 내역 보기")).not.toBeInTheDocument();

    await user.click(screen.getByText(DETAILS_LABEL));
    expect(getDetails(DETAILS_LABEL)).toHaveAttribute("open");
    expect(screen.getByText(/계산 후 연도별 원금/)).toBeVisible();
  });

  it("does not change the current yearly disclosure state on validation failure", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    const details = getDetails(DETAILS_LABEL);
    expect(details).toHaveAttribute("open");
    await fillRequired(user);
    await calculate(user);
    expect(details).toHaveAttribute("open");

    await user.click(screen.getByText(DETAILS_LABEL));
    expect(details).not.toHaveAttribute("open");
    await user.clear(screen.getByLabelText("투자 기간 *"));
    await calculate(user);
    expect(details).not.toHaveAttribute("open");
    expect(screen.getByRole("alert")).toBeVisible();
    await waitFor(() =>
      expect(screen.getByLabelText("투자 기간 *")).toHaveFocus(),
    );
  });

  it("opens both disclosures after success and reopens them after another calculation", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    await fillRequired(user);
    await calculate(user);

    const yearlyDetails = getDetails(DETAILS_LABEL);
    const additionalDetails = getDetails(ADDITIONAL_DETAILS_LABEL);
    expect(yearlyDetails).toHaveAttribute("open");
    expect(additionalDetails).toHaveAttribute("open");
    expect(
      screen.getByRole("table", { name: "연도별 복리 계산 상세 내역" }),
    ).toBeVisible();
    expect(screen.getByText("세전 예상 잔액")).toBeVisible();

    await user.click(screen.getByText(DETAILS_LABEL));
    await user.click(screen.getByText(ADDITIONAL_DETAILS_LABEL));
    expect(yearlyDetails).not.toHaveAttribute("open");
    expect(additionalDetails).not.toHaveAttribute("open");

    await calculate(user);
    expect(yearlyDetails).toHaveAttribute("open");
    expect(additionalDetails).toHaveAttribute("open");
  });

  it("reset restores empty inputs and the open yearly empty state", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    await fillRequired(user);
    await calculate(user);
    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("초기 투자금 *")).toHaveValue("");
    expect(screen.getByLabelText("정기 납입액 *")).toHaveValue("");
    expect(screen.getByLabelText("투자 기간 *")).toHaveValue("");
    expect(screen.getByLabelText("연 이자율 *")).toHaveValue("");
    expect(screen.getByPlaceholderText("예: 10,000,000")).toBeVisible();
    expect(screen.getByPlaceholderText("예: 500,000")).toBeVisible();
    expect(screen.getByPlaceholderText("예: 10")).toBeVisible();
    expect(screen.getByPlaceholderText("예: 5")).toBeVisible();
    expect(getDetails(DETAILS_LABEL)).toHaveAttribute("open");
    expect(screen.getByText(/계산 후 연도별 원금/)).toBeVisible();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.queryByText(ADDITIONAL_DETAILS_LABEL),
    ).not.toBeInTheDocument();

    await user.click(screen.getByText(DETAILS_LABEL));
    expect(getDetails(DETAILS_LABEL)).toHaveAttribute("open");
    expect(screen.getByText(/계산 후 연도별 원금/)).toBeVisible();
  });

  it("keeps inflation and tax disabled with empty visible presets", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    await user.click(screen.getByText(/선택 고급 설정: 물가·간이 세금/));
    expect(screen.getByLabelText("연 물가상승률")).toHaveValue("");
    expect(screen.getByLabelText("수익 간이 세율")).toHaveValue("");
  });

  it("retains calculated results, assumptions, chart, and announcement", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);
    await fillRequired(user);
    await user.click(screen.getByText(/선택 고급 설정: 물가·간이 세금/));
    await user.type(screen.getByLabelText("수익 간이 세율"), "20");
    await calculate(user);

    const resultRegion = screen.getByRole("region", { name: "예상 결과" });
    expect(
      within(resultRegion).getByTestId("primary-results").children,
    ).toHaveLength(3);
    expect(screen.getByText(/간이 세율 20%/)).toBeVisible();
    expect(
      screen.getByRole("img", { name: /누적 납입 원금과 예상 총자산/ }),
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
    await user.type(duration, "1.5");
    await user.tab();
    expect(duration).toHaveAttribute("aria-invalid", "true");
    expect(duration).toHaveAccessibleDescription(/정수여야 합니다/);
  });
});

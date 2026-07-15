import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { YearlyCompoundInterestRecord } from "../types";
import {
  CompoundGrowthChart,
  CompoundGrowthTooltip,
  createGrowthChartData,
  getYearTicks,
} from "./compound-growth-chart";

function record(year: number): YearlyCompoundInterestRecord {
  const principal = String(year * 1000000);
  const assets = String(year * 1000000 + year * year * 10000);
  return {
    year,
    openingBalance: "0",
    contributions: "1000000",
    interest: String(year * 10000),
    cumulativePrincipal: principal,
    grossBalance: assets,
    estimatedTax: "0",
    netBalance: assets,
    inflationAdjustedValue: assets,
  };
}

describe("CompoundGrowthChart", () => {
  it("creates principal and asset series with tooltip interest data", () => {
    const points = createGrowthChartData([record(1), record(2)]);
    expect(points[1]).toEqual({
      year: 2,
      principal: 2000000,
      assets: 2040000,
      interest: 40000,
      principalValue: "2000000",
      assetsValue: "2040000",
      interestValue: "40000",
    });
  });

  it("reduces long-duration year labels while preserving endpoints", () => {
    const ticks = getYearTicks(
      Array.from(
        { length: 30 },
        (_, index) => createGrowthChartData([record(index + 1)])[0],
      ),
    );
    expect(ticks.length).toBeLessThanOrEqual(8);
    expect(ticks[0]).toBe(1);
    expect(ticks.at(-1)).toBe(30);
  });

  it("renders the three specified series, fixed sizing, and accessible context", () => {
    render(<CompoundGrowthChart records={[record(1), record(2)]} />);
    expect(
      screen.getByRole("img", { name: /누적 납입 원금과 예상 총자산/ }),
    ).toHaveClass("h-[300px]", "min-w-0");
    expect(document.querySelectorAll("[data-series]")).toHaveLength(3);
    expect(
      screen.getByText(/정확한 금액은 아래 연도별 상세 내역/),
    ).toBeVisible();
  });

  it("reserves chart space without drawing fake data", () => {
    render(<CompoundGrowthChart />);
    expect(screen.getByTestId("compound-growth-chart")).toHaveClass(
      "h-[300px]",
      "h-[300px]",
    );
    expect(screen.getByText(/값을 입력하고 계산하면/)).toBeVisible();
    expect(document.querySelector(".recharts-wrapper")).not.toBeInTheDocument();
  });

  it("shows year, principal, assets, and interest in the tooltip", () => {
    render(
      <CompoundGrowthTooltip
        active
        point={{
          year: 5,
          principal: 5000000,
          assets: 6100000,
          principalValue: "5000000",
          assetsValue: "6100000",
          interest: 1100000,
          interestValue: "1100000",
        }}
      />,
    );
    expect(screen.getByText("5년")).toBeVisible();
    expect(screen.getByText("누적 납입 원금")).toBeVisible();
    expect(screen.getByText("예상 총자산")).toBeVisible();
    expect(screen.getByText("누적 이자")).toBeVisible();
    expect(screen.getByText("₩1,100,000")).toBeVisible();
  });
});

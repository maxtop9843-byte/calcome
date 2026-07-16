import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { COMPOUND_ANIMATION_DURATION } from "@/features/compound-interest/components/compound-animation";

import type { SavingsScheduleRow } from "../types";
import {
  createSavingsGrowthData,
  SavingsGrowthChart,
} from "./savings-growth-chart";

const schedule: SavingsScheduleRow[] = [
  {
    month: 1,
    deposit: "100000",
    interest: "0",
    cumulativePrincipal: "100000",
    grossBalance: "100000",
  },
  {
    month: 2,
    deposit: "100000",
    interest: "350",
    cumulativePrincipal: "200000",
    grossBalance: "200350",
  },
];

describe("SavingsGrowthChart", () => {
  it("uses calculation records for all three series and shared timing", () => {
    expect(createSavingsGrowthData(schedule)[1]).toMatchObject({
      principalValue: "200000",
      interestValue: "350",
      balanceValue: "200350",
    });
    render(<SavingsGrowthChart schedule={schedule} animationKey={2} />);
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-duration",
      String(COMPOUND_ANIMATION_DURATION),
    );
    expect(screen.getByTestId("savings-growth-chart")).toHaveAttribute(
      "data-animation-run",
      "2",
    );
    expect(
      screen.getByLabelText("차트 범례").querySelectorAll("[data-series]"),
    ).toHaveLength(3);
  });

  it("localizes the accessible chart copy", () => {
    render(<SavingsGrowthChart locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Savings growth chart" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Chart legend")).toHaveTextContent(
      "Cumulative contributionsAccumulated interestEstimated balance",
    );
  });
});

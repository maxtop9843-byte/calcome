import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
  dashboardCalculatorWorkspaceClass,
} from "./calculator-workspace";

describe("calculator workspace", () => {
  it("uses one mobile column, practical tablet columns, and desktop-only sticky settings", () => {
    expect(calculatorWorkspaceClass).toContain("md:grid-cols-");
    expect(calculatorWorkspaceClass).not.toContain("grid-cols-2");
    expect(calculatorSettingsClass).toContain("lg:sticky");
    expect(calculatorSettingsClass).not.toContain("md:sticky");
  });

  it("renders exactly three prioritized metrics", () => {
    render(
      <PrimaryResults
        metrics={[
          { label: "결과", value: "1" },
          { label: "원금", value: "2" },
          { label: "수익", value: "3" },
        ]}
      />,
    );
    expect(screen.getByTestId("primary-results").children).toHaveLength(3);
  });

  it("provides a compact settings variant with desktop sticky positioning", () => {
    expect(compactCalculatorSettingsClass).toContain("p-5");
    expect(compactCalculatorSettingsClass).toContain("rounded-xl");
    expect(compactCalculatorSettingsClass).toContain("lg:sticky");
    expect(compactCalculatorSettingsClass).toContain("lg:top-6");
  });

  it("provides a dashboard variant with a narrow fixed settings sidebar", () => {
    expect(dashboardCalculatorWorkspaceClass).toContain(
      "lg:grid-cols-[20rem_minmax(0,1fr)]",
    );
    expect(dashboardCalculatorWorkspaceClass).not.toContain("0.36fr");
  });
});

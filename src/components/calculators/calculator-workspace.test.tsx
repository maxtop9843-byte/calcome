import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  PrimaryResults,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
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
});

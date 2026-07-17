import { describe, expect, it } from "vitest";
import { INITIAL_NET_SALARY_VALUES } from "./constants";
import { validateNetSalary } from "./validation";
describe("validateNetSalary", () => {
  it("requires salary", () => {
    expect(
      validateNetSalary(INITIAL_NET_SALARY_VALUES, "ko").errors.salary,
    ).toBeTruthy();
  });
  it("accepts a complete annual salary", () => {
    expect(
      validateNetSalary(
        {
          ...INITIAL_NET_SALARY_VALUES,
          salary: "50,000,000",
          monthlyNonTaxable: "200,000",
        },
        "ko",
      ).data,
    ).toBeDefined();
  });
  it("rejects children beyond dependents", () => {
    expect(
      validateNetSalary(
        {
          ...INITIAL_NET_SALARY_VALUES,
          salary: "50000000",
          dependents: "1",
          children: "2",
        },
        "en",
      ).errors.children,
    ).toMatch(/cannot exceed/i);
  });
});

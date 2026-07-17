import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("legacy calculator redirects", () => {
  it("permanently redirects every locale-less alias to one Korean URL", async () => {
    expect(nextConfig.redirects).toBeTypeOf("function");

    const redirects = await nextConfig.redirects!();

    expect(redirects).toEqual([
      {
        source: "/finance/compound-interest",
        destination: "/ko/finance/compound-interest",
        permanent: true,
      },
      {
        source: "/finance/cagr",
        destination: "/ko/finance/cagr",
        permanent: true,
      },
      {
        source: "/finance/savings",
        destination: "/ko/finance/savings",
        permanent: true,
      },
      {
        source: "/finance/deposit",
        destination: "/ko/finance/fixed-deposit",
        permanent: true,
      },
      {
        source: "/finance/loan",
        destination: "/ko/finance/loan",
        permanent: true,
      },
      {
        source: "/employment/net-salary",
        destination: "/ko/employment/net-salary",
        permanent: true,
      },
      {
        source: "/employment/severance-pay",
        destination: "/ko/employment/severance-pay",
        permanent: true,
      },
      {
        source: "/employment/unemployment-benefits",
        destination: "/ko/employment/unemployment-benefits",
        permanent: true,
      },
      {
        source: "/employment/weekly-holiday-pay",
        destination: "/ko/employment/weekly-holiday-pay",
        permanent: true,
      },
    ]);
  });
});

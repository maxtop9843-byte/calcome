import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
        source: "/finance/dsr",
        destination: "/ko/finance/dsr",
        permanent: true,
      },
      {
        source: "/finance/ltv",
        destination: "/ko/finance/ltv",
        permanent: true,
      },
      {
        source: "/finance/loan-interest-comparison",
        destination: "/ko/finance/loan-interest-comparison",
        permanent: true,
      },
      {
        source: "/finance/loan-refinancing-savings",
        destination: "/ko/finance/loan-refinancing-savings",
        permanent: true,
      },
      {
        source: "/finance/balloon-payment",
        destination: "/ko/finance/balloon-payment",
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
      {
        source: "/employment/annual-leave-allowance",
        destination: "/ko/employment/annual-leave-allowance",
        permanent: true,
      },
      {
        source: "/employment/hourly-wage",
        destination: "/ko/employment/hourly-wage",
        permanent: true,
      },
      {
        source: "/employment/social-insurance",
        destination: "/ko/employment/social-insurance",
        permanent: true,
      },
      {
        source: "/employment/average-wage",
        destination: "/ko/employment/average-wage",
        permanent: true,
      },
      {
        source: "/employment/salary-raise",
        destination: "/ko/employment/salary-raise",
        permanent: true,
      },
      {
        source: "/employment/gross-up-salary",
        destination: "/ko/employment/gross-up-salary",
        permanent: true,
      },
      {
        source: "/employment/salary-conversion",
        destination: "/ko/employment/salary-conversion",
        permanent: true,
      },
      {
        source: "/employment/overtime-pay",
        destination: "/ko/employment/overtime-pay",
        permanent: true,
      },
      {
        source: "/employment/night-work-pay",
        destination: "/ko/employment/night-work-pay",
        permanent: true,
      },
      {
        source: "/employment/holiday-work-pay",
        destination: "/ko/employment/holiday-work-pay",
        permanent: true,
      },
      {
        source: "/employment/minimum-wage",
        destination: "/ko/employment/minimum-wage",
        permanent: true,
      },
      {
        source: "/employment/retirement-pension",
        destination: "/ko/employment/retirement-pension",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

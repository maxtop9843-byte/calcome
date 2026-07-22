import Decimal from "decimal.js";

export type DividendInput = {
  shares: Decimal;
  annualDividendPerShare: Decimal;
  paymentsPerYear: Decimal;
  withholdingTaxRate: Decimal;
};

export type DividendResult = {
  grossAnnualDividend: Decimal;
  estimatedTax: Decimal;
  netAnnualDividend: Decimal;
  grossDividendPerPayment: Decimal;
  netMonthlyAverage: Decimal;
};

export function calculateDividend({
  shares,
  annualDividendPerShare,
  paymentsPerYear,
  withholdingTaxRate,
}: DividendInput): DividendResult {
  const grossAnnualDividend = shares.mul(annualDividendPerShare);
  const estimatedTax = grossAnnualDividend.mul(withholdingTaxRate).div(100);
  const netAnnualDividend = grossAnnualDividend.minus(estimatedTax);
  return {
    grossAnnualDividend,
    estimatedTax,
    netAnnualDividend,
    grossDividendPerPayment: grossAnnualDividend.div(paymentsPerYear),
    netMonthlyAverage: netAnnualDividend.div(12),
  };
}

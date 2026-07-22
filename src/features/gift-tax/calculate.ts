import Decimal from "decimal.js";

export type GiftTaxInput = {
  giftValue: Decimal;
  assumedDebt: Decimal;
  deductibleAmount: Decimal;
  taxRate: Decimal;
  progressiveDeduction: Decimal;
  filingCreditRate: Decimal;
};

export type GiftTaxResult = {
  netGift: Decimal;
  taxableGift: Decimal;
  taxBeforeCredit: Decimal;
  filingCredit: Decimal;
  estimatedTax: Decimal;
  netReceived: Decimal;
  effectiveTaxRate: Decimal;
};

export function calculateGiftTax(input: GiftTaxInput): GiftTaxResult {
  const netGift = Decimal.max(input.giftValue.minus(input.assumedDebt), 0);
  const taxableGift = Decimal.max(netGift.minus(input.deductibleAmount), 0);
  const taxBeforeCredit = Decimal.max(
    taxableGift.mul(input.taxRate).div(100).minus(input.progressiveDeduction),
    0,
  );
  const filingCredit = taxBeforeCredit.mul(input.filingCreditRate).div(100);
  const estimatedTax = Decimal.max(taxBeforeCredit.minus(filingCredit), 0);

  return {
    netGift,
    taxableGift,
    taxBeforeCredit,
    filingCredit,
    estimatedTax,
    netReceived: netGift.minus(estimatedTax),
    effectiveTaxRate: netGift.gt(0)
      ? estimatedTax.div(netGift).mul(100)
      : new Decimal(0),
  };
}

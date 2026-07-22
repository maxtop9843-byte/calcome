import Decimal from "decimal.js";
import type { RealEstateBrokerageFeeInput } from "./calculate";
import type { RealEstateBrokerageFeeLocale } from "./content";

export type RealEstateBrokerageFeeValues = {
  transactionAmount: string;
  feeRate: string;
  vatRate: string;
};
export type RealEstateBrokerageFeeErrors = Partial<
  Record<keyof RealEstateBrokerageFeeValues, string>
>;

function decimal(value: string) {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) return null;
  try {
    const parsed = new Decimal(normalized);
    return parsed.isFinite() ? parsed : null;
  } catch {
    return null;
  }
}

export function validateRealEstateBrokerageFee(
  values: RealEstateBrokerageFeeValues,
  locale: RealEstateBrokerageFeeLocale,
) {
  const ko = locale === "ko";
  const errors: RealEstateBrokerageFeeErrors = {};
  const transactionAmount = decimal(values.transactionAmount);
  const feeRate = decimal(values.feeRate);
  const vatRate = decimal(values.vatRate);
  if (
    !transactionAmount ||
    transactionAmount.lte(0) ||
    transactionAmount.gt(1_000_000_000_000)
  )
    errors.transactionAmount = ko
      ? "거래금액은 0원 초과 1조원 이하로 입력해 주세요."
      : "Enter an amount above 0 and no more than KRW 1 trillion.";
  if (!feeRate || feeRate.lte(0) || feeRate.gt(10))
    errors.feeRate = ko
      ? "중개보수율은 0% 초과 10% 이하로 입력해 주세요."
      : "Enter a fee rate above 0% and no more than 10%.";
  if (!vatRate || vatRate.lt(0) || vatRate.gt(100))
    errors.vatRate = ko
      ? "부가세율은 0% 이상 100% 이하로 입력해 주세요."
      : "Enter a VAT rate from 0% to 100%.";
  return Object.keys(errors).length ||
    !transactionAmount ||
    !feeRate ||
    !vatRate
    ? { errors }
    : {
        errors,
        data: {
          transactionAmount,
          feeRate,
          vatRate,
        } satisfies RealEstateBrokerageFeeInput,
      };
}

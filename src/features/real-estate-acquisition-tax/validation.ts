import Decimal from "decimal.js";
import type { AcquisitionTaxInput } from "./calculate";

export type AcquisitionTaxValues = Record<
  | "acquisitionPrice"
  | "acquisitionTaxRate"
  | "localEducationTaxRate"
  | "ruralSpecialTaxRate"
  | "otherCosts",
  string
>;
export type AcquisitionTaxErrors = Partial<
  Record<keyof AcquisitionTaxValues, string>
>;
const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateAcquisitionTax(
  values: AcquisitionTaxValues,
  locale: "ko" | "en",
): { data?: AcquisitionTaxInput; errors: AcquisitionTaxErrors } {
  const errors: AcquisitionTaxErrors = {};
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const number = (value: string) =>
    NUMBER.test(value.trim()) ? new Decimal(value) : null;
  const acquisitionPrice = money(values.acquisitionPrice);
  const acquisitionTaxRate = number(values.acquisitionTaxRate);
  const localEducationTaxRate = number(values.localEducationTaxRate);
  const ruralSpecialTaxRate = number(values.ruralSpecialTaxRate);
  const otherCosts = money(values.otherCosts);
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);

  if (
    !acquisitionPrice ||
    acquisitionPrice.lte(0) ||
    acquisitionPrice.gt(1_000_000_000_000)
  )
    errors.acquisitionPrice = message(
      "0보다 크고 1조 원 이하인 취득가액을 입력해 주세요.",
      "Enter an acquisition price greater than zero and no more than KRW 1 trillion.",
    );
  const validateRate = (
    value: Decimal | null,
    key: "acquisitionTaxRate" | "localEducationTaxRate" | "ruralSpecialTaxRate",
  ) => {
    if (!value || value.lt(0) || value.gt(100))
      errors[key] = message(
        "0% 이상 100% 이하의 세율을 입력해 주세요.",
        "Enter a rate from 0% to 100%.",
      );
  };
  validateRate(acquisitionTaxRate, "acquisitionTaxRate");
  validateRate(localEducationTaxRate, "localEducationTaxRate");
  validateRate(ruralSpecialTaxRate, "ruralSpecialTaxRate");
  if (!otherCosts || otherCosts.lt(0) || otherCosts.gt(1_000_000_000_000))
    errors.otherCosts = message(
      "0원 이상 1조 원 이하인 기타 비용을 입력해 주세요.",
      "Enter other costs from zero to KRW 1 trillion.",
    );

  return Object.keys(errors).length ||
    !acquisitionPrice ||
    !acquisitionTaxRate ||
    !localEducationTaxRate ||
    !ruralSpecialTaxRate ||
    !otherCosts
    ? { errors }
    : {
        errors,
        data: {
          acquisitionPrice,
          acquisitionTaxRate,
          localEducationTaxRate,
          ruralSpecialTaxRate,
          otherCosts,
        },
      };
}

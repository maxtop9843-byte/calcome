import Decimal from "decimal.js";
import type { JeonseLoanInterestInput } from "./calculate";

export type JeonseLoanInterestValues = Record<
  "deposit" | "ownFunds" | "annualRate" | "termYears" | "monthlyFees",
  string
>;
export type JeonseLoanInterestErrors = Partial<
  Record<keyof JeonseLoanInterestValues, string>
>;

const MONEY = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
const NUMBER = /^\d+(?:\.\d+)?$/;

export function validateJeonseLoanInterest(
  values: JeonseLoanInterestValues,
  locale: "ko" | "en",
): { data?: JeonseLoanInterestInput; errors: JeonseLoanInterestErrors } {
  const errors: JeonseLoanInterestErrors = {};
  const message = (ko: string, en: string) => (locale === "ko" ? ko : en);
  const money = (value: string) =>
    MONEY.test(value.trim()) ? new Decimal(value.replaceAll(",", "")) : null;
  const deposit = money(values.deposit);
  const ownFunds = money(values.ownFunds);
  const monthlyFees = money(values.monthlyFees);
  const annualRate = NUMBER.test(values.annualRate.trim())
    ? new Decimal(values.annualRate)
    : null;
  const termYears = /^\d+$/.test(values.termYears.trim())
    ? Number(values.termYears)
    : null;

  if (!deposit || deposit.lte(0) || deposit.gt(10_000_000_000_000))
    errors.deposit = message(
      "0원보다 크고 10조 원 이하인 전세보증금을 입력해 주세요.",
      "Enter a deposit greater than zero and no more than KRW 10 trillion.",
    );
  if (!ownFunds || ownFunds.lt(0) || (deposit && ownFunds.gte(deposit)))
    errors.ownFunds = message(
      "0원 이상이고 전세보증금보다 적은 자기자금을 입력해 주세요.",
      "Enter own funds from zero up to, but not including, the deposit.",
    );
  if (!annualRate || annualRate.lt(0) || annualRate.gt(100))
    errors.annualRate = message(
      "0% 이상 100% 이하의 연이율을 입력해 주세요.",
      "Enter an annual rate from 0% to 100%.",
    );
  if (!termYears || termYears < 1 || termYears > 20)
    errors.termYears = message(
      "1년 이상 20년 이하의 기간을 입력해 주세요.",
      "Enter a term from 1 to 20 years.",
    );
  if (!monthlyFees || monthlyFees.lt(0) || monthlyFees.gt(100_000_000))
    errors.monthlyFees = message(
      "0원 이상 1억 원 이하의 월 부대비용을 입력해 주세요.",
      "Enter monthly fees from zero to KRW 100 million.",
    );

  return Object.keys(errors).length ||
    !deposit ||
    !ownFunds ||
    !annualRate ||
    !termYears ||
    !monthlyFees
    ? { errors }
    : {
        errors,
        data: { deposit, ownFunds, annualRate, termYears, monthlyFees },
      };
}

import Decimal from "decimal.js";
import type { NightWorkInput, WorkplaceSize } from "./calculate";

export type Values = {
  hourlyWage: string;
  nightHours: string;
  premiumRate: string;
  workplaceSize: string;
};
export type Errors = Partial<Record<keyof Values, string>>;

const N = /^\d+(?:\.\d+)?$/;
const M = /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

export function validateNightWorkPay(
  v: Values,
  l: "ko" | "en",
): { data?: NightWorkInput; errors: Errors } {
  const errors: Errors = {};
  const workplaceSize: WorkplaceSize | undefined =
    v.workplaceSize === "fiveOrMore" || v.workplaceSize === "underFive"
      ? v.workplaceSize
      : undefined;
  const wt = v.hourlyWage.trim();
  const ht = v.nightHours.trim();
  const rt = v.premiumRate.trim();
  const w = M.test(wt) ? new Decimal(wt.replaceAll(",", "")) : null;
  const h = N.test(ht) ? new Decimal(ht) : null;
  const r = N.test(rt) ? new Decimal(rt) : null;

  if (!w || w.lte(0) || w.gt(10_000_000)) {
    errors.hourlyWage =
      l === "ko"
        ? "0보다 큰 올바른 시급을 입력해 주세요."
        : "Enter a valid hourly wage greater than zero.";
  }
  if (!h || h.lte(0) || h.gt(168)) {
    errors.nightHours =
      l === "ko"
        ? "0보다 크고 168시간 이하로 입력해 주세요."
        : "Enter more than 0 and no more than 168 hours.";
  }
  if (!workplaceSize) {
    errors.workplaceSize =
      l === "ko" ? "사업장 규모를 선택해 주세요." : "Select a workplace size.";
  }
  if (
    !r ||
    r.lt(0) ||
    r.gt(200) ||
    (workplaceSize === "fiveOrMore" && r.lt(50))
  ) {
    errors.premiumRate =
      l === "ko"
        ? workplaceSize === "fiveOrMore"
          ? "상시 5인 이상 사업장은 50~200% 가산율을 입력해 주세요."
          : "0~200% 범위로 입력해 주세요."
        : workplaceSize === "fiveOrMore"
          ? "At workplaces with five or more employees, enter a premium from 50% to 200%."
          : "Enter a premium from 0% to 200%.";
  }

  return Object.keys(errors).length || !w || !h || !r || !workplaceSize
    ? { errors }
    : {
        errors,
        data: {
          hourlyWage: w,
          nightHours: h,
          premiumRate: r,
          workplaceSize,
        },
      };
}

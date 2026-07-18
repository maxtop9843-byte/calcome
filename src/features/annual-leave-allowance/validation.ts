import Decimal from "decimal.js";
import type { AnnualLeaveInput } from "./calculate";

const WHOLE_NUMBER = /^\d+$/;

export function validateAnnualLeaveAllowance(
  values: {
    completedYears: string;
    attendanceAtLeast80: boolean;
    fullAttendanceMonths: string;
    usedDays: string;
    hourlyWage: string;
    dailyHours: string;
  },
  locale: "ko" | "en",
): { data?: AnnualLeaveInput; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const completedYears = WHOLE_NUMBER.test(values.completedYears)
    ? Number(values.completedYears)
    : NaN;
  const fullAttendanceMonths = WHOLE_NUMBER.test(values.fullAttendanceMonths)
    ? Number(values.fullAttendanceMonths)
    : NaN;
  const usedDays = WHOLE_NUMBER.test(values.usedDays)
    ? Number(values.usedDays)
    : NaN;
  const hourlyWage = /^\d+(?:\.\d+)?$/.test(values.hourlyWage)
    ? new Decimal(values.hourlyWage)
    : null;
  const dailyHours = /^\d+(?:\.\d+)?$/.test(values.dailyHours)
    ? new Decimal(values.dailyHours)
    : null;
  if (
    !Number.isInteger(completedYears) ||
    completedYears < 0 ||
    completedYears > 50
  )
    errors.completedYears =
      locale === "ko"
        ? "완료한 근속연수를 0~50 사이의 정수로 입력해 주세요."
        : "Enter completed service years from 0 to 50.";
  if (
    !Number.isInteger(fullAttendanceMonths) ||
    fullAttendanceMonths < 0 ||
    fullAttendanceMonths > 12
  )
    errors.fullAttendanceMonths =
      locale === "ko"
        ? "개근한 달 수를 0~12 사이의 정수로 입력해 주세요."
        : "Enter full-attendance months from 0 to 12.";
  if (!Number.isInteger(usedDays) || usedDays < 0 || usedDays > 365)
    errors.usedDays =
      locale === "ko"
        ? "사용한 연차 일수를 0~365 사이의 정수로 입력해 주세요."
        : "Enter used leave days from 0 to 365.";
  if (!hourlyWage || hourlyWage.lte(0) || hourlyWage.gt(10_000_000))
    errors.hourlyWage =
      locale === "ko"
        ? "통상시급을 올바르게 입력해 주세요."
        : "Enter a valid ordinary hourly wage.";
  if (!dailyHours || dailyHours.lte(0) || dailyHours.gt(24))
    errors.dailyHours =
      locale === "ko"
        ? "1일 소정근로시간을 0 초과 24 이하로 입력해 주세요."
        : "Enter daily scheduled hours above 0 and up to 24.";
  return Object.keys(errors).length || !hourlyWage || !dailyHours
    ? { errors }
    : {
        errors,
        data: {
          completedYears,
          attendanceAtLeast80: values.attendanceAtLeast80,
          fullAttendanceMonths,
          usedDays,
          hourlyWage,
          dailyHours,
        },
      };
}

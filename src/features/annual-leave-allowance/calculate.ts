import Decimal from "decimal.js";

export type AnnualLeaveInput = {
  completedYears: number;
  attendanceAtLeast80: boolean;
  fullAttendanceMonths: number;
  usedDays: number;
  hourlyWage: Decimal;
  dailyHours: Decimal;
};

export function calculateAnnualLeaveAllowance(input: AnnualLeaveInput) {
  const grantedDays =
    input.completedYears < 1
      ? Math.min(input.fullAttendanceMonths, 11)
      : input.attendanceAtLeast80
        ? Math.min(15 + Math.floor((input.completedYears - 1) / 2), 25)
        : Math.min(input.fullAttendanceMonths, 12);

  const remainingDays = Math.max(grantedDays - input.usedDays, 0);
  return {
    grantedDays,
    seniorityDays:
      input.completedYears >= 1 && input.attendanceAtLeast80
        ? grantedDays - 15
        : 0,
    remainingDays,
    dailyOrdinaryWage: input.hourlyWage.mul(input.dailyHours),
    estimatedAllowance: input.hourlyWage
      .mul(input.dailyHours)
      .mul(remainingDays),
  };
}

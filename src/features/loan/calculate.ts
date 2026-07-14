import Decimal from "decimal.js";

import type { LoanInput, LoanResult, LoanScheduleRow } from "./types";

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export function calculateLoan(input: LoanInput): LoanResult {
  const principal = new Decimal(input.loanAmount);
  const monthlyRate = new Decimal(input.annualInterestRate).div(100).div(12);
  const periods = input.months;
  const schedule: LoanScheduleRow[] = [];
  let balance = principal;
  let totalInterest = new Decimal(0);

  const equalPayment = monthlyRate.isZero()
    ? principal.div(periods)
    : principal
        .mul(monthlyRate)
        .mul(monthlyRate.plus(1).pow(periods))
        .div(monthlyRate.plus(1).pow(periods).minus(1));
  const equalPrincipal = principal.div(periods);

  for (let month = 1; month <= periods; month += 1) {
    const interest = balance.mul(monthlyRate);
    let principalPayment: Decimal;
    let payment: Decimal;

    if (input.repaymentType === "equal-payment") {
      principalPayment =
        month === periods ? balance : equalPayment.minus(interest);
      payment = principalPayment.plus(interest);
    } else if (input.repaymentType === "equal-principal") {
      principalPayment = month === periods ? balance : equalPrincipal;
      payment = principalPayment.plus(interest);
    } else {
      principalPayment = month === periods ? balance : new Decimal(0);
      payment = principalPayment.plus(interest);
    }

    balance = balance.minus(principalPayment);
    if (balance.abs().lt("1e-24")) balance = new Decimal(0);
    totalInterest = totalInterest.plus(interest);
    schedule.push({
      month,
      payment: payment.toString(),
      principal: principalPayment.toString(),
      interest: interest.toString(),
      remainingBalance: balance.toString(),
    });
  }

  const firstPayment = new Decimal(schedule[0].payment);
  const lastPayment = new Decimal(schedule.at(-1)!.payment);
  const totalRepayment = principal.plus(totalInterest);
  const summary =
    input.repaymentType === "equal-payment"
      ? `${periods}개월 동안 매월 같은 금액을 납부하는 방식입니다.`
      : input.repaymentType === "equal-principal"
        ? `첫 달 납부액이 가장 크고 매월 이자가 줄어 마지막 달 납부액까지 감소합니다.`
        : `${periods - 1}개월 동안 이자만 내고 마지막 달에 원금 전액과 이자를 함께 상환합니다.`;

  return {
    monthlyPayment: firstPayment.toString(),
    lastMonthlyPayment: lastPayment.toString(),
    totalRepayment: totalRepayment.toString(),
    totalInterest: totalInterest.toString(),
    schedule,
    summary,
  };
}

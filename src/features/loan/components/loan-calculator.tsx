"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateLoan } from "../calculate";
import { DEFAULT_LOAN_VALUES } from "../constants";
import { formatLoanWon } from "../format";
import type {
  LoanField,
  LoanFormValues,
  LoanResult,
  LoanValidationErrors,
} from "../types";
import { validateLoanForm } from "../validation";

const INITIAL_LOAN_VALUES: LoanFormValues = {
  ...DEFAULT_LOAN_VALUES,
  loanAmount: "",
  annualInterestRate: "",
  loanPeriod: "",
};

const controlClass =
  "mt-2 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

type NumberFieldProps = {
  field: LoanField;
  label: string;
  value: string;
  unit: string;
  help: string;
  error?: string;
  placeholder: string;
  money?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

function NumberField({
  field,
  label,
  value,
  unit,
  help,
  error,
  placeholder,
  money = false,
  onChange,
  onBlur,
}: NumberFieldProps) {
  const describedBy = `${field}-help${error ? ` ${field}-error` : ""}`;
  return (
    <div>
      <label htmlFor={field} className="text-sm font-medium">
        {label} <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <input
          id={field}
          name={field}
          value={value}
          onChange={(event) => {
            if (money)
              event.target.value = formatMoneyInput(event.target.value, value);
            onChange(event);
          }}
          placeholder={placeholder}
          onBlur={onBlur}
          inputMode="decimal"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${controlClass} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-2 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      <p
        id={`${field}-help`}
        className="mt-1.5 text-xs leading-5 text-muted-foreground"
      >
        {help}
      </p>
      {error ? (
        <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LoanCalculator() {
  const [values, setValues] = useState<LoanFormValues>(INITIAL_LOAN_VALUES);
  const [errors, setErrors] = useState<LoanValidationErrors>({});
  const [result, setResult] = useState<LoanResult | null>(null);
  const [repaymentType, setRepaymentType] = useState(values.repaymentType);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue(field: LoanField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: LoanField) {
    const validation = validateLoanForm(values);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateLoanForm(values);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateLoan(validation.data);
    setResult(next);
    setRepaymentType(validation.data.repaymentType);
    setAnnouncement(
      `계산이 완료되었습니다. 첫 달 납부액은 ${formatLoanWon(next.monthlyPayment)}입니다.`,
    );
  }

  const showSchedule = repaymentType !== "bullet";
  const monthlyLabel =
    repaymentType === "equal-principal"
      ? "첫 달 납부액"
      : repaymentType === "bullet"
        ? "매월 이자 납부액"
        : "월 납부액";

  return (
    <section aria-labelledby="loan-calculator-title" className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
        >
          <p className="text-sm font-semibold text-primary">입력</p>
          <h2
            id="loan-calculator-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            대출 조건 설정
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            대출 원금, 고정 연이율과 기간을 기준으로 상환 방식별 예상 비용을
            계산합니다.
          </p>
          {Object.keys(errors).length ? (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
            >
              입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.
            </div>
          ) : null}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <NumberField
              field="loanAmount"
              label="대출 금액"
              value={values.loanAmount}
              unit="원"
              help="실제로 빌릴 원금"
              error={errors.loanAmount}
              placeholder="예: 100,000,000"
              money
              onChange={(e) => updateValue("loanAmount", e.target.value)}
              onBlur={() => validateField("loanAmount")}
            />
            <NumberField
              field="annualInterestRate"
              label="연 이자율"
              value={values.annualInterestRate}
              unit="%"
              help="기간 동안 고정된다고 가정하는 명목 연이율"
              error={errors.annualInterestRate}
              placeholder="예: 4.5"
              onChange={(e) =>
                updateValue("annualInterestRate", e.target.value)
              }
              onBlur={() => validateField("annualInterestRate")}
            />
            <NumberField
              field="loanPeriod"
              label="대출 기간"
              value={values.loanPeriod}
              unit={values.periodUnit === "years" ? "년" : "개월"}
              help="최대 100년 또는 1,200개월"
              error={errors.loanPeriod}
              placeholder="예: 30"
              onChange={(e) => updateValue("loanPeriod", e.target.value)}
              onBlur={() => validateField("loanPeriod")}
            />
            <div>
              <label htmlFor="periodUnit" className="text-sm font-medium">
                기간 단위 <span className="text-destructive">*</span>
              </label>
              <select
                id="periodUnit"
                value={values.periodUnit}
                onChange={(e) => updateValue("periodUnit", e.target.value)}
                className={controlClass}
              >
                <option value="years">년</option>
                <option value="months">개월</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="repaymentType" className="text-sm font-medium">
                상환 방식 <span className="text-destructive">*</span>
              </label>
              <select
                id="repaymentType"
                value={values.repaymentType}
                onChange={(e) => updateValue("repaymentType", e.target.value)}
                className={controlClass}
              >
                <option value="equal-payment">원리금균등</option>
                <option value="equal-principal">원금균등</option>
                <option value="bullet">만기일시상환</option>
              </select>
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 h-11 w-full px-5">
            상환 결과 계산하기
          </Button>
        </form>

        <section
          aria-labelledby="loan-result-title"
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:sticky lg:top-6"
        >
          <p className="text-sm font-semibold text-primary">예상 결과</p>
          <h2
            id="loan-result-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            {result ? monthlyLabel : "상환 계산 결과"}
          </h2>
          {result ? (
            <>
              <p className="mt-4 break-words text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {formatLoanWon(result.monthlyPayment)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                금리와 상환 조건이 변하지 않는다는 가정의 원 단위 추정치입니다.
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-background p-4">
                  <dt className="text-xs text-muted-foreground">총 상환액</dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {formatLoanWon(result.totalRepayment)}
                  </dd>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <dt className="text-xs text-muted-foreground">총 이자</dt>
                  <dd className="mt-1 font-semibold tabular-nums">
                    {formatLoanWon(result.totalInterest)}
                  </dd>
                </div>
                {repaymentType === "equal-principal" ? (
                  <div className="rounded-xl border bg-background p-4 sm:col-span-2">
                    <dt className="text-xs text-muted-foreground">
                      마지막 달 납부액
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatLoanWon(result.lastMonthlyPayment)}
                    </dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                <p className="font-medium">실질 상환 요약</p>
                <p className="mt-1 text-muted-foreground">{result.summary}</p>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-sm leading-6 text-muted-foreground">
              대출 조건을 입력하고 계산하면 월 납부액과 총 이자, 상환 요약을
              확인할 수 있습니다.
            </div>
          )}
        </section>
      </div>

      {result && showSchedule ? (
        <section className="rounded-2xl border bg-card p-5 sm:p-7">
          <h2 className="text-2xl font-semibold tracking-tight">
            월별 상환 일정
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            내부 계산은 반올림하지 않고, 표의 금액만 원 단위로 반올림합니다.
          </p>
          <div className="mt-5 max-h-[36rem] overflow-auto rounded-xl border">
            <table className="w-full min-w-[720px] border-collapse text-right text-sm tabular-nums">
              <caption className="sr-only">
                월별 대출 원금과 이자 상환 일정
              </caption>
              <thead className="sticky top-0 bg-muted">
                <tr>
                  {["회차", "납부액", "원금", "이자", "남은 원금"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b px-4 py-3 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month} className="border-b last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium">
                      {row.month}회
                    </th>
                    <td className="px-4 py-3">{formatLoanWon(row.payment)}</td>
                    <td className="px-4 py-3">
                      {formatLoanWon(row.principal)}
                    </td>
                    <td className="px-4 py-3">{formatLoanWon(row.interest)}</td>
                    <td className="px-4 py-3">
                      {formatLoanWon(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </section>
  );
}

"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateSavings } from "../calculate";
import { DEFAULT_SAVINGS_VALUES, GENERAL_SAVINGS_TAX_RATE } from "../constants";
import { formatSavingsPercent, formatSavingsWon } from "../format";
import type {
  SavingsField,
  SavingsFormValues,
  SavingsResult,
  SavingsValidationErrors,
} from "../types";
import { validateSavingsForm } from "../validation";

const INITIAL_SAVINGS_VALUES: SavingsFormValues = {
  ...DEFAULT_SAVINGS_VALUES,
  regularDeposit: "",
  savingsPeriod: "",
  annualInterestRate: "",
};

const controlClass =
  "mt-2 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

type NumberFieldProps = {
  field: SavingsField;
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

export function SavingsCalculator() {
  const [values, setValues] = useState<SavingsFormValues>(
    INITIAL_SAVINGS_VALUES,
  );
  const [errors, setErrors] = useState<SavingsValidationErrors>({});
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [appliedValues, setAppliedValues] = useState(DEFAULT_SAVINGS_VALUES);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue(field: SavingsField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: SavingsField) {
    const validation = validateSavingsForm(values);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateSavingsForm(values);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateSavings(validation.data);
    setResult(next);
    setAppliedValues(values);
    setAnnouncement(
      `계산이 완료되었습니다. 예상 세후 만기액은 ${formatSavingsWon(next.maturityAfterTax)}입니다.`,
    );
  }

  const appliedTaxRate =
    appliedValues.taxOption === "tax-free"
      ? "0"
      : appliedValues.taxOption === "general"
        ? GENERAL_SAVINGS_TAX_RATE
        : appliedValues.customTaxRate;

  return (
    <section aria-labelledby="savings-calculator-title" className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
        >
          <p className="text-sm font-semibold text-primary">입력</p>
          <h2
            id="savings-calculator-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            적금 조건 설정
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            별표(*) 항목은 필수입니다. 금리와 납입액이 전체 기간 동안 유지된다고
            가정합니다.
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
              field="regularDeposit"
              label="정기 납입액"
              value={values.regularDeposit}
              unit="원"
              help="선택한 주기마다 넣는 고정 금액"
              error={errors.regularDeposit}
              placeholder="예: 100,000"
              money
              onChange={(e) => updateValue("regularDeposit", e.target.value)}
              onBlur={() => validateField("regularDeposit")}
            />
            <div>
              <label htmlFor="depositFrequency" className="text-sm font-medium">
                납입 주기 <span className="text-destructive">*</span>
              </label>
              <select
                id="depositFrequency"
                value={values.depositFrequency}
                onChange={(e) =>
                  updateValue("depositFrequency", e.target.value)
                }
                className={controlClass}
              >
                <option value="monthly">매월</option>
                <option value="yearly">매년</option>
              </select>
            </div>
            <NumberField
              field="savingsPeriod"
              label="저축 기간"
              value={values.savingsPeriod}
              unit={values.periodUnit === "years" ? "년" : "개월"}
              help="최대 100년 또는 1,200개월"
              error={errors.savingsPeriod}
              placeholder="예: 1"
              onChange={(e) => updateValue("savingsPeriod", e.target.value)}
              onBlur={() => validateField("savingsPeriod")}
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
            <NumberField
              field="annualInterestRate"
              label="연 이자율"
              value={values.annualInterestRate}
              unit="%"
              help="우대금리를 포함해 직접 확인한 연이율"
              error={errors.annualInterestRate}
              placeholder="예: 3.5"
              onChange={(e) =>
                updateValue("annualInterestRate", e.target.value)
              }
              onBlur={() => validateField("annualInterestRate")}
            />
            <div>
              <label htmlFor="interestMethod" className="text-sm font-medium">
                이자 방식 <span className="text-destructive">*</span>
              </label>
              <select
                id="interestMethod"
                value={values.interestMethod}
                onChange={(e) => updateValue("interestMethod", e.target.value)}
                className={controlClass}
              >
                <option value="simple">단리</option>
                <option value="compound">월복리</option>
              </select>
            </div>
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">납입 시점</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                ["end", "기간 말"],
                ["beginning", "기간 초"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="depositTiming"
                    value={value}
                    checked={values.depositTiming === value}
                    onChange={(e) =>
                      updateValue("depositTiming", e.target.value)
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-sm font-medium">세금 옵션</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                ["general", `일반과세 ${GENERAL_SAVINGS_TAX_RATE}%`],
                ["tax-free", "비과세"],
                ["custom", "사용자 지정"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="taxOption"
                    value={value}
                    checked={values.taxOption === value}
                    onChange={(e) => updateValue("taxOption", e.target.value)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              일반과세는 이자소득세 14%와 지방소득세 1.4%를 합친 간이
              추정입니다.
            </p>
          </fieldset>

          {values.taxOption === "custom" ? (
            <div className="mt-5">
              <NumberField
                field="customTaxRate"
                label="사용자 지정 간이 세율"
                value={values.customTaxRate}
                unit="%"
                help="상품에 적용되는 세율을 직접 입력하세요."
                error={errors.customTaxRate}
                placeholder="예: 15.4"
                onChange={(e) => updateValue("customTaxRate", e.target.value)}
                onBlur={() => validateField("customTaxRate")}
              />
            </div>
          ) : null}
          <Button type="submit" size="lg" className="mt-6 h-11 w-full px-5">
            만기 결과 계산하기
          </Button>
        </form>

        <section
          aria-labelledby="savings-result-title"
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:sticky lg:top-6"
        >
          <p className="text-sm font-semibold text-primary">예상 결과</p>
          <h2
            id="savings-result-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            예상 세후 만기액
          </h2>
          {result ? (
            <>
              <p className="mt-4 break-words text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {formatSavingsWon(result.maturityAfterTax)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                고정 조건을 가정한 수학적 추정치이며 특정 은행 상품의 실제
                수령액이 아닙니다.
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["총 납입 원금", result.totalPrincipal],
                  ["세전 이자", result.grossInterest],
                  ["예상 세금", result.estimatedTax],
                  ["예상 세후 이자", result.afterTaxInterest],
                  ["세전 만기액", result.maturityBeforeTax],
                  ["세후 만기액", result.maturityAfterTax],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border bg-background p-4"
                  >
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatSavingsWon(value)}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                <p className="font-medium">실효 수익 요약</p>
                <p className="mt-1 text-muted-foreground">
                  총 {result.depositCount}회 납입 · 납입 원금 대비 세후 이자{" "}
                  {formatSavingsPercent(result.effectiveReturnRate)} · 적용 간이
                  세율 {appliedTaxRate}%
                </p>
                <p className="mt-1 text-muted-foreground">
                  {appliedValues.interestMethod === "simple"
                    ? "단리"
                    : "월복리"}{" "}
                  ·{" "}
                  {appliedValues.depositTiming === "beginning"
                    ? "기간 초 납입"
                    : "기간 말 납입"}
                </p>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-sm leading-6 text-muted-foreground">
              납입액과 기간, 이자율을 입력하면 예상 만기액과 이자 내역을 확인할
              수 있습니다.
            </div>
          )}
        </section>
      </div>

      {result ? (
        <section className="rounded-2xl border bg-card p-5 sm:p-7">
          <h2 className="text-2xl font-semibold tracking-tight">
            월별 만기 형성 내역
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            이자는 계산 정밀도를 유지하고 화면의 금액만 원 단위로 반올림합니다.
          </p>
          <div className="mt-5 max-h-[36rem] overflow-auto rounded-xl border">
            <table className="w-full min-w-[720px] border-collapse text-right text-sm tabular-nums">
              <caption className="sr-only">
                월별 적금 납입액과 이자 및 세전 잔액
              </caption>
              <thead className="sticky top-0 bg-muted">
                <tr>
                  {[
                    "기간",
                    "납입액",
                    "해당 월 이자",
                    "누적 원금",
                    "세전 잔액",
                  ].map((h) => (
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
                      {row.month}개월
                    </th>
                    <td className="px-4 py-3">
                      {formatSavingsWon(row.deposit)}
                    </td>
                    <td className="px-4 py-3">
                      {formatSavingsWon(row.interest)}
                    </td>
                    <td className="px-4 py-3">
                      {formatSavingsWon(row.cumulativePrincipal)}
                    </td>
                    <td className="px-4 py-3">
                      {formatSavingsWon(row.grossBalance)}
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

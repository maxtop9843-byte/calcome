"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  CalculatorActions,
  PrimaryResults,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateDeposit } from "../calculate";
import {
  DEFAULT_DEPOSIT_VALUES,
  GENERAL_INTEREST_TAX_RATE,
} from "../constants";
import { formatDepositPercent, formatDepositWon } from "../format";
import type {
  DepositField,
  DepositFormValues,
  DepositResult,
  DepositValidationErrors,
} from "../types";
import { validateDepositForm } from "../validation";

const INITIAL_DEPOSIT_VALUES: DepositFormValues = {
  ...DEFAULT_DEPOSIT_VALUES,
  depositAmount: "",
  depositPeriod: "",
  annualInterestRate: "",
};

const controlClass =
  "mt-2 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

type NumberFieldProps = {
  field: DepositField;
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

export function DepositCalculator() {
  const [values, setValues] = useState<DepositFormValues>(
    INITIAL_DEPOSIT_VALUES,
  );
  const [errors, setErrors] = useState<DepositValidationErrors>({});
  const [result, setResult] = useState<DepositResult | null>(null);
  const [appliedValues, setAppliedValues] = useState(DEFAULT_DEPOSIT_VALUES);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue(field: DepositField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: DepositField) {
    const validation = validateDepositForm(values);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateDepositForm(values);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateDeposit(validation.data);
    setResult(next);
    setAppliedValues(values);
    setAnnouncement(
      `계산이 완료되었습니다. 예상 세후 만기액은 ${formatDepositWon(next.maturityAfterTax)}입니다.`,
    );
  }

  function reset() {
    setValues(INITIAL_DEPOSIT_VALUES);
    setErrors({});
    setResult(null);
    setAppliedValues(DEFAULT_DEPOSIT_VALUES);
    setAnnouncement("입력값과 계산 결과를 초기화했습니다.");
  }

  const appliedTaxRate =
    appliedValues.taxOption === "tax-free"
      ? "0"
      : appliedValues.taxOption === "general"
        ? GENERAL_INTEREST_TAX_RATE
        : appliedValues.customTaxRate;

  return (
    <section aria-labelledby="deposit-calculator-title">
      <div className={calculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          className={calculatorSettingsClass}
        >
          <p className="text-sm font-semibold text-primary">입력</p>
          <h2
            id="deposit-calculator-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            예금 조건 설정
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            별표(*) 항목은 필수입니다. 원금을 만기까지 한 번에 예치한다고
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
            <div className="sm:col-span-2">
              <NumberField
                field="depositAmount"
                label="예치 금액"
                value={values.depositAmount}
                unit="원"
                help="만기까지 한 번에 맡길 원금"
                error={errors.depositAmount}
                placeholder="예: 10,000,000"
                money
                onChange={(e) => updateValue("depositAmount", e.target.value)}
                onBlur={() => validateField("depositAmount")}
              />
            </div>
            <NumberField
              field="depositPeriod"
              label="예치 기간"
              value={values.depositPeriod}
              unit={values.periodUnit === "years" ? "년" : "개월"}
              help="최대 100년 또는 1,200개월"
              error={errors.depositPeriod}
              placeholder="예: 1"
              onChange={(e) => updateValue("depositPeriod", e.target.value)}
              onBlur={() => validateField("depositPeriod")}
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
              help="기간 동안 고정된다고 가정하는 명목 연이율"
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
            <legend className="text-sm font-medium">세금 옵션</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                ["general", `일반과세 ${GENERAL_INTEREST_TAX_RATE}%`],
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
              일반과세는 소득세 14%와 개인지방소득세 1.4%를 합친 간이
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
          <CalculatorActions submitLabel="만기 결과 계산하기" onReset={reset} />
        </form>

        <section
          aria-labelledby="deposit-result-title"
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
        >
          <p className="text-sm font-semibold text-primary">예상 결과</p>
          <h2
            id="deposit-result-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            예상 세후 만기액
          </h2>
          {result ? (
            <>
              <PrimaryResults
                metrics={[
                  {
                    label: "세후 만기액",
                    value: formatDepositWon(result.maturityAfterTax),
                    featured: true,
                  },
                  { label: "원금", value: formatDepositWon(result.principal) },
                  {
                    label: "세후 이자",
                    value: formatDepositWon(result.afterTaxInterest),
                  },
                ]}
              />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                고정 조건을 가정한 추정치이며 특정 금융상품의 실제 지급액이
                아닙니다.
              </p>
              <div className="mt-6 rounded-xl border bg-muted/20 p-4">
                <h3 className="font-medium">추가 결과</h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    ["세전 이자", result.grossInterest],
                    ["예상 세금", result.estimatedTax],
                    ["세전 만기액", result.maturityBeforeTax],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border bg-background p-4"
                    >
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatDepositWon(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                <p className="font-medium">실효 수익</p>
                <p className="mt-1 text-muted-foreground">
                  원금 대비 세후 이자{" "}
                  {formatDepositPercent(result.effectiveReturnRate)} · 적용 간이
                  세율 {appliedTaxRate}%
                </p>
                <p className="mt-1 text-muted-foreground">
                  {appliedValues.interestMethod === "simple"
                    ? "단리"
                    : "월복리"}{" "}
                  · {appliedValues.depositPeriod}
                  {appliedValues.periodUnit === "years" ? "년" : "개월"}
                </p>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-sm leading-6 text-muted-foreground">
              예치 금액과 기간, 이자율을 입력하면 세전·세후 만기액을 확인할 수
              있습니다.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

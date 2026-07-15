"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  CalculatorActions,
  PrimaryResults,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateCagr } from "../calculate";
import { DEFAULT_CAGR_VALUES } from "../constants";
import {
  describeAnnualizedGrowth,
  formatCagrPercent,
  formatCagrWon,
} from "../format";
import type {
  CagrField,
  CagrFormValues,
  CagrResult,
  CagrValidationErrors,
} from "../types";
import { validateCagrForm } from "../validation";

const INITIAL_CAGR_VALUES: CagrFormValues = {
  ...DEFAULT_CAGR_VALUES,
  initialValue: "",
  finalValue: "",
  investmentPeriod: "",
};

const controlClass =
  "mt-2 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

type NumberFieldProps = {
  field: CagrField;
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

export function CagrCalculator() {
  const [values, setValues] = useState<CagrFormValues>(INITIAL_CAGR_VALUES);
  const [errors, setErrors] = useState<CagrValidationErrors>({});
  const [result, setResult] = useState<CagrResult | null>(null);
  const [appliedValues, setAppliedValues] = useState(DEFAULT_CAGR_VALUES);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue(field: CagrField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: CagrField) {
    const validation = validateCagrForm(values);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateCagrForm(values);
    setErrors(validation.errors);
    setAnnouncement("");
    if (!validation.data) {
      const first = Object.keys(validation.errors)[0];
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus(),
      );
      return;
    }
    const next = calculateCagr(validation.data);
    setResult(next);
    setAppliedValues(values);
    setAnnouncement(
      `계산이 완료되었습니다. 연평균 복합성장률은 ${formatCagrPercent(next.cagrPercent)}입니다.`,
    );
  }
  function reset() {
    setValues(INITIAL_CAGR_VALUES);
    setErrors({});
    setResult(null);
    setAppliedValues(DEFAULT_CAGR_VALUES);
    setAnnouncement("입력값과 계산 결과를 초기화했습니다.");
  }

  return (
    <section aria-labelledby="cagr-calculator-title">
      <div className={calculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          className={calculatorSettingsClass}
        >
          <p className="text-sm font-semibold text-primary">입력</p>
          <h2
            id="cagr-calculator-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            투자 성과 설정
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            별표(*) 항목은 필수입니다. 추가 현금흐름이 없는 두 시점의 값을
            입력하세요.
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
              field="initialValue"
              label="시작값"
              value={values.initialValue}
              unit="원"
              help="투자나 지표의 최초 평가액"
              error={errors.initialValue}
              placeholder="예: 10,000,000"
              money
              onChange={(event) =>
                updateValue("initialValue", event.target.value)
              }
              onBlur={() => validateField("initialValue")}
            />
            <NumberField
              field="finalValue"
              label="종료값"
              value={values.finalValue}
              unit="원"
              help="투자 기간이 끝난 시점의 평가액"
              error={errors.finalValue}
              placeholder="예: 15,000,000"
              money
              onChange={(event) =>
                updateValue("finalValue", event.target.value)
              }
              onBlur={() => validateField("finalValue")}
            />
            <NumberField
              field="investmentPeriod"
              label="투자 기간"
              value={values.investmentPeriod}
              unit={values.periodUnit === "years" ? "년" : "개월"}
              help="최대 100년 또는 1,200개월"
              error={errors.investmentPeriod}
              placeholder="예: 5"
              onChange={(event) =>
                updateValue("investmentPeriod", event.target.value)
              }
              onBlur={() => validateField("investmentPeriod")}
            />
            <div>
              <label htmlFor="periodUnit" className="text-sm font-medium">
                기간 단위 <span className="text-destructive">*</span>
              </label>
              <select
                id="periodUnit"
                value={values.periodUnit}
                onChange={(event) =>
                  updateValue("periodUnit", event.target.value)
                }
                className={controlClass}
              >
                <option value="years">년</option>
                <option value="months">개월</option>
              </select>
            </div>
          </div>
          <CalculatorActions submitLabel="CAGR 계산하기" onReset={reset} />
        </form>

        <section
          aria-labelledby="cagr-result-title"
          className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
        >
          <p className="text-sm font-semibold text-primary">계산 결과</p>
          <h2
            id="cagr-result-title"
            className="mt-1 text-2xl font-semibold tracking-tight"
          >
            연평균 복합성장률(CAGR)
          </h2>
          {result ? (
            <>
              <PrimaryResults
                metrics={[
                  {
                    label: "CAGR",
                    value: formatCagrPercent(result.cagrPercent),
                    featured: true,
                  },
                  {
                    label: "총수익률",
                    value: formatCagrPercent(result.totalReturnPercent),
                  },
                  {
                    label: "절대 손익",
                    value: formatCagrWon(result.absoluteProfit),
                  },
                ]}
              />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                매년 같은 복리 비율로 변했다고 가정한 연환산 값입니다.
              </p>
              <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                <p className="font-medium">연환산 성장 요약</p>
                <p className="mt-1 text-muted-foreground">
                  {describeAnnualizedGrowth(result.cagrPercent)}{" "}
                  {formatCagrPercent(result.cagrPercent)} · 전체 변화{" "}
                  {formatCagrPercent(result.totalReturnPercent)}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {appliedValues.investmentPeriod}
                  {appliedValues.periodUnit === "years"
                    ? "년"
                    : "개월"} 동안 {formatCagrWon(result.absoluteProfit)} 변화
                </p>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-sm leading-6 text-muted-foreground">
              시작값과 종료값, 투자 기간을 입력하면 CAGR과 총수익률을 확인할 수
              있습니다.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import {
  CalculatorActions,
  PrimaryResults,
  calculatorSettingsClass,
  calculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { formatMoneyInput } from "@/lib/input/money";

import { calculateCompoundInterest } from "../calculate";
import { DEFAULT_COMPOUND_INTEREST_VALUES } from "../constants";
import { formatMultiplier, formatPercent, formatWon } from "../format";
import type {
  CompoundInterestField,
  CompoundInterestFormValues,
  CompoundInterestResult,
  ValidationErrors,
} from "../types";
import { validateCompoundInterestForm } from "../validation";
import { CompoundGrowthChart } from "./compound-growth-chart";

const INITIAL_COMPOUND_INTEREST_VALUES: CompoundInterestFormValues = {
  ...DEFAULT_COMPOUND_INTEREST_VALUES,
  initialPrincipal: "",
  recurringContribution: "",
  durationYears: "",
  annualInterestRate: "",
};

const inputClassName =
  "mt-2 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums shadow-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

type NumberFieldProps = {
  field: CompoundInterestField;
  label: string;
  value: string;
  unit: string;
  help?: string;
  error?: string;
  required?: boolean;
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
  required = false,
  placeholder,
  money = false,
  onChange,
  onBlur,
}: NumberFieldProps) {
  const descriptionIds = [
    help ? `${field}-help` : "",
    error ? `${field}-error` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <label htmlFor={field} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
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
          aria-describedby={descriptionIds || undefined}
          className={`${inputClassName} pr-14`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-2 text-sm text-muted-foreground">
          {unit}
        </span>
      </div>
      {help ? (
        <p
          id={`${field}-help`}
          className="mt-1.5 text-xs leading-5 text-muted-foreground"
        >
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${field}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CompoundInterestCalculator() {
  const [values, setValues] = useState<CompoundInterestFormValues>(
    INITIAL_COMPOUND_INTEREST_VALUES,
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<CompoundInterestResult | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function updateValue(field: CompoundInterestField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function validateField(field: CompoundInterestField) {
    const validation = validateCompoundInterestForm(values);
    setErrors((current) => {
      const next = { ...current };
      if (validation.errors[field]) next[field] = validation.errors[field];
      else delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnnouncement("");
    const validation = validateCompoundInterestForm(values);
    setErrors(validation.errors);

    if (!validation.data) {
      const firstField = Object.keys(validation.errors)[0];
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>(`#${firstField}`)?.focus();
      });
      return;
    }

    const nextResult = calculateCompoundInterest(validation.data);
    setResult(nextResult);
    setAnnouncement(
      `계산이 완료되었습니다. 예상 최종 금액은 ${formatWon(nextResult.estimatedFinalBalance)}입니다.`,
    );
  }

  function reset() {
    setValues(INITIAL_COMPOUND_INTEREST_VALUES);
    setErrors({});
    setResult(null);
    setAnnouncement("입력값과 계산 결과를 초기화했습니다.");
  }

  return (
    <section aria-labelledby="calculator-title" className="space-y-8">
      <div className={calculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className={calculatorSettingsClass}
        >
          <div className="mb-6">
            <p className="text-sm font-semibold text-primary">입력</p>
            <h2
              id="calculator-title"
              className="mt-1 text-2xl font-semibold tracking-tight"
            >
              복리 조건 설정
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              별표(*) 항목은 필수입니다. 결과는 입력한 고정 조건을 바탕으로 한
              추정치입니다.
            </p>
          </div>

          {Object.keys(errors).length > 0 ? (
            <div
              role="alert"
              className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
            >
              입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField
              field="initialPrincipal"
              label="초기 원금"
              value={values.initialPrincipal}
              unit="원"
              required
              help="처음 투자하거나 저축하는 금액"
              error={errors.initialPrincipal}
              placeholder="예: 1,000,000"
              money
              onChange={(event) =>
                updateValue("initialPrincipal", event.target.value)
              }
              onBlur={() => validateField("initialPrincipal")}
            />
            <NumberField
              field="recurringContribution"
              label="정기 납입액"
              value={values.recurringContribution}
              unit="원"
              required
              help="선택한 주기마다 추가하는 고정 금액"
              error={errors.recurringContribution}
              placeholder="예: 100,000"
              money
              onChange={(event) =>
                updateValue("recurringContribution", event.target.value)
              }
              onBlur={() => validateField("recurringContribution")}
            />
            <div>
              <label
                htmlFor="contributionFrequency"
                className="text-sm font-medium"
              >
                납입 주기 <span className="text-destructive">*</span>
              </label>
              <select
                id="contributionFrequency"
                value={values.contributionFrequency}
                onChange={(event) =>
                  updateValue("contributionFrequency", event.target.value)
                }
                className={inputClassName}
              >
                <option value="monthly">매월</option>
                <option value="yearly">매년</option>
              </select>
            </div>
            <NumberField
              field="durationYears"
              label="투자 기간"
              value={values.durationYears}
              unit="년"
              required
              help="첫 버전은 1~100년의 정수만 지원합니다."
              error={errors.durationYears}
              placeholder="예: 10"
              onChange={(event) =>
                updateValue("durationYears", event.target.value)
              }
              onBlur={() => validateField("durationYears")}
            />
            <NumberField
              field="annualInterestRate"
              label="연 이자율"
              value={values.annualInterestRate}
              unit="%"
              required
              help="기간 내내 동일하다고 가정하는 명목 연 이자율"
              error={errors.annualInterestRate}
              placeholder="예: 5"
              onChange={(event) =>
                updateValue("annualInterestRate", event.target.value)
              }
              onBlur={() => validateField("annualInterestRate")}
            />
            <div>
              <label
                htmlFor="compoundingFrequency"
                className="text-sm font-medium"
              >
                복리 주기 <span className="text-destructive">*</span>
              </label>
              <select
                id="compoundingFrequency"
                value={values.compoundingFrequency}
                onChange={(event) =>
                  updateValue("compoundingFrequency", event.target.value)
                }
                className={inputClassName}
              >
                <option value="yearly">매년</option>
                <option value="semiannually">반기</option>
                <option value="quarterly">분기</option>
                <option value="monthly">매월</option>
                <option value="daily">매일(연 365회)</option>
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
                    name="contributionTiming"
                    value={value}
                    checked={values.contributionTiming === value}
                    onChange={(event) =>
                      updateValue("contributionTiming", event.target.value)
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <details className="mt-6 rounded-xl border bg-muted/30 p-4">
            <summary className="min-h-11 cursor-pointer content-center font-medium">
              선택 고급 설정: 물가·간이 세금
              {values.inflationRate.trim() || values.taxRate.trim()
                ? " (입력됨)"
                : ""}
            </summary>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              기본값은 적용 안 함입니다. 실제 물가와 세법을 예측하지 않습니다.
            </p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <NumberField
                field="inflationRate"
                label="연 물가상승률"
                value={values.inflationRate}
                unit="%"
                help="비워 두면 현재가치 조정을 하지 않습니다."
                error={errors.inflationRate}
                placeholder="예: 2.5"
                onChange={(event) =>
                  updateValue("inflationRate", event.target.value)
                }
                onBlur={() => validateField("inflationRate")}
              />
              <NumberField
                field="taxRate"
                label="수익 간이 세율"
                value={values.taxRate}
                unit="%"
                help="비워 두면 세금을 적용하지 않습니다. 법정 세율이 아닙니다."
                error={errors.taxRate}
                placeholder="예: 15.4"
                onChange={(event) => updateValue("taxRate", event.target.value)}
                onBlur={() => validateField("taxRate")}
              />
            </div>
          </details>

          <CalculatorActions submitLabel="예상 결과 계산하기" onReset={reset} />
        </form>
        <div className="space-y-6">
          <section
            aria-labelledby="result-title"
            className="rounded-2xl border bg-card p-5 shadow-sm sm:p-7"
          >
            <p className="text-sm font-semibold text-primary">예상 결과</p>
            <h2
              id="result-title"
              className="mt-1 text-2xl font-semibold tracking-tight"
            >
              {result
                ? result.taxEnabled
                  ? "세금 반영 예상 최종 금액"
                  : "예상 최종 금액"
                : "복리 계산 결과"}
            </h2>
            {result ? (
              <>
                <PrimaryResults
                  metrics={[
                    {
                      label: "예상 최종 금액",
                      value: formatWon(result.estimatedFinalBalance),
                      featured: true,
                    },
                    {
                      label: "총 납입 원금",
                      value: formatWon(result.totalContributedPrincipal),
                    },
                    {
                      label: "예상 순증가액",
                      value: formatWon(result.estimatedNetGain),
                    },
                  ]}
                />
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  고정 이자율을 가정한 시나리오 추정치이며 실제 수익이나 금융
                  결과를 보장하지 않습니다.
                </p>

                <p className="sr-only" aria-live="polite" aria-atomic="true">
                  {announcement}
                </p>
              </>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed bg-muted/30 p-6 text-sm leading-6 text-muted-foreground">
                원금과 납입액, 기간, 이자율을 입력하면 예상 복리 성장 결과를
                확인할 수 있습니다.
              </div>
            )}
          </section>
          {result ? (
            <>
              <CompoundGrowthChart records={result.yearlyData} />

              <section className="rounded-2xl border bg-card p-5 sm:p-7">
                <h2 className="text-2xl font-semibold tracking-tight">
                  연도별 상세 내역
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  모든 금액은 원 단위로 반올림해 표시합니다. 표는 위 차트의 전체
                  대체 정보를 제공합니다.
                </p>
                <div className="mt-5 overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[1100px] border-collapse text-right text-sm tabular-nums">
                    <caption className="sr-only">
                      연도별 복리 계산 상세 내역
                    </caption>
                    <thead className="bg-muted/70">
                      <tr>
                        {[
                          "연도",
                          "기초 잔액",
                          "연간 납입",
                          "연간 이자",
                          "누적 원금",
                          "세전 잔액",
                          "간이 세금",
                          "세후 잔액",
                          "물가 반영 가치",
                        ].map((heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="whitespace-nowrap border-b px-3 py-3 font-medium"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((record) => (
                        <tr
                          key={record.year}
                          className="border-b last:border-0"
                        >
                          <th scope="row" className="px-3 py-3 font-medium">
                            {record.year}년
                          </th>
                          <td className="px-3 py-3">
                            {formatWon(record.openingBalance)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.contributions)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.interest)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.cumulativePrincipal)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.grossBalance)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.estimatedTax)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.netBalance)}
                          </td>
                          <td className="px-3 py-3">
                            {formatWon(record.inflationAdjustedValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="rounded-2xl border bg-card p-5 sm:p-7">
                <h2 className="text-2xl font-semibold tracking-tight">
                  추가 결과와 적용 가정
                </h2>
                <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["세전 예상 잔액", result.grossFinalBalance],
                    ["예상 세전 이자", result.grossInterest],
                    ["예상 간이 세금", result.estimatedTax],
                    ["물가 반영 현재가치", result.inflationAdjustedValue],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border bg-background p-4"
                    >
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-semibold tabular-nums">
                        {formatWon(value)}
                      </dd>
                    </div>
                  ))}
                  <div className="rounded-xl border bg-background p-4 sm:col-span-2">
                    <dt className="text-xs text-muted-foreground">
                      예상 자산 배수 (납입 원금 대비)
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums">
                      {formatMultiplier(result.growthMultiplier)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-5 rounded-xl bg-muted p-4 text-sm leading-6">
                  <p className="font-medium">적용 가정</p>
                  <p className="mt-1 text-muted-foreground">
                    납입 시점:{" "}
                    {values.contributionTiming === "beginning"
                      ? "기간 초"
                      : "기간 말"}
                    {result.inflationEnabled
                      ? ` · 물가 ${formatPercent(values.inflationRate)}`
                      : " · 물가 미반영"}
                    {result.taxEnabled
                      ? ` · 간이 세율 ${formatPercent(values.taxRate)}`
                      : " · 세금 미반영"}
                  </p>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

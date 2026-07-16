"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Calculator, ChartNoAxesCombined } from "lucide-react";

import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
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
  "mt-1.5 h-10 w-full rounded-lg border bg-background px-3 text-sm tabular-nums shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

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
  className?: string;
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
  className,
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
    <div className={className}>
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
        <p id={`${field}-help`} className="sr-only">
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
  const [yearlyDetailsOpen, setYearlyDetailsOpen] = useState(true);
  const [additionalDetailsOpen, setAdditionalDetailsOpen] = useState(false);
  const [chartAnimationKey, setChartAnimationKey] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const resultSectionRef = useRef<HTMLElement>(null);
  const pendingResultScrollRef = useRef(false);

  useEffect(() => {
    if (!result || !pendingResultScrollRef.current) return;

    pendingResultScrollRef.current = false;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    resultSectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [result]);

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
    pendingResultScrollRef.current = true;
    setResult(nextResult);
    setChartAnimationKey((current) => current + 1);
    setYearlyDetailsOpen(true);
    setAdditionalDetailsOpen(true);
    setAnnouncement(
      `계산이 완료되었습니다. 예상 최종 금액은 ${formatWon(nextResult.estimatedFinalBalance)}입니다.`,
    );
  }

  function reset() {
    pendingResultScrollRef.current = false;
    setValues(INITIAL_COMPOUND_INTEREST_VALUES);
    setErrors({});
    setResult(null);
    setYearlyDetailsOpen(true);
    setAdditionalDetailsOpen(false);
    setAnnouncement("입력값과 계산 결과를 초기화했습니다.");
  }

  return (
    <section aria-labelledby="calculator-title" className="space-y-8">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className={compactCalculatorSettingsClass}
        >
          <div className="mb-5">
            <h2
              id="calculator-title"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Calculator className="size-5 text-primary" aria-hidden="true" />
              입력 정보
            </h2>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              미래의 자산을 계산하기 위한 정보를 입력하세요.
            </p>
          </div>

          {Object.keys(errors).length > 0 ? (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm"
            >
              입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.
            </div>
          ) : null}

          <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2">
            <NumberField
              field="initialPrincipal"
              label="초기 투자금"
              value={values.initialPrincipal}
              unit="원"
              required
              help="처음 투자하거나 저축하는 금액"
              error={errors.initialPrincipal}
              placeholder="예: 10,000,000"
              money
              className="sm:order-1 sm:col-span-2"
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
              placeholder="예: 500,000"
              money
              className="sm:order-2 sm:col-span-2"
              onChange={(event) =>
                updateValue("recurringContribution", event.target.value)
              }
              onBlur={() => validateField("recurringContribution")}
            />
            <div className="sm:order-6">
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
              className="sm:order-5"
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
              className="sm:order-3"
            />
            <div className="sm:order-4">
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

          <fieldset className="mt-3">
            <legend className="text-sm font-medium">납입 시점</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                ["end", "기간 말"],
                ["beginning", "기간 초"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm has-checked:border-primary has-checked:bg-primary/5"
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

          <div className="mt-4 grid gap-2">
            <Button type="submit" size="lg" className="h-11 w-full">
              예상 결과 계산하기
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 w-full"
              onClick={reset}
            >
              초기화
            </Button>
          </div>

          <details className="mt-3 rounded-xl border bg-muted/30 px-3 py-2">
            <summary className="min-h-9 cursor-pointer content-center text-sm font-medium">
              선택 고급 설정: 물가·간이 세금
              {values.inflationRate.trim() || values.taxRate.trim()
                ? " (입력됨)"
                : ""}
            </summary>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              기본값은 적용 안 함입니다. 실제 물가와 세법을 예측하지 않습니다.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
        </form>
        <div className="space-y-3">
          <section
            ref={resultSectionRef}
            aria-labelledby="result-title"
            className="scroll-mt-24 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2
              id="result-title"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <ChartNoAxesCombined
                className="size-5 text-primary"
                aria-hidden="true"
              />
              예상 결과
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: "예상 자산",
                  value: result
                    ? formatWon(result.estimatedFinalBalance)
                    : "0원",
                  featured: true,
                },
                {
                  label: "총 납입 금액",
                  value: result
                    ? formatWon(result.totalContributedPrincipal)
                    : "0원",
                },
                {
                  label: "총 이자 금액",
                  value: result ? formatWon(result.estimatedNetGain) : "0원",
                },
              ]}
            />
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </p>
          </section>
          <CompoundGrowthChart
            records={result?.yearlyData}
            animationKey={chartAnimationKey}
          />
          <details
            open={result ? yearlyDetailsOpen : true}
            onToggle={(event) => {
              if (result) setYearlyDetailsOpen(event.currentTarget.open);
            }}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <summary
              aria-disabled={!result}
              onClick={(event) => {
                if (!result) event.preventDefault();
              }}
              className="cursor-pointer text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              상세 내역 보기
            </summary>
            {result ? (
              <>
                <div className="mt-4 overflow-x-auto rounded-lg border">
                  <table className="w-full min-w-[640px] border-collapse text-right text-sm tabular-nums">
                    <caption className="sr-only">
                      연도별 복리 계산 상세 내역
                    </caption>
                    <thead className="bg-muted/70">
                      <tr>
                        {[
                          "연도",
                          "연말 자산",
                          "연간 납입",
                          "연간 이자",
                          "누적 원금",
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
                            {formatWon(record.netBalance)}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                계산 후 연도별 원금, 이자, 예상 잔액을 표로 확인할 수 있습니다.
              </p>
            )}
          </details>

          {result ? (
            <>
              <details
                open={additionalDetailsOpen}
                onToggle={(event) =>
                  setAdditionalDetailsOpen(event.currentTarget.open)
                }
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <summary className="cursor-pointer text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  추가 결과와 적용 가정
                </summary>
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
              </details>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

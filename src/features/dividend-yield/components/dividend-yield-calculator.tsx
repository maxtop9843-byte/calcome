"use client";

import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateDividendYield,
  type DividendYieldResult,
} from "../calculate";
import { dividendYieldContent } from "../content";
import {
  validateDividendYield,
  type DividendYieldErrors,
  type DividendYieldLocale,
  type DividendYieldValues,
} from "../validation";

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 pr-12 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
const initialValues: DividendYieldValues = {
  sharePrice: "",
  annualDividendPerShare: "",
};

export function DividendYieldCalculator({
  locale,
}: {
  locale: DividendYieldLocale;
}) {
  const copy = dividendYieldContent[locale];
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<DividendYieldErrors>({});
  const [result, setResult] = useState<DividendYieldResult>();
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result ?? null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const checked = validateDividendYield(values, locale);
    setErrors(checked.errors);
    if (!checked.data) return;
    requestResultScroll();
    setResult(calculateDividendYield(checked.data));
  }

  function reset() {
    cancelResultScroll();
    setValues(initialValues);
    setErrors({});
    setResult(undefined);
  }

  return (
    <section aria-labelledby="dividend-yield-input-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{copy.category}</p>
          <h2
            id="dividend-yield-input-title"
            className="mt-1 text-xl font-semibold"
          >
            {copy.input}
          </h2>
          {Object.keys(errors).length ? (
            <p
              role="alert"
              className="mt-3 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
            >
              {copy.error}
            </p>
          ) : null}
          <MoneyField
            id="sharePrice"
            label={copy.sharePrice}
            value={values.sharePrice}
            error={errors.sharePrice}
            placeholder="50,000"
            locale={locale}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                sharePrice: formatMoneyInput(value, current.sharePrice),
              }))
            }
          />
          <MoneyField
            id="annualDividendPerShare"
            label={copy.annualDividendPerShare}
            value={values.annualDividendPerShare}
            error={errors.annualDividendPerShare}
            placeholder="2,000"
            locale={locale}
            onChange={(value) =>
              setValues((current) => ({
                ...current,
                annualDividendPerShare: formatMoneyInput(
                  value,
                  current.annualDividendPerShare,
                ),
              }))
            }
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{copy.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {copy.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            aria-labelledby="dividend-yield-result"
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 id="dividend-yield-result" className="text-xl font-semibold">
              {copy.result}
            </h2>
            <PrimaryResults
              metrics={[
                {
                  label: copy.dividendYield,
                  value: percent(result?.dividendYield, locale),
                  featured: true,
                },
                {
                  label: copy.annualDividendPerMillion,
                  value: money(result?.annualDividendPerMillion, locale),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{copy.note}</p>
          </section>
          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="font-semibold">{copy.explanationTitle}</h2>
            {result ? (
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {locale === "ko"
                  ? `현재 주가 대비 주당 연간 배당금의 비율은 ${percent(result.dividendYield, locale)}입니다.`
                  : `The annual dividend is ${percent(result.dividendYield, locale)} of the current share price.`}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{copy.empty}</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  placeholder: string;
  locale: DividendYieldLocale;
  onChange: (value: string) => void;
};

function MoneyField({
  id,
  label,
  value,
  error,
  placeholder,
  locale,
  onChange,
}: FieldProps) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={fieldClass}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1.5 text-sm text-muted-foreground">
          {locale === "ko" ? "원" : "KRW"}
        </span>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type DisplayValue =
  | { toDecimalPlaces: (places: number) => { toNumber: () => number } }
  | undefined;

function money(value: DisplayValue, locale: DividendYieldLocale) {
  return value
    ? `${value
        .toDecimalPlaces(2)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          maximumFractionDigits: 2,
        })} ${locale === "ko" ? "원" : "KRW"}`
    : "—";
}

function percent(value: DisplayValue, locale: DividendYieldLocale) {
  return value
    ? `${value
        .toDecimalPlaces(2)
        .toNumber()
        .toLocaleString(locale === "ko" ? "ko-KR" : "en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%`
    : "—";
}

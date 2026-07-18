"use client";
import { type FormEvent, useState } from "react";
import {
  PrimaryResults,
  compactCalculatorSettingsClass,
  dashboardCalculatorWorkspaceClass,
} from "@/components/calculators/calculator-workspace";
import { Button } from "@/components/ui/button";
import { AnimatedWon } from "@/features/compound-interest/components/animated-won";
import { useStableResultScroll } from "@/hooks/use-stable-result-scroll";
import { formatMoneyInput } from "@/lib/input/money";
import {
  calculateNightWorkPay,
  type NightWorkResult,
  type WorkplaceSize,
} from "../calculate";
import { content, type Locale } from "../content";
import { validateNightWorkPay, type Errors } from "../validation";
const cls =
  "mt-1.5 h-11 w-full rounded-lg border bg-background px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive sm:text-sm";
export function NightWorkPayCalculator({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [w, setW] = useState(""),
    [h, setH] = useState(""),
    [r, setR] = useState("50"),
    [workplaceSize, setWorkplaceSize] = useState<WorkplaceSize>("fiveOrMore"),
    [errors, setErrors] = useState<Errors>({}),
    [result, setResult] = useState<NightWorkResult | null>(null),
    [key, setKey] = useState(0);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);
  function submit(e: FormEvent) {
    e.preventDefault();
    const x = validateNightWorkPay(
      { hourlyWage: w, nightHours: h, premiumRate: r, workplaceSize },
      locale,
    );
    setErrors(x.errors);
    if (!x.data) return;
    requestResultScroll();
    setResult(calculateNightWorkPay(x.data));
    setKey((v) => v + 1);
  }
  function reset() {
    cancelResultScroll();
    setW("");
    setH("");
    setR("50");
    setWorkplaceSize("fiveOrMore");
    setErrors({});
    setResult(null);
  }
  return (
    <section aria-labelledby="night-title">
      <div className={dashboardCalculatorWorkspaceClass}>
        <form
          onSubmit={submit}
          onFocusCapture={noteNumericInputFocus}
          noValidate
          className={`${compactCalculatorSettingsClass} min-w-0`}
        >
          <p className="text-sm font-semibold text-primary">{c.category}</p>
          <h2 id="night-title" className="mt-1 text-xl font-semibold">
            {c.input}
          </h2>
          {Object.keys(errors).length ? (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {c.error}
            </p>
          ) : null}
          <Field
            label={c.wage}
            value={w}
            placeholder={c.wagePh}
            error={errors.hourlyWage}
            change={(v) => setW(formatMoneyInput(v, w))}
          />
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">{c.workplaceSize}</legend>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              {(["fiveOrMore", "underFive"] as const).map((size) => (
                <label
                  key={size}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="workplace-size"
                    value={size}
                    checked={workplaceSize === size}
                    onChange={() => {
                      setWorkplaceSize(size);
                      setR(size === "fiveOrMore" ? "50" : "0");
                    }}
                  />
                  {c[size]}
                </label>
              ))}
            </div>
            {errors.workplaceSize ? (
              <span className="mt-1 block text-sm text-destructive">
                {errors.workplaceSize}
              </span>
            ) : null}
          </fieldset>
          <Field
            label={c.hours}
            value={h}
            placeholder={c.hoursPh}
            error={errors.nightHours}
            change={setH}
          />
          <Field
            label={c.rate}
            value={r}
            placeholder={c.ratePh}
            error={errors.premiumRate}
            change={setR}
          />
          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button type="submit">{c.calculate}</Button>
            <Button type="button" variant="outline" onClick={reset}>
              {c.reset}
            </Button>
          </div>
        </form>
        <div className="min-w-0 space-y-4">
          <section
            ref={resultRef}
            className="scroll-mt-20 rounded-xl border bg-card p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{c.result}</h2>
            <PrimaryResults
              metrics={[
                {
                  label: c.total,
                  value: (
                    <AnimatedWon
                      value={result?.totalPay ?? null}
                      animationKey={key}
                    />
                  ),
                  featured: true,
                },
                {
                  label: c.base,
                  value: (
                    <AnimatedWon
                      value={result?.basePay ?? null}
                      animationKey={key}
                    />
                  ),
                },
                {
                  label: c.premium,
                  value: (
                    <AnimatedWon
                      value={result?.premiumPay ?? null}
                      animationKey={key}
                    />
                  ),
                },
              ]}
            />
            <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
            {result ? (
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p>{c.overlapNotice}</p>
                {result.workplaceSize === "underFive" ? (
                  <p>{c.underFiveNotice}</p>
                ) : null}
              </div>
            ) : null}
          </section>
          <details open className="rounded-xl border bg-card p-4">
            <summary className="font-semibold">{c.details}</summary>
            {result ? (
              <dl className="mt-4 grid gap-3 sm:grid-cols-4">
                <D
                  l={c.adjusted}
                  v={result.adjustedHourlyPay.toDecimalPlaces(0).toString()}
                />
                <D l={c.appliedHours} v={result.nightHours.toString()} />
                <D l={c.appliedRate} v={`${result.premiumRate}%`} />
                <D l={c.workplaceSize} v={c[result.workplaceSize]} />
              </dl>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">{c.empty}</p>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}
function Field({
  label,
  value,
  placeholder,
  error,
  change,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  change: (v: string) => void;
}) {
  return (
    <label className="mt-4 block text-sm font-medium">
      {label}
      <input
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => change(e.target.value)}
        aria-invalid={!!error}
        className={cls}
      />
      {error ? (
        <span className="mt-1 block text-destructive">{error}</span>
      ) : null}
    </label>
  );
}
function D({ l, v }: { l: string; v: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{l}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}

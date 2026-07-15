import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export const calculatorWorkspaceClass =
  "grid gap-6 md:grid-cols-[minmax(16rem,0.36fr)_minmax(0,0.64fr)] md:items-start";
export const calculatorSettingsClass =
  "rounded-2xl border bg-card p-5 shadow-sm sm:p-7 lg:sticky lg:top-6";

export function CalculatorActions({
  submitLabel,
  onReset,
}: {
  submitLabel: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
      <Button type="submit" size="lg" className="h-11 px-5">
        {submitLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 px-4"
        onClick={onReset}
      >
        초기화
      </Button>
    </div>
  );
}

export function PrimaryResults({
  metrics,
}: {
  metrics: readonly { label: string; value: ReactNode; featured?: boolean }[];
}) {
  return (
    <dl
      className="mt-6 grid gap-3 sm:grid-cols-3"
      data-testid="primary-results"
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`rounded-xl border p-4 ${metric.featured ? "border-primary/30 bg-primary/5" : "bg-background"}`}
        >
          <dt className="text-xs leading-5 text-muted-foreground">
            {metric.label}
          </dt>
          <dd className="mt-1 break-words text-lg font-semibold tabular-nums">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

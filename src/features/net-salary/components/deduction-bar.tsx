import type { NetSalaryResult } from "../types";
import { formatSalaryWon } from "../format";
import type { NetSalaryLocale } from "../i18n";
import { getNetSalaryDictionary } from "../i18n";

export function DeductionBar({
  result,
  locale,
}: {
  result: NetSalaryResult | null;
  locale: NetSalaryLocale;
}) {
  const takeHome = result
    ? result.monthlyTakeHome.div(result.monthlyGross).mul(100).toNumber()
    : 0;
  const deduction = result ? Math.max(100 - takeHome, 0) : 0;
  const copy = getNetSalaryDictionary(locale).calc;
  return (
    <section
      data-testid="deduction-chart"
      aria-labelledby="deduction-chart-title"
      className="rounded-xl border bg-card p-4 shadow-sm"
    >
      <h2 id="deduction-chart-title" className="text-xl font-semibold">
        {copy.chartTitle}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {copy.chartDescription}
      </p>
      {result ? (
        <>
          <div
            role="img"
            aria-label={`${copy.monthlyTakeHome} ${takeHome.toFixed(1)}%, ${copy.deductions} ${deduction.toFixed(1)}%`}
            className="mt-5 flex h-8 overflow-hidden rounded-full bg-muted"
          >
            <div className="bg-primary" style={{ width: `${takeHome}%` }} />
            <div className="bg-orange-400" style={{ width: `${deduction}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
            <span>
              <i className="mr-2 inline-block size-3 rounded-sm bg-primary" />
              {copy.monthlyTakeHome}{" "}
              {formatSalaryWon(result.monthlyTakeHome, locale)}
            </span>
            <span>
              <i className="mr-2 inline-block size-3 rounded-sm bg-orange-400" />
              {copy.deductions}{" "}
              {formatSalaryWon(result.monthlyDeductions, locale)}
            </span>
          </div>
        </>
      ) : (
        <div className="mt-5 flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          {copy.empty}
        </div>
      )}
    </section>
  );
}

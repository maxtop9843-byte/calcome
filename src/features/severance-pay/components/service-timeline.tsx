import type { SeveranceLocale } from "../i18n";
import type { ServicePeriodMode } from "../types";

export function ServiceTimeline({
  mode,
  startDate,
  endDate,
  serviceLabel,
  locale,
}: {
  mode: ServicePeriodMode;
  startDate?: string;
  endDate?: string;
  serviceLabel?: string;
  locale: SeveranceLocale;
}) {
  const calculated = Boolean(serviceLabel);
  const title =
    locale === "ko" ? "계속근로기간 타임라인" : "Service-period timeline";
  const description =
    locale === "ko"
      ? "입사부터 퇴직까지 퇴직금 산식에 반영한 계속근로기간을 보여 줍니다."
      : "Shows the continuous service period used in the severance estimate.";
  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <h2 id="service-timeline-title" className="text-lg font-semibold">
        {title}
      </h2>
      <p
        id="service-timeline-description"
        className="mt-1 text-sm text-muted-foreground"
      >
        {description}
      </p>
      <div
        role="img"
        aria-labelledby="service-timeline-title service-timeline-description"
        className="mt-6 min-h-36 rounded-lg border bg-muted/10 p-5"
        data-testid="service-timeline"
      >
        {calculated ? (
          <div className="flex h-full flex-col justify-center">
            <div className="relative h-2 rounded-full bg-primary/20">
              <div className="absolute inset-0 rounded-full bg-primary" />
            </div>
            <div className="mt-3 flex justify-between gap-4 text-xs text-muted-foreground">
              <span>
                {mode === "dates"
                  ? startDate
                  : locale === "ko"
                    ? "근속 시작"
                    : "Service start"}
              </span>
              <span>
                {mode === "dates"
                  ? endDate
                  : locale === "ko"
                    ? "퇴직"
                    : "Retirement"}
              </span>
            </div>
            <p className="mt-5 text-center text-lg font-semibold tabular-nums">
              {serviceLabel}
            </p>
          </div>
        ) : (
          <div className="flex min-h-24 items-center justify-center text-center text-sm text-muted-foreground">
            {locale === "ko"
              ? "계산하면 계속근로기간 타임라인이 표시됩니다."
              : "Calculate to display the service-period timeline."}
          </div>
        )}
      </div>
    </section>
  );
}

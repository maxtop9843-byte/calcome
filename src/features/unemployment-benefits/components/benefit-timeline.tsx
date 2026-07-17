import {
  getUnemploymentBenefitsDictionary,
  type UnemploymentBenefitsLocale,
} from "../i18n";

export function BenefitTimeline({
  days,
  locale,
}: {
  days: number | null;
  locale: UnemploymentBenefitsLocale;
}) {
  const copy = getUnemploymentBenefitsDictionary(locale).calculator;
  const width = days ? (days / 270) * 100 : 0;
  return (
    <section
      data-testid="benefit-timeline"
      aria-labelledby="benefit-timeline-title"
      className="rounded-xl border bg-card p-4 shadow-sm"
    >
      <h2 id="benefit-timeline-title" className="text-xl font-semibold">
        {copy.timelineTitle}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {copy.timelineDescription}
      </p>
      {days ? (
        <div className="mt-6">
          <div
            role="img"
            aria-label={`${copy.benefitDays} ${days}${locale === "ko" ? "일" : " days"}`}
            className="h-5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${width}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>120</span>
            <strong className="text-foreground">
              {days}
              {locale === "ko" ? "일" : " days"}
            </strong>
            <span>270</span>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex h-24 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          {copy.emptyTimeline}
        </div>
      )}
    </section>
  );
}

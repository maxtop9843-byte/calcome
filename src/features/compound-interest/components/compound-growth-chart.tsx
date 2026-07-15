"use client";

import Decimal from "decimal.js";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatWon } from "../format";
import type { YearlyCompoundInterestRecord } from "../types";

export type CompoundGrowthPoint = {
  year: number;
  principal: number;
  assets: number;
  principalValue: string;
  assetsValue: string;
  interest: string;
};

export function createGrowthChartData(
  records: readonly YearlyCompoundInterestRecord[],
): CompoundGrowthPoint[] {
  return records.map((record) => ({
    year: record.year,
    principal: Number(record.cumulativePrincipal),
    assets: Number(record.netBalance),
    principalValue: record.cumulativePrincipal,
    assetsValue: record.netBalance,
    interest: new Decimal(record.netBalance)
      .minus(record.cumulativePrincipal)
      .toString(),
  }));
}

export function getYearTicks(points: readonly CompoundGrowthPoint[]): number[] {
  if (points.length <= 7) return points.map((point) => point.year);
  const lastYear = points.at(-1)?.year ?? 1;
  const step = Math.ceil(lastYear / 6);
  return points
    .map((point) => point.year)
    .filter((year) => year === 1 || year === lastYear || year % step === 0);
}

export function CompoundGrowthTooltip({
  active,
  point,
}: {
  active?: boolean;
  point?: CompoundGrowthPoint;
}) {
  if (!active || !point) return null;
  return (
    <div className="rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-lg">
      <p className="font-semibold">{point.year}년</p>
      <dl className="mt-2 grid gap-1.5 tabular-nums">
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">누적 납입 원금</dt>
          <dd>{formatWon(point.principalValue)}</dd>
        </div>
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">예상 총자산</dt>
          <dd>{formatWon(point.assetsValue)}</dd>
        </div>
        <div className="flex justify-between gap-5">
          <dt className="text-muted-foreground">누적 이자</dt>
          <dd>{formatWon(point.interest)}</dd>
        </div>
      </dl>
    </div>
  );
}

const compactWon = new Intl.NumberFormat("ko-KR", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function CompoundGrowthChart({
  records,
}: {
  records: readonly YearlyCompoundInterestRecord[];
}) {
  const data = createGrowthChartData(records);
  const ticks = getYearTicks(data);

  return (
    <section className="rounded-2xl border bg-card p-5 sm:p-7">
      <h2
        id="growth-chart-title"
        className="text-2xl font-semibold tracking-tight"
      >
        연도별 자산 성장
      </h2>
      <p
        id="growth-chart-description"
        className="mt-2 text-sm text-muted-foreground"
      >
        누적 납입 원금과 예상 총자산의 간격으로 복리 수익이 커지는 흐름을 보여
        줍니다. 정확한 금액은 아래 연도별 상세 내역에서 확인할 수 있습니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-4 text-xs" aria-label="차트 범례">
        <span className="flex items-center gap-2" data-series="principal">
          <span className="h-0.5 w-5 bg-chart-2" aria-hidden="true" />
          누적 납입 원금
        </span>
        <span className="flex items-center gap-2" data-series="assets">
          <span className="h-0.5 w-5 bg-primary" aria-hidden="true" />
          예상 총자산
        </span>
      </div>
      <div
        role="img"
        aria-labelledby="growth-chart-title growth-chart-description"
        className="mt-5 h-64 min-w-0 sm:h-80 lg:h-96"
        data-testid="compound-growth-chart"
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 4, left: 4 }}
            accessibilityLayer
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <XAxis
              dataKey="year"
              type="number"
              domain={[1, "dataMax"]}
              ticks={ticks}
              tickFormatter={(year) => `${year}년`}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              width={58}
              tickCount={5}
              tickFormatter={(value) => `₩${compactWon.format(Number(value))}`}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{
                stroke: "var(--muted-foreground)",
                strokeDasharray: "3 3",
              }}
              animationDuration={0}
              content={({ active, payload }) => (
                <CompoundGrowthTooltip
                  active={active}
                  point={
                    payload?.[0]?.payload as CompoundGrowthPoint | undefined
                  }
                />
              )}
            />
            <Line
              dataKey="principal"
              name="누적 납입 원금"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              dataKey="assets"
              name="예상 총자산"
              type="monotone"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

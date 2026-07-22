import { notFound } from "next/navigation";
import { LocalizedStockAverageCostPage } from "@/features/stock-average-cost/components/localized-stock-average-cost-page";
import { createStockAverageCostMetadata } from "@/features/stock-average-cost/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createStockAverageCostMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedStockAverageCostPage locale={locale} />;
}

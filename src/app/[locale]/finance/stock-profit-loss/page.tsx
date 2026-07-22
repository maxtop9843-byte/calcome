import { notFound } from "next/navigation";
import { LocalizedStockProfitLossPage } from "@/features/stock-profit-loss/components/localized-stock-profit-loss-page";
import { createStockProfitLossMetadata } from "@/features/stock-profit-loss/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createStockProfitLossMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedStockProfitLossPage locale={locale} />;
}

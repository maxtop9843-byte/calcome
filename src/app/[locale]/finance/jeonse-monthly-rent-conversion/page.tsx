import { notFound } from "next/navigation";
import { LocalizedJeonseMonthlyRentConversionPage } from "@/features/jeonse-monthly-rent-conversion/components/localized-jeonse-monthly-rent-conversion-page";
import { createJeonseMonthlyRentConversionMetadata } from "@/features/jeonse-monthly-rent-conversion/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createJeonseMonthlyRentConversionMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedJeonseMonthlyRentConversionPage locale={locale} />;
}

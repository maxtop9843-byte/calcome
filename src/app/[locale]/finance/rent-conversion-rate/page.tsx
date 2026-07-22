import { notFound } from "next/navigation";
import { LocalizedRentConversionRatePage } from "@/features/rent-conversion-rate/components/localized-rent-conversion-rate-page";
import { createRentConversionRateMetadata } from "@/features/rent-conversion-rate/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRentConversionRateMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRentConversionRatePage locale={locale} />;
}

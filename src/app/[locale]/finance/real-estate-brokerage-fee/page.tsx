import { notFound } from "next/navigation";
import { LocalizedRealEstateBrokerageFeePage } from "@/features/real-estate-brokerage-fee/components/localized-real-estate-brokerage-fee-page";
import { createRealEstateBrokerageFeeMetadata } from "@/features/real-estate-brokerage-fee/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createRealEstateBrokerageFeeMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedRealEstateBrokerageFeePage locale={locale} />;
}

import { notFound } from "next/navigation";
import { LocalizedAcquisitionTaxPage } from "@/features/real-estate-acquisition-tax/components/localized-acquisition-tax-page";
import { createAcquisitionTaxMetadata } from "@/features/real-estate-acquisition-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createAcquisitionTaxMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedAcquisitionTaxPage locale={locale} />;
}

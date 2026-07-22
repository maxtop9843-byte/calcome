import { notFound } from "next/navigation";
import { LocalizedGiftTaxPage } from "@/features/gift-tax/components/localized-gift-tax-page";
import { createGiftTaxMetadata } from "@/features/gift-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createGiftTaxMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedGiftTaxPage locale={locale} />;
}

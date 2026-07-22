import { notFound } from "next/navigation";
import { LocalizedCapitalGainsTaxPage } from "@/features/capital-gains-tax/components/localized-capital-gains-tax-page";
import { createCapitalGainsTaxMetadata } from "@/features/capital-gains-tax/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createCapitalGainsTaxMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedCapitalGainsTaxPage locale={locale} />;
}

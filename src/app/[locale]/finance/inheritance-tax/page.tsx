import { notFound } from "next/navigation";
import { LocalizedInheritanceTaxPage } from "@/features/inheritance-tax/components/localized-inheritance-tax-page";
import { createInheritanceTaxMetadata } from "@/features/inheritance-tax/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") return {};
  return createInheritanceTaxMetadata(locale);
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedInheritanceTaxPage locale={locale} />;
}

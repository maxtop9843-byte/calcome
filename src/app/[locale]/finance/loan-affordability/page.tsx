import { notFound } from "next/navigation";
import { LocalizedLoanAffordabilityPage } from "@/features/loan-affordability/components/localized-loan-affordability-page";
import { createLoanAffordabilityMetadata } from "@/features/loan-affordability/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createLoanAffordabilityMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedLoanAffordabilityPage locale={locale} />;
}

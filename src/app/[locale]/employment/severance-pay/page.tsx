import { notFound } from "next/navigation";
import { LocalizedSeverancePage } from "@/features/severance-pay/components/localized-severance-page";
import { createSeveranceMetadata } from "@/features/severance-pay/metadata";

const isLocale = (value: string): value is "ko" | "en" =>
  value === "ko" || value === "en";
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? createSeveranceMetadata(locale) : {};
}
export default async function SeverancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LocalizedSeverancePage locale={locale} />;
}

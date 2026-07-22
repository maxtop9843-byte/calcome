import { notFound } from "next/navigation";
import { LocalizedDividendPage } from "@/features/dividend/components/localized-dividend-page";
import { createDividendMetadata } from "@/features/dividend/metadata";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDividendMetadata(locale)
    : {};
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDividendPage locale={locale} />;
}

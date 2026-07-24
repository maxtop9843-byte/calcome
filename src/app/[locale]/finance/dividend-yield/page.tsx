import { notFound } from "next/navigation";
import { LocalizedDividendYieldPage } from "@/features/dividend-yield/components/localized-dividend-yield-page";
import { createDividendYieldMetadata } from "@/features/dividend-yield/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === "ko" || locale === "en"
    ? createDividendYieldMetadata(locale)
    : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") notFound();
  return <LocalizedDividendYieldPage locale={locale} />;
}

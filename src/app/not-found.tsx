import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-1 items-center">
      <section className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          주소가 변경되었거나 존재하지 않는 페이지입니다. 홈으로 돌아가거나 현재
          제공 중인 계산기를 이용해 주세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/ko/finance/compound-interest"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-5",
            )}
          >
            복리 계산기
          </Link>
        </div>
      </section>
    </main>
  );
}

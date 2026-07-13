"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main id="main-content" className="flex flex-1 items-center">
      <section className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="text-sm font-semibold text-destructive">오류</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          페이지를 표시하지 못했습니다
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
          일시적인 문제가 발생했습니다. 다시 시도해도 해결되지 않으면 홈으로
          돌아가 주세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            size="lg"
            className="h-11 px-5"
            onClick={unstable_retry}
          >
            다시 시도
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-5",
            )}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}

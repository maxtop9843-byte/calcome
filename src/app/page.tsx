import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-1 items-center">
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-primary">
            CALCLAB
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            더 나은 판단을 돕는 현대적인 계산 플랫폼
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            CalcLab은 빠르고 이해하기 쉬우며 신뢰할 수 있는 한국 금융 계산
            경험을 위한 기반을 만들고 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="https://github.com/maxtop9843-byte/calclab"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              GitHub에서 보기
            </Link>
            <Link
              href="https://github.com/maxtop9843-byte/calclab/blob/main/CONTRIBUTING.md"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5",
              )}
            >
              기여 안내
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

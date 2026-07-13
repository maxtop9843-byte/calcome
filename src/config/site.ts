export const siteConfig = {
  name: "CalcLab",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "ko_KR",
  description:
    "빠르고 이해하기 쉬운 한국 금융 계산 경험을 위한 현대적인 계산 플랫폼입니다.",
  repository: "https://github.com/maxtop9843-byte/calclab",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

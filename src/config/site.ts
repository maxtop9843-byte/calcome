export const siteConfig = {
  name: "CalCome",
  slogan: "금융 계산을 쉽게.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://calcome.com",
  locale: "ko_KR",
  description:
    "금융 계산을 쉽게. 누구나 이해할 수 있는 한국 금융 계산기입니다.",
  repository: "https://github.com/maxtop9843-byte/calcome",
  issues: "https://github.com/maxtop9843-byte/calcome/issues",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

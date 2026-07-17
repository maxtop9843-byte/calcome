import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function localeFromPathname(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-calcome-locale", localeFromPathname(pathname));
  requestHeaders.set("x-calcome-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};

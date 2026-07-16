"use client";

import { Moon, Sun } from "lucide-react";

import { setTheme, useTheme } from "./theme-provider";

export function ThemeToggle() {
  const theme = useTheme();
  const targetTheme = theme === "dark" ? "light" : "dark";
  const label =
    targetTheme === "dark" ? "다크 모드로 전환" : "라이트 모드로 전환";

  return (
    <button
      type="button"
      aria-label={theme ? label : "테마 전환"}
      disabled={!theme}
      onClick={() => setTheme(targetTheme)}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-70"
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden="true" data-testid="theme-sun" />
      ) : theme === "light" ? (
        <Moon className="size-5" aria-hidden="true" data-testid="theme-moon" />
      ) : (
        <span className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}

"use client";

import { type ReactNode, useLayoutEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "calcome-theme";
const systemThemeQuery = "(prefers-color-scheme: dark)";
const themeChangeEvent = "calcome-theme-change";

function getStoredTheme(): Theme | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return typeof window.matchMedia === "function" &&
    window.matchMedia(systemThemeQuery).matches
    ? "dark"
    : "light";
}

function getPreferredTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  window.dispatchEvent(new Event(themeChangeEvent));
}

function subscribeToTheme(onChange: () => void) {
  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia(systemThemeQuery)
      : null;
  const handleSystemChange = () => {
    if (!getStoredTheme()) applyTheme(getSystemTheme());
  };
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  mediaQuery?.addEventListener?.("change", handleSystemChange);
  return () => {
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
    mediaQuery?.removeEventListener?.("change", handleSystemChange);
  };
}

function getThemeSnapshot(): Theme {
  const appliedTheme = document.documentElement.dataset.theme;
  return appliedTheme === "light" || appliedTheme === "dark"
    ? appliedTheme
    : getPreferredTheme();
}

function getServerThemeSnapshot(): null {
  return null;
}

export function useTheme(): Theme | null {
  return useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
}

export function setTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still applies for this page when storage is blocked.
  }
  applyTheme(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  return children;
}

export const themeInitializationScript = `(()=>{try{const k="${THEME_STORAGE_KEY}";const s=localStorage.getItem(k);const t=s==="light"||s==="dark"?s:matchMedia("${systemThemeQuery}").matches?"dark":"light";const r=document.documentElement;r.classList.toggle("dark",t==="dark");r.dataset.theme=t;r.style.colorScheme=t}catch{}})()`;

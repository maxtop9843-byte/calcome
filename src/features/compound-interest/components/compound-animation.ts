"use client";

import { useSyncExternalStore } from "react";

export const COMPOUND_ANIMATION_DELAY = 100;
export const COMPOUND_ANIMATION_DURATION = 2000;
export const COMPOUND_ANIMATION_EASING = "ease-in-out" as const;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => undefined;
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener?.("change", onChange);
  return () => mediaQuery.removeEventListener?.("change", onChange);
}

function getReducedMotionPreference() {
  if (typeof window.matchMedia !== "function") return false;
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionPreference() {
  return true;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
}

export function easeInOut(progress: number) {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

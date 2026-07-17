"use client";

import { type FocusEvent, useCallback, useEffect, useRef } from "react";

import { afterViewportSettles } from "@/lib/browser/stable-viewport";

export function useStableResultScroll<Result>(result: Result | null) {
  const resultRef = useRef<HTMLElement>(null);
  const pendingScrollRef = useRef(false);
  const mobileInputWasFocusedRef = useRef(false);

  useEffect(() => {
    if (!result || !pendingScrollRef.current) return;

    pendingScrollRef.current = false;
    const keyboardMayBeOpen = Boolean(
      mobileInputWasFocusedRef.current &&
      window.visualViewport &&
      window.visualViewport.width < 768,
    );
    mobileInputWasFocusedRef.current = false;

    return afterViewportSettles(() => {
      const reducedMotion =
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ??
        false;
      resultRef.current?.scrollIntoView?.({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }, keyboardMayBeOpen);
  }, [result]);

  const noteNumericInputFocus = useCallback(
    (event: FocusEvent<HTMLFormElement>) => {
      if (
        event.target instanceof HTMLInputElement &&
        event.target.inputMode === "decimal"
      ) {
        mobileInputWasFocusedRef.current = true;
      }
    },
    [],
  );

  const requestResultScroll = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    pendingScrollRef.current = true;
  }, []);

  const cancelResultScroll = useCallback(() => {
    pendingScrollRef.current = false;
    mobileInputWasFocusedRef.current = false;
  }, []);

  return {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  };
}

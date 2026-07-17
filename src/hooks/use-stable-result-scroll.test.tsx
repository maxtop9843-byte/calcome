import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useState } from "react";

import { useStableResultScroll } from "./use-stable-result-scroll";

const scrollIntoView = vi.fn();

function ResultScrollHarness() {
  const [result, setResult] = useState<object | null>(null);
  const {
    resultRef,
    noteNumericInputFocus,
    requestResultScroll,
    cancelResultScroll,
  } = useStableResultScroll(result);

  return (
    <>
      <form
        onFocusCapture={noteNumericInputFocus}
        onSubmit={(event) => {
          event.preventDefault();
          requestResultScroll();
          setResult({ complete: true });
        }}
      >
        <label htmlFor="amount">Amount</label>
        <input id="amount" inputMode="decimal" />
        <button type="submit">Calculate</button>
        <button
          type="button"
          onClick={() => {
            cancelResultScroll();
            setResult(null);
          }}
        >
          Reset
        </button>
      </form>
      <section ref={resultRef}>Result</section>
    </>
  );
}

describe("useStableResultScroll", () => {
  beforeEach(() => {
    scrollIntoView.mockReset();
    Element.prototype.scrollIntoView = scrollIntoView;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: undefined,
    });
  });

  it("dismisses focus and scrolls only after the committed result settles", async () => {
    const user = userEvent.setup();
    render(<ResultScrollHarness />);
    const amount = screen.getByLabelText("Amount");
    amount.focus();
    await user.keyboard("{Enter}");

    expect(amount).not.toHaveFocus();
    expect(scrollIntoView).not.toHaveBeenCalled();
    await vi.waitFor(() => expect(scrollIntoView).toHaveBeenCalledOnce());
  });

  it("cancels a pending result scroll on reset", async () => {
    const callbacks = new Map<number, FrameRequestCallback>();
    let frameId = 0;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frameId += 1;
      callbacks.set(frameId, callback);
      return frameId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => callbacks.delete(id));
    const user = userEvent.setup();
    render(<ResultScrollHarness />);

    await user.click(screen.getByRole("button", { name: "Calculate" }));
    await user.click(screen.getByRole("button", { name: "Reset" }));
    for (const callback of callbacks.values()) callback(0);

    expect(scrollIntoView).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

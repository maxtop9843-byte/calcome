import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  COMPOUND_ANIMATION_DELAY,
  COMPOUND_ANIMATION_DURATION,
} from "./compound-animation";
import { AnimatedWon } from "./animated-won";

const matchMediaMock = vi.fn();
let frameId = 0;
let frames = new Map<number, FrameRequestCallback>();

function runFrame(timestamp: number) {
  const pendingFrames = [...frames.values()];
  frames.clear();
  act(() => pendingFrames.forEach((callback) => callback(timestamp)));
}

describe("AnimatedWon", () => {
  beforeEach(() => {
    frameId = 0;
    frames = new Map();
    matchMediaMock.mockReset();
    matchMediaMock.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: matchMediaMock,
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      const id = ++frameId;
      frames.set(id, callback);
      return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  });

  it("counts all three cards together and reaches the exact final values", () => {
    render(
      <>
        <AnimatedWon value="99594000" animationKey={1} />
        <AnimatedWon value="70000000" animationKey={1} />
        <AnimatedWon value="29594000" animationKey={1} />
      </>,
    );
    const values = screen.getAllByTestId("animated-won");
    expect(values.map((value) => value.textContent)).toEqual([
      "₩0",
      "₩0",
      "₩0",
    ]);

    runFrame(0);
    runFrame(COMPOUND_ANIMATION_DELAY);
    runFrame(COMPOUND_ANIMATION_DELAY + COMPOUND_ANIMATION_DURATION / 2);
    expect(values.every((value) => value.textContent !== "₩0")).toBe(true);
    expect(values.map((value) => value.textContent)).not.toEqual([
      "₩99,594,000",
      "₩70,000,000",
      "₩29,594,000",
    ]);

    runFrame(COMPOUND_ANIMATION_DELAY + COMPOUND_ANIMATION_DURATION);
    expect(values.map((value) => value.textContent)).toEqual([
      "₩99,594,000",
      "₩70,000,000",
      "₩29,594,000",
    ]);
  });

  it("restarts from zero when the successful-calculation key changes", () => {
    const { rerender } = render(
      <AnimatedWon key="run-1" value="1000000" animationKey={1} />,
    );
    runFrame(0);
    runFrame(COMPOUND_ANIMATION_DELAY + COMPOUND_ANIMATION_DURATION);
    expect(screen.getByTestId("animated-won")).toHaveTextContent("₩1,000,000");

    rerender(<AnimatedWon key="run-2" value="2000000" animationKey={2} />);
    expect(screen.getByTestId("animated-won")).toHaveTextContent("₩0");
    expect(screen.getByTestId("animated-won")).toHaveAttribute(
      "data-animation-run",
      "2",
    );
  });

  it("renders the exact value immediately for reduced motion", () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    render(<AnimatedWon value="1234567" animationKey={1} />);
    expect(screen.getByTestId("animated-won")).toHaveTextContent("₩1,234,567");
    expect(frames.size).toBe(0);
  });
});

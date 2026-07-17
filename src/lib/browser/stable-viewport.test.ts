import { afterEach, describe, expect, it, vi } from "vitest";

import { afterViewportSettles } from "./stable-viewport";

function installAnimationFrames() {
  const callbacks = new Map<number, FrameRequestCallback>();
  let nextId = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    nextId += 1;
    callbacks.set(nextId, callback);
    return nextId;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => callbacks.delete(id));

  return {
    runFrame() {
      const pending = [...callbacks.values()];
      callbacks.clear();
      pending.forEach((callback) => callback(0));
    },
  };
}

function installVisualViewport(height = 400) {
  const viewport = { height, offsetTop: 0, width: 390 };
  Object.defineProperty(window, "visualViewport", {
    configurable: true,
    value: viewport as VisualViewport,
  });
  return viewport;
}

afterEach(() => {
  vi.unstubAllGlobals();
  Object.defineProperty(window, "visualViewport", {
    configurable: true,
    value: undefined,
  });
});

describe("afterViewportSettles", () => {
  it("runs after two frames when no keyboard transition is expected", () => {
    const frames = installAnimationFrames();
    const callback = vi.fn();

    afterViewportSettles(callback, false);
    frames.runFrame();
    expect(callback).not.toHaveBeenCalled();
    frames.runFrame();
    expect(callback).toHaveBeenCalledOnce();
  });

  it("waits for the visual viewport to stabilize after keyboard dismissal", () => {
    const frames = installAnimationFrames();
    const viewport = installVisualViewport();
    const callback = vi.fn();

    afterViewportSettles(callback, true);
    frames.runFrame();
    viewport.height = 720;
    frames.runFrame();
    expect(callback).not.toHaveBeenCalled();
    frames.runFrame();
    frames.runFrame();
    expect(callback).not.toHaveBeenCalled();
    frames.runFrame();
    expect(callback).toHaveBeenCalledOnce();
  });

  it("uses a bounded frame fallback when a mobile browser emits no resize", () => {
    const frames = installAnimationFrames();
    installVisualViewport();
    const callback = vi.fn();

    afterViewportSettles(callback, true);
    for (let frame = 0; frame < 29; frame += 1) frames.runFrame();
    expect(callback).not.toHaveBeenCalled();
    frames.runFrame();
    expect(callback).toHaveBeenCalledOnce();
  });

  it("can cancel a pending callback", () => {
    const frames = installAnimationFrames();
    const callback = vi.fn();
    const cancel = afterViewportSettles(callback, false);

    cancel();
    frames.runFrame();
    expect(callback).not.toHaveBeenCalled();
  });
});

const DESKTOP_SETTLE_FRAMES = 2;
const KEYBOARD_FALLBACK_FRAMES = 30;
const VIEWPORT_SETTLE_FRAMES = 3;
const MAX_WAIT_FRAMES = 90;
const VIEWPORT_DELTA_TOLERANCE = 1;

type ViewportSnapshot = {
  height: number;
  offsetTop: number;
  width: number;
};

function snapshot(viewport: VisualViewport): ViewportSnapshot {
  return {
    height: viewport.height,
    offsetTop: viewport.offsetTop,
    width: viewport.width,
  };
}

function changed(previous: ViewportSnapshot, next: ViewportSnapshot) {
  return (
    Math.abs(previous.height - next.height) > VIEWPORT_DELTA_TOLERANCE ||
    Math.abs(previous.offsetTop - next.offsetTop) > VIEWPORT_DELTA_TOLERANCE ||
    Math.abs(previous.width - next.width) > VIEWPORT_DELTA_TOLERANCE
  );
}

/**
 * Runs after the visual viewport has settled following mobile keyboard dismissal.
 * The frame-based fallback also covers browsers that do not emit VisualViewport
 * resize events when the keyboard closes.
 */
export function afterViewportSettles(
  callback: () => void,
  keyboardMayBeOpen: boolean,
) {
  const viewport = window.visualViewport;
  let frameId = 0;
  let cancelled = false;
  let totalFrames = 0;
  let stableFrames = 0;
  let viewportChanged = false;
  let previous = viewport ? snapshot(viewport) : null;

  function finish() {
    if (!cancelled) callback();
  }

  function check() {
    if (cancelled) return;
    totalFrames += 1;

    if (viewport && previous) {
      const current = snapshot(viewport);
      if (changed(previous, current)) {
        viewportChanged = true;
        stableFrames = 0;
      } else {
        stableFrames += 1;
      }
      previous = current;
    } else {
      stableFrames += 1;
    }

    const requiredStableFrames = keyboardMayBeOpen
      ? viewportChanged
        ? VIEWPORT_SETTLE_FRAMES
        : KEYBOARD_FALLBACK_FRAMES
      : DESKTOP_SETTLE_FRAMES;

    if (
      stableFrames >= requiredStableFrames ||
      totalFrames >= MAX_WAIT_FRAMES
    ) {
      finish();
      return;
    }

    frameId = requestAnimationFrame(check);
  }

  frameId = requestAnimationFrame(check);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frameId);
  };
}

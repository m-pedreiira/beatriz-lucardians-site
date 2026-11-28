/**
 * Keeps `element` at the same spot on screen while content above it expands or
 * collapses, so the item under the pointer (or finger) doesn't run away.
 * Call it right before changing the state that moves things.
 */
export function keepInPlace(element: HTMLElement, duration = 1200) {
  const top = element.getBoundingClientRect().top;

  // Runs after each layout change of the list and before it is painted.
  const observer = new ResizeObserver(() => {
    const drift = element.getBoundingClientRect().top - top;
    if (Math.abs(drift) >= 1) window.scrollBy({ top: drift, behavior: "instant" });
  });
  Array.from(element.parentElement?.children ?? [element]).forEach((item) => observer.observe(item));

  // Stop when the transition is over, or as soon as the person scrolls on their own.
  const events = ["wheel", "touchstart", "keydown"] as const;
  const stop = () => {
    observer.disconnect();
    clearTimeout(timer);
    events.forEach((type) => window.removeEventListener(type, stop));
  };
  const timer = setTimeout(stop, duration);
  events.forEach((type) => window.addEventListener(type, stop, { passive: true }));
}

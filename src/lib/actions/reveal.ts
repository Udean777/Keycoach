// Reveal-on-view action — design.md Motion: opacity + up-to-4px lift on cards.
// Adds `.is-visible` once the element enters the viewport (one-shot, then
// unobserves). Reduced-motion / no-IO → visible immediately (CSS media query
// also forces it, this is belt-and-braces for SSR).
export function reveal(node: HTMLElement): { destroy(): void } | void {
  if (
    typeof window === "undefined" ||
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    node.classList.add("is-visible");
    return undefined;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        node.classList.add("is-visible");
        io.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -8px 0px" },
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}
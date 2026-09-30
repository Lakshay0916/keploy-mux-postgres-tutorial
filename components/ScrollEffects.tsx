"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * One scroll listener for all scroll-driven UI: the reading progress bar,
 * the header's bottom border (via html[data-scrolled]) and the back-to-top button.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY, innerHeight } = window;
      const max = document.documentElement.scrollHeight - innerHeight;
      // Written straight to the DOM so scrolling never re-renders React.
      barRef.current?.style.setProperty("transform", `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`);
      document.documentElement.toggleAttribute("data-scrolled", scrollY > 8);
      setShowTop(scrollY > innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 print:hidden">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-brand" />
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex size-10 items-center justify-center rounded-full border border-border bg-bg/90 text-muted shadow-lg backdrop-blur transition-all duration-200 hover:border-brand hover:text-brand-fg sm:right-6 sm:bottom-6 print:hidden ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="size-4" aria-hidden />
      </button>
    </>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string; level: number };

function useHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("article :is(h2, h3)[id]"));

    // Read headings from the rendered article so the TOC never drifts from the MDX.
    const frame = requestAnimationFrame(() =>
      setHeadings(
        elements.map((el) => ({
          id: el.id,
          text: el.textContent?.replace(/#$/, "").trim() ?? "",
          level: el.tagName === "H2" ? 2 : 3,
        })),
      ),
    );

    // Active section = the last heading above the reading line (a third of the way down).
    // The observer only signals that a heading crossed that line; recomputing from positions
    // keeps the highlight right when scrolling back up past the first heading.
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight / 3;
        const passed = elements.filter((el) => el.getBoundingClientRect().top <= line);
        setActiveId(passed.length ? passed[passed.length - 1].id : "");
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return { headings, activeId };
}

function TocLinks({ headings, activeId, onNavigate }: { headings: Heading[]; activeId: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-1 border-l border-border">
      {headings.map((heading) => {
        const active = heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className={`-ml-px block border-l py-1 leading-snug transition-colors ${
                heading.level === 3 ? "pl-6" : "pl-3"
              } ${active ? "border-brand font-medium text-brand-fg" : "border-transparent text-muted hover:text-fg"}`}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** Sticky sidebar for large screens. */
export function Toc() {
  const { headings, activeId } = useHeadings();
  if (!headings.length) return null;

  return (
    <nav aria-labelledby="toc-heading" className="text-sm">
      <p id="toc-heading" className="mb-3 font-semibold text-fg">
        On this page
      </p>
      <TocLinks headings={headings} activeId={activeId} />
    </nav>
  );
}

/** Collapsible bar under the header on small screens; shows the current section. */
export function MobileToc() {
  const { headings, activeId } = useHeadings();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  // Rendered even before headings load, so the bar doesn't push the article down (layout shift).
  const current = headings.find((heading) => heading.id === activeId)?.text;

  return (
    <nav aria-label="On this page" className="sticky top-14 z-30 -mx-4 border-b border-border bg-bg/85 backdrop-blur-md sm:-mx-6 lg:hidden print:hidden">
      <details ref={detailsRef} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 text-sm sm:px-6 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 truncate">
            <span className="font-semibold text-fg">On this page</span>
            {current && <span className="text-muted"> · {current}</span>}
          </span>
          <ChevronDown className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4 text-sm sm:px-6">
          <TocLinks
            headings={headings}
            activeId={activeId}
            onNavigate={() => detailsRef.current?.removeAttribute("open")}
          />
        </div>
      </details>
    </nav>
  );
}

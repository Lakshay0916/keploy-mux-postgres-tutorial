"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export function Toc() {
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

    // Highlight the heading closest to the top of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (!headings.length) return null;

  return (
    <nav aria-labelledby="toc-heading" className="text-sm">
      <p id="toc-heading" className="mb-3 font-semibold text-fg">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
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
    </nav>
  );
}

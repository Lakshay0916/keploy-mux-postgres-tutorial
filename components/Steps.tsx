import type { ReactNode } from "react";

/**
 * Numbers every `###` heading inside it and draws a connecting line.
 * Steps are plain Markdown headings so they get slugs and show up in the TOC.
 */
export function Steps({ children }: { children: ReactNode }) {
  return <div className="steps">{children}</div>;
}

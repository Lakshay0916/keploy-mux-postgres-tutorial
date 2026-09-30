"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

export function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = buttonRef.current?.closest("[data-code-block]")?.querySelector("pre code");
    if (!code?.textContent) return;
    await navigator.clipboard.writeText(code.textContent.trimEnd());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="inline-flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-border/60 hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
    >
      {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

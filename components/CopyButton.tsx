"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

export function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    const code = buttonRef.current?.closest("[data-code-block]")?.querySelector("pre code");
    if (!code?.textContent) return;
    try {
      await navigator.clipboard.writeText(code.textContent.trimEnd());
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const label = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : "Copy code";

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-border/60 hover:text-fg print:hidden"
    >
      {status === "copied" ? (
        <Check className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Copied to clipboard" : status === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}

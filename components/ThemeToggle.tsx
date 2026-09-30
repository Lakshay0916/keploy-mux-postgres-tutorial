"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons are always rendered and swapped by the `dark` class (which next-themes sets
  // before paint), so there's no flash or hydration mismatch. They spin in via CSS (icon-in).
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <Sun className="theme-icon-sun size-4.5 dark:hidden" aria-hidden />
      <Moon className="theme-icon-moon hidden size-4.5 dark:block" aria-hidden />
    </button>
  );
}

import { Terminal } from "lucide-react";
import { site } from "@/lib/site";
import { GitHubIcon } from "./GitHubIcon";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  // The bottom border fades in once the page is scrolled (html[data-scrolled], see ScrollEffects).
  return (
    <header className="site-header sticky top-0 z-40 border-b border-transparent bg-bg/80 backdrop-blur-md transition-colors duration-200 print:hidden">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5 rounded-md font-semibold tracking-tight">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-zinc-950">
            <Terminal className="size-4" aria-hidden />
          </span>
          <span className="truncate">
            Keploy <span className="text-muted">×</span> Go
            <span className="hidden font-normal text-muted sm:inline"> · Mux + Postgres tutorial</span>
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-1">
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <GitHubIcon className="size-4.5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

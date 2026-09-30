import { Terminal } from "lucide-react";
import { site } from "@/lib/site";
import { GitHubIcon } from "./GitHubIcon";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-white">
            <Terminal className="size-4" aria-hidden />
          </span>
          <span className="truncate">
            Keploy <span className="text-muted">×</span> Go
            <span className="hidden font-normal text-muted sm:inline"> · Mux + Postgres tutorial</span>
          </span>
        </a>
        <div className="flex items-center gap-1">
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-brand"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

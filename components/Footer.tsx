import { site } from "@/lib/site";

const linkClass = "font-medium text-brand-fg underline-offset-4 hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-border print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Built with Next.js + MDX.</p>
        <nav aria-label="Footer" className="flex gap-5">
          <a href={site.repoUrl} className={linkClass}>
            Source on GitHub
          </a>
          <a href="https://keploy.io/docs/" className={linkClass}>
            Keploy docs
          </a>
        </nav>
      </div>
    </footer>
  );
}

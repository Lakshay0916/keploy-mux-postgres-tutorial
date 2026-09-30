import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Built with Next.js + MDX.</p>
        <p>
          <a href={site.repoUrl} className="font-medium text-brand-fg hover:underline">
            View the source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}

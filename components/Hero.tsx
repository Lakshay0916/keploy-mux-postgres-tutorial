import { ArrowDown, Clock } from "lucide-react";
import { readingTime } from "@/lib/reading-time";

type HeroProps = {
  title: string;
  subtitle: string;
  badges: string[];
  cta: { label: string; href: string };
};

export function Hero({ title, subtitle, badges, cta }: HeroProps) {
  return (
    <header className="not-prose relative isolate pt-8 pb-8 sm:pt-12 sm:pb-10">
      {/* Grid pattern + orange glow, faded out at the edges. Pure CSS, no images. */}
      <div aria-hidden className="hero-backdrop absolute inset-x-[-1rem] inset-y-0 -z-10 sm:inset-x-[-1.5rem]" />

      <ul aria-label="Stack" className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <li
            key={badge}
            className="rounded-full border border-border bg-bg/70 px-2.5 py-0.5 font-mono text-xs font-medium text-muted backdrop-blur"
          >
            {badge}
          </li>
        ))}
      </ul>

      <h1 className="mt-5 text-[clamp(1.875rem,1.25rem+2.6vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance text-fg">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">{subtitle}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={cta.href}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 print:hidden text-sm font-semibold text-zinc-950 shadow-sm transition-[background-color,transform] hover:bg-[#f7a064] active:translate-y-px"
        >
          {cta.label}
          <ArrowDown className="size-4" aria-hidden />
        </a>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <Clock className="size-4" aria-hidden />
          {readingTime()} min read
        </span>
      </div>
    </header>
  );
}

# Test a Go + Postgres API with Keploy

A single-page, static documentation site with a beginner-friendly tutorial: record real traffic from a [Gorilla Mux + Postgres sample API](https://github.com/keploy/samples-go/tree/main/mux-sql) with [Keploy](https://keploy.io) and replay it as tests, with the database mocked automatically.

**Live site:** https://keploy-mux-postgres-tutorial.vercel.app

The tutorial is based on a real run of Keploy's [Mux + Postgres quickstart](https://keploy.io/docs/quickstart/samples-mux/) (Docker Compose flavour, Keploy 3.8.49). It covers the gotchas I hit along the way and a "break it on purpose" experiment that shows a failing replay.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
npm run lint
```

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with the tutorial written in MDX via [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx)
- [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography`
- [`rehype-pretty-code`](https://rehype-pretty.pages.dev) + [Shiki](https://shiki.style) for syntax highlighting (separate light and dark themes)
- `remark-gfm`, `rehype-slug`, `rehype-autolink-headings` for tables and linkable headings
- [`next-themes`](https://github.com/pacocoursey/next-themes) for the dark/light toggle, [`lucide-react`](https://lucide.dev) for icons
- Deployed on [Vercel](https://vercel.com)

## Project structure

```text
app/
├── page.mdx              # the tutorial
├── layout.tsx            # header, article + table of contents, footer, metadata
├── globals.css           # theme tokens, prose, code block and step styles
├── icon.svg              # favicon
└── opengraph-image.tsx   # social preview image, generated at build time
components/
├── Hero.tsx              # title, badges, read time (computed at build) and CTA
├── Callout.tsx           # info / tip / warning / danger boxes
├── Steps.tsx             # numbered steps (built from ### headings)
├── Tabs.tsx              # accessible tabs (Docker Compose vs native)
├── CodeBlock.tsx         # code block header: filename or language + copy button
├── CopyButton.tsx
├── FlowDiagram.tsx       # record/replay diagram
├── Toc.tsx               # "On this page" sidebar (desktop) and collapsible bar (mobile)
├── ScrollEffects.tsx     # reading progress bar, back-to-top, header border on scroll
├── Header.tsx, Footer.tsx, ThemeToggle.tsx, GitHubIcon.tsx
lib/site.ts               # site title, description, repo URL
lib/reading-time.ts       # read-time estimate from the MDX source
mdx-components.tsx        # maps MDX elements to the components above
next.config.mjs           # MDX + remark/rehype plugin setup
```

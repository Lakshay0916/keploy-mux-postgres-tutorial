import { readFileSync } from "node:fs";
import { join } from "node:path";

const WORDS_PER_MINUTE = 230;

/** Minutes to read the tutorial's prose (code blocks, JSX and comments excluded). Runs at build time. */
export function readingTime(): number {
  const source = readFileSync(join(process.cwd(), "app/page.mdx"), "utf8")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<[^>]+>/g, " ");
  const words = source.match(/[A-Za-z0-9][\w'’-]*/g)?.length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

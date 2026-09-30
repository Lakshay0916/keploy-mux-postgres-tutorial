import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

const languageLabels: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  go: "Go",
  yaml: "YAML",
  json: "JSON",
  diff: "Diff",
  plaintext: "Output",
  text: "Output",
};

type CodeChildProps = {
  children?: ReactNode;
  "data-language"?: string;
  "data-rehype-pretty-code-title"?: string;
};

/**
 * Wraps the <figure> that rehype-pretty-code emits for every fenced block:
 * adds a header with the filename (from `title="..."`) or language, and a copy button.
 */
export function CodeBlock({ children }: ComponentProps<"figure">) {
  let title: ReactNode = null;
  let language = "";
  let pre: ReactNode = null;

  Children.forEach(children, (child) => {
    if (!isValidElement<CodeChildProps>(child)) return;
    if ("data-rehype-pretty-code-title" in child.props) {
      title = child.props.children;
    } else {
      pre = child;
      language = child.props["data-language"] ?? "";
    }
  });

  return (
    <figure data-code-block className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-code shadow-xs">
      <figcaption className="flex items-center justify-between gap-2 border-b border-border bg-surface/70 py-1 pr-1.5 pl-4">
        <span className="truncate font-mono text-xs text-muted">{title ?? languageLabels[language] ?? language}</span>
        <CopyButton />
      </figcaption>
      <div className="prose max-w-none">{pre}</div>
    </figure>
  );
}

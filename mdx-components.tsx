import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/Steps";
import { Tab, Tabs } from "@/components/Tabs";

type FigureProps = ComponentProps<"figure"> & { "data-rehype-pretty-code-figure"?: string };

const components: MDXComponents = {
  // rehype-pretty-code wraps every fenced block in a <figure>; give it a header and copy button.
  figure: (props: FigureProps) =>
    "data-rehype-pretty-code-figure" in props ? <CodeBlock {...props} /> : <figure {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" {...props} /> : <a href={href} {...props} />,
  // Tables scroll inside their own box on narrow screens instead of widening the page.
  table: (props: ComponentProps<"table">) => (
    <div className="table-wrap not-prose my-6 overflow-x-auto rounded-lg border border-border">
      <table {...props} />
    </div>
  ),
  Callout,
  FlowDiagram,
  Hero,
  Steps,
  Tab,
  Tabs,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

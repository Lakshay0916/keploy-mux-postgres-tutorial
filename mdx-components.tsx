import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Steps } from "@/components/Steps";
import { Tab, Tabs } from "@/components/Tabs";

type FigureProps = ComponentProps<"figure"> & { "data-rehype-pretty-code-figure"?: string };

const components: MDXComponents = {
  // rehype-pretty-code wraps every fenced block in a <figure>; give it a header and copy button.
  figure: (props: FigureProps) =>
    "data-rehype-pretty-code-figure" in props ? <CodeBlock {...props} /> : <figure {...props} />,
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("http") ? <a href={href} target="_blank" rel="noreferrer" {...props} /> : <a href={href} {...props} />,
  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Callout,
  FlowDiagram,
  Steps,
  Tab,
  Tabs,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

import { Info, Lightbulb, OctagonAlert, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

const variants = {
  info: {
    icon: Info,
    label: "Note",
    box: "border-brand/30 border-l-brand bg-brand/[0.06]",
    iconColor: "text-brand-fg",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    box: "border-emerald-500/30 border-l-emerald-500 bg-emerald-500/[0.06]",
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    label: "Heads up",
    box: "border-amber-500/30 border-l-amber-500 bg-amber-500/[0.07]",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  danger: {
    icon: OctagonAlert,
    label: "Careful",
    box: "border-red-500/30 border-l-red-500 bg-red-500/[0.06]",
    iconColor: "text-red-700 dark:text-red-400",
  },
};

type CalloutProps = {
  type?: keyof typeof variants;
  title?: string;
  children: ReactNode;
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, label, box, iconColor } = variants[type];

  // role="note" rather than <aside>: callouts are part of the flow, not separate landmarks.
  return (
    <div role="note" className={`callout my-7 flex gap-3 rounded-lg border border-l-4 px-4 py-3.5 ${box}`}>
      <Icon aria-hidden className={`mt-1 size-5 shrink-0 ${iconColor}`} />
      <div className="min-w-0 flex-1 text-[0.95rem] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        <p className="mt-0 mb-1 font-semibold text-fg">{title ?? label}</p>
        {children}
      </div>
    </div>
  );
}

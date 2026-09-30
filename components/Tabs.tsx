"use client";

import { createContext, useContext, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type TabsState = { active: string; baseId: string; items: string[] };

const TabsContext = createContext<TabsState | null>(null);

const toId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function Tabs({ items, children }: { items: string[]; children: ReactNode }) {
  const [active, setActive] = useState(items[0]);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys, Home and End move between tabs, per the WAI-ARIA tabs pattern.
  function onKeyDown(event: KeyboardEvent, index: number) {
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % items.length,
      ArrowLeft: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = targets[event.key];
    setActive(items[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <TabsContext.Provider value={{ active, baseId, items }}>
      <div className="my-6 overflow-hidden rounded-lg border border-border">
        <div role="tablist" aria-label="Setup options" className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-2">
          {items.map((item, index) => {
            const selected = item === active;
            return (
              <button
                key={item}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${toId(item)}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${toId(item)}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:-outline-offset-2 ${
                  selected ? "border-brand text-fg" : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="px-4 [&>div>*:first-child]:mt-4 [&>div>*:last-child]:mb-4">{children}</div>
      </div>
    </TabsContext.Provider>
  );
}

export function Tab({ value, children }: { value: string; children: ReactNode }) {
  const tabs = useContext(TabsContext);
  if (!tabs) throw new Error("<Tab> must be used inside <Tabs>");

  return (
    <div
      role="tabpanel"
      id={`${tabs.baseId}-panel-${toId(value)}`}
      aria-labelledby={`${tabs.baseId}-tab-${toId(value)}`}
      hidden={tabs.active !== value}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

import { ArrowRight, FileText } from "lucide-react";
import type { ReactNode } from "react";

function Node({ title, detail, keploy = false }: { title: string; detail: string; keploy?: boolean }) {
  return (
    <div
      className={`flex-1 rounded-lg border px-3 py-2.5 text-center ${
        keploy ? "border-brand/60 bg-brand/10" : "border-border bg-bg"
      }`}
    >
      <p className={`text-sm font-semibold ${keploy ? "text-brand-fg" : "text-fg"}`}>{title}</p>
      <p className="mt-0.5 text-xs text-muted">{detail}</p>
    </div>
  );
}

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center text-muted">
      <span className="font-mono text-[0.7rem]">{label}</span>
      <ArrowRight className="size-4 rotate-90 sm:rotate-0" aria-hidden />
    </div>
  );
}

function Row({ step, command, children, note }: { step: string; command: string; children: ReactNode; note: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-3 flex items-baseline justify-between gap-2 text-sm">
        <span className="font-semibold text-fg">{step}</span>
        <code className="font-mono text-xs text-muted">{command}</code>
      </p>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">{children}</div>
      <p className="mt-3 flex items-start gap-2 text-xs text-muted">
        <FileText className="mt-px size-3.5 shrink-0 text-brand-fg" aria-hidden />
        <span>{note}</span>
      </p>
    </div>
  );
}

export function FlowDiagram() {
  return (
    <figure className="not-prose my-8">
      <div className="space-y-4">
        <Row
          step="1 · Record"
          command="keploy record"
          note={
            <>
              Keploy sits on both hops (via eBPF) and saves each request/response as{" "}
              <code className="font-mono">tests/*.yaml</code> and every Postgres exchange in{" "}
              <code className="font-mono">mocks.yaml</code>.
            </>
          }
        >
          <Node title="Client" detail="curl / Postman" />
          <Arrow label="HTTP" />
          <Node title="Mux API" detail=":8010" />
          <Arrow label="SQL" />
          <Node title="Postgres" detail="real database" />
        </Row>
        <Row
          step="2 · Replay"
          command="keploy test"
          note="Keploy compares each live response with the recorded one. Postgres is never queried: the mocks answer instead."
        >
          <Node title="Keploy" detail="replays tests/*.yaml" keploy />
          <Arrow label="HTTP" />
          <Node title="Mux API" detail="same code, :8010" />
          <Arrow label="SQL" />
          <Node title="Keploy mocks" detail="answers from mocks.yaml" keploy />
        </Row>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted">
        The same app runs in both phases. Only who is on the other end of each connection changes.
      </figcaption>
    </figure>
  );
}

import { Badge } from "@/components/ui/badge";
import type { Decision } from "@/domain/decisions/types";

export function EvidencePanel({ decision }: { decision: Decision }) {
  return (
    <section className="rounded-md border bg-surface">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">Evidence</h2>
          <p className="text-xs text-muted-foreground">Traceable facts behind this recommendation.</p>
        </div>
        <Badge tone={decision.evidenceState === "complete" ? "success" : "warning"}>
          {decision.evidenceState}
        </Badge>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        {decision.evidence.map((line) => (
          <div key={line.label} className="border-b px-4 py-3 md:border-r">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{line.label}</div>
            <div className="mt-1 font-semibold tabular">{line.value}</div>
            {line.detail ? <div className="mt-1 text-xs text-muted-foreground">{line.detail}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CalculationBreakdown({ decision }: { decision: Decision }) {
  return (
    <section className="rounded-md border bg-surface">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">Calculation</h2>
        <p className="text-xs text-muted-foreground">Deterministic application code, not AI output.</p>
      </div>
      <div className="divide-y">
        {decision.calculation.map((step) => (
          <div key={step.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-muted-foreground">{step.label}</span>
            <span className="font-semibold tabular">{step.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CalculationBreakdown, EvidencePanel } from "@/components/decision/evidence-panel";
import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Metric } from "@/components/ui/metric";
import { getDecision, getDecisionMachine } from "@/domain/demo/seed";
import { formatCurrency } from "@/lib/utils";

export default function DecisionDetailPage({ params }: { params: { decisionId: string } }) {
  const decision = getDecision(params.decisionId);
  if (!decision) notFound();
  const machine = getDecisionMachine(decision);

  return (
    <PageShell
      title={decision.title}
      description={machine ? `${machine.make} ${machine.model} · Unit ${machine.unitNumber}` : "Machine unavailable"}
      actions={
        <div className="flex gap-2">
          <Button>Defer</Button>
          <Button variant="primary">
            <CheckCircle2 className="h-4 w-4" />
            Accept outcome
          </Button>
        </div>
      }
    >
      <section className="mb-6 grid rounded-md border bg-surface py-4 md:grid-cols-4">
        <Metric label="Recommendation" value="Review" detail={decision.status} />
        <Metric label="Financial impact" value={decision.financialImpact ? formatCurrency(decision.financialImpact) : "Review"} detail="Calculated opportunity" />
        <Metric label="Priority" value={decision.priority} detail="Rule output" />
        <Metric label="Evidence" value={decision.evidenceState} detail={decision.ruleVersion} />
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="rounded-md border bg-surface p-4">
            <Badge tone={decision.priority === "high" ? "danger" : decision.priority === "medium" ? "warning" : "info"}>
              {decision.priority}
            </Badge>
            <h2 className="mt-4 text-lg font-semibold">Recommendation</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{decision.recommendation}</p>
          </section>
          <EvidencePanel decision={decision} />
          <CalculationBreakdown decision={decision} />
        </div>
        <aside className="space-y-4">
          <section className="rounded-md border bg-surface p-4">
            <h2 className="text-sm font-semibold">Source chain</h2>
            <ol className="mt-4 space-y-3 text-sm">
              {["Decision", "Calculation", "Machine-day fact", "Canonical telemetry", "Raw payload"].map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full border bg-surface-muted text-xs tabular">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-md border bg-surface p-4">
            <h2 className="text-sm font-semibold">Raw payload access</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {decision.sourcePayloadIds.length} source payloads support this decision.
            </p>
            {machine ? (
              <Button asChild className="mt-4 w-full">
                <Link href={`/machines/${machine.id}`}>
                  Inspect source readings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

import Link from "next/link";
import { ArrowRight, Database, GitBranch } from "lucide-react";
import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, Td, Th } from "@/components/ui/data-table";
import { Metric } from "@/components/ui/metric";
import { decisions, machines } from "@/domain/demo/seed";
import { formatCurrency } from "@/lib/utils";

export default function OverviewPage() {
  const reporting = machines.filter((machine) => machine.lastReportingAt).length;
  const stale = machines.length - reporting;
  const active = machines.filter((machine) => machine.status === "active").length;
  const idle = machines.filter((machine) => machine.status === "idle").length;

  return (
    <PageShell
      title="Fleet Today"
      description="The fastest path to what needs attention, backed by coverage, source state, and decision evidence."
      actions={
        <Button asChild variant="primary">
          <Link href="/decisions">
            Review decisions <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <section className="mb-6 grid rounded-md border bg-surface py-4 md:grid-cols-5">
        <Metric label="Machines" value={String(machines.length)} detail="Demo tenant" />
        <Metric label="Reporting" value={String(reporting)} detail="Recent source feed" />
        <Metric label="No recent feed" value={String(stale)} detail="Needs attention" />
        <Metric label="Active" value={String(active)} detail="Measured activity" />
        <Metric label="Idle" value={String(idle)} detail="Above configured context" />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Top decisions</h2>
            <Badge tone="primary">{decisions.length} open</Badge>
          </div>
          <DataTable>
            <thead>
              <tr>
                <Th>Decision</Th>
                <Th>Machine</Th>
                <Th>Impact</Th>
                <Th>Evidence</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((decision) => {
                const machine = machines.find((item) => item.id === decision.machineId);
                return (
                  <tr key={decision.id} className="hover:bg-surface-muted/60">
                    <Td>
                      <Link href={`/decisions/${decision.id}`} className="font-medium text-primary hover:underline">
                        {decision.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">{decision.recommendation}</div>
                    </Td>
                    <Td>{machine ? `${machine.make} ${machine.model} · Unit ${machine.unitNumber}` : "Unknown"}</Td>
                    <Td className="font-semibold tabular">{decision.financialImpact ? formatCurrency(decision.financialImpact) : "Review"}</Td>
                    <Td>
                      <Badge tone={decision.evidenceState === "complete" ? "success" : "warning"}>
                        {decision.evidenceState}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge tone={decision.priority === "high" ? "danger" : decision.priority === "medium" ? "warning" : "info"}>
                        {decision.priority}
                      </Badge>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </DataTable>
        </div>

        <aside className="rounded-md border bg-surface p-4">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="mt-4 text-sm font-semibold">Data transparency</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Coverage</dt>
              <dd className="font-semibold tabular">92%</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Last received</dt>
              <dd className="font-semibold">12 minutes ago</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Needs mapping</dt>
              <dd className="font-semibold tabular">1</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Rule engine</dt>
              <dd className="font-semibold">Idle Agent v1.0.0</dd>
            </div>
          </dl>
          <div className="mt-4 rounded-md border bg-surface-muted p-3 text-xs text-muted-foreground">
            Missing data is never displayed as zero. Unsupported fuel data remains explicitly unsupported.
          </div>
        </aside>
      </section>

      <section className="rounded-md border bg-surface p-4">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">First vertical slice</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo tenant {"->"} machines {"->"} simulated telemetry {"->"} raw payload {"->"} canonical telemetry{" "}
          {"->"} machine-day fact {"->"} idle rule {"->"} evidence-backed decision.
        </p>
      </section>
    </PageShell>
  );
}

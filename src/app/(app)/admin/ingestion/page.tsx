import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";

export default function AdminIngestionPage() {
  return (
    <PageShell
      title="Admin Ingestion"
      description="Operational view for ingestion runs, job history, retries, and source health."
    >
      <section className="rounded-md border bg-surface p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">ingestion-run-demo-002</h2>
            <p className="mt-1 text-sm text-muted-foreground">Cat simulated adapter completed successfully.</p>
          </div>
          <Badge tone="success">completed</Badge>
        </div>
        <dl className="mt-4 grid gap-4 text-sm md:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Payloads</dt>
            <dd className="font-semibold tabular">1</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Retries</dt>
            <dd className="font-semibold tabular">0</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Correlation ID</dt>
            <dd className="font-mono text-xs">demo-correlation-002</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Tenant</dt>
            <dd className="font-semibold">Demo Construction Co.</dd>
          </div>
        </dl>
      </section>
    </PageShell>
  );
}

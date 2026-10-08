import { notFound } from "next/navigation";
import { Database, FileSearch } from "lucide-react";
import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Metric } from "@/components/ui/metric";
import { canonicalReadings, getMachine, machineDayFacts, rawPayloads } from "@/domain/demo/seed";
import { coveragePercent, sumMeasured } from "@/domain/telemetry/calculations";

export default function MachineDetailPage({ params }: { params: { machineId: string } }) {
  const machine = getMachine(params.machineId);
  if (!machine) notFound();

  const facts = machineDayFacts.filter((fact) => fact.machineId === machine.id);
  const idleHours = sumMeasured(facts.map((fact) => fact.idleHoursDelta));
  const engineHours = sumMeasured(facts.map((fact) => fact.engineHoursDelta));

  return (
    <PageShell
      title={`${machine.make} ${machine.model} · Unit ${machine.unitNumber}`}
      description="Machine identity, source coverage, canonical facts, and lineage for the demo vertical slice."
    >
      <section className="mb-6 grid rounded-md border bg-surface py-4 md:grid-cols-4">
        <Metric label="Engine hours delta" value={`${engineHours.toFixed(1)} h`} detail="Covered readings only" />
        <Metric label="Idle hours" value={`${idleHours.toFixed(1)} h`} detail="Missing data not distributed" />
        <Metric label="Coverage" value={`${coveragePercent(facts)}%`} detail={`${facts.length} machine-day facts`} />
        <Metric label="Mapping" value={machine.mappingStatus === "mapped" ? "Mapped" : "Needs mapping"} detail="Canonical identity" />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-md border bg-surface">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Database className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Canonical telemetry</h2>
          </div>
          <div className="divide-y">
            {canonicalReadings.map((reading) => (
              <div key={reading.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{reading.provider}</span>
                  <Badge tone="info">{reading.sourceTimestamp}</Badge>
                </div>
                <dl className="mt-3 grid grid-cols-3 gap-3">
                  <div>
                    <dt className="text-xs text-muted-foreground">Engine hours</dt>
                    <dd className="font-semibold tabular">{reading.engineHours.value} h</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Idle hours</dt>
                    <dd className="font-semibold tabular">{reading.idleHours.value} h</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Fuel</dt>
                    <dd className="font-semibold">{reading.fuelConsumed.state}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border bg-surface">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <FileSearch className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Raw payload lineage</h2>
          </div>
          <div className="divide-y">
            {rawPayloads.map((payload) => (
              <div key={payload.id} className="px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">{payload.provider}</span>
                  <Badge tone="success">HTTP {payload.httpStatus}</Badge>
                </div>
                <dl className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Checksum</dt>
                    <dd className="font-mono">{payload.checksum}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Ingestion run</dt>
                    <dd>{payload.ingestionRunId}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Content type</dt>
                    <dd>{payload.contentType}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

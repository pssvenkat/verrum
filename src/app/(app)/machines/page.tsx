import Link from "next/link";
import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { DataTable, Td, Th } from "@/components/ui/data-table";
import { machines } from "@/domain/demo/seed";

export default function MachinesPage() {
  return (
    <PageShell
      title="Machines"
      description="Canonical machine identities. Provider assets are not trusted until mapped."
    >
      <DataTable>
        <thead>
          <tr>
            <Th>Machine</Th>
            <Th>Category</Th>
            <Th>Site</Th>
            <Th>Mapping</Th>
            <Th>Last reporting</Th>
            <Th>Data quality</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="hover:bg-surface-muted/60">
              <Td>
                <Link href={`/machines/${machine.id}`} className="font-medium text-primary hover:underline">
                  {machine.make} {machine.model} · Unit {machine.unitNumber}
                </Link>
                <div className="text-xs text-muted-foreground">{machine.serialNumber}</div>
              </Td>
              <Td>{machine.category}</Td>
              <Td>{machine.site}</Td>
              <Td>
                <Badge tone={machine.mappingStatus === "mapped" ? "success" : "warning"}>
                  {machine.mappingStatus === "mapped" ? "Mapped" : "Needs mapping"}
                </Badge>
              </Td>
              <Td>{machine.lastReportingAt ? "12 minutes ago" : "No recent feed"}</Td>
              <Td>
                <Badge tone={machine.dataQuality === "good" ? "success" : machine.dataQuality === "partial" ? "warning" : "danger"}>
                  {machine.dataQuality}
                </Badge>
              </Td>
              <Td>{machine.status.replace("_", " ")}</Td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </PageShell>
  );
}

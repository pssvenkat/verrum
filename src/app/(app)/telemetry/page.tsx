import { PageShell } from "@/components/layout/app-shell";
import { DataTable, Td, Th } from "@/components/ui/data-table";
import { rawPayloads } from "@/domain/demo/seed";

export default function TelemetryPage() {
  return (
    <PageShell
      title="Telemetry"
      description="Raw source payloads are preserved separately from canonical readings and derived facts."
    >
      <DataTable>
        <thead>
          <tr>
            <Th>Payload</Th>
            <Th>Provider</Th>
            <Th>Endpoint</Th>
            <Th>Received</Th>
            <Th>Status</Th>
            <Th>Checksum</Th>
          </tr>
        </thead>
        <tbody>
          {rawPayloads.map((payload) => (
            <tr key={payload.id}>
              <Td className="font-mono text-xs">{payload.id}</Td>
              <Td>{payload.provider}</Td>
              <Td>{payload.endpoint}</Td>
              <Td>{payload.receivedAt}</Td>
              <Td>{payload.httpStatus}</Td>
              <Td className="font-mono text-xs">{payload.checksum}</Td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </PageShell>
  );
}

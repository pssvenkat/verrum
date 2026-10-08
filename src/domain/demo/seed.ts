import { evaluateIdleDecision } from "@/domain/decisions/idle-agent";
import type { Decision } from "@/domain/decisions/types";
import { buildMachineDayFact, measured, missing } from "@/domain/telemetry/calculations";
import type { CanonicalTelemetryReading, MachineDayFact, RawTelemetryPayload } from "@/domain/telemetry/types";

export type Machine = {
  id: string;
  tenantId: string;
  unitNumber: string;
  make: string;
  model: string;
  category: string;
  serialNumber: string;
  site: string;
  status: "active" | "idle" | "service_due" | "stale";
  mappingStatus: "mapped" | "needs_mapping";
  lastReportingAt: string | null;
  dataQuality: "good" | "partial" | "poor";
};

export const demoTenant = {
  id: "tenant-demo-construction",
  name: "Demo Construction Co."
};

const machineTemplates = [
  ["Caterpillar", "336", "Excavator"],
  ["Komatsu", "WA380", "Wheel Loader"],
  ["John Deere", "744", "Wheel Loader"],
  ["Volvo", "A40G", "Hauler"],
  ["CASE", "CX210", "Excavator"],
  ["Bobcat", "T770", "Compact Track Loader"]
] as const;

export const machines: Machine[] = Array.from({ length: 35 }, (_, index) => {
  const template = machineTemplates[index % machineTemplates.length];
  const unit = String(index + 1).padStart(3, "0");
  const stale = index > 30;
  return {
    id: `machine-${unit}`,
    tenantId: demoTenant.id,
    unitNumber: unit,
    make: template[0],
    model: template[1],
    category: template[2],
    serialNumber: `VRM-${template[0].slice(0, 3).toUpperCase()}-${unit}`,
    site: ["North Yard", "Riverbend Site", "Quarry East", "Depot"][index % 4],
    status: stale ? "stale" : index % 9 === 0 ? "service_due" : index % 3 === 0 ? "idle" : "active",
    mappingStatus: index === 34 ? "needs_mapping" : "mapped",
    lastReportingAt: stale ? null : "2026-10-08T09:45:00.000Z",
    dataQuality: stale ? "poor" : index % 5 === 0 ? "partial" : "good"
  };
});

export const rawPayloads: RawTelemetryPayload[] = [
  {
    id: "raw-cat-336-142-previous",
    tenantId: demoTenant.id,
    provider: "cat-telematics-simulated",
    endpoint: "/assets/142/history",
    providerAssetId: "CAT-336-142",
    receivedAt: "2026-10-07T14:22:00.000Z",
    sourceTimestamp: "2026-10-07T14:20:00.000Z",
    httpStatus: 200,
    contentType: "application/json",
    checksum: "sha256:1d3b3a5b7a7d",
    ingestionRunId: "ingestion-run-demo-001",
    payload: {
      assetId: "CAT-336-142",
      engineHours: 1234.7,
      idleHours: 412.5,
      fuelConsumed: null
    }
  },
  {
    id: "raw-cat-336-142-current",
    tenantId: demoTenant.id,
    provider: "cat-telematics-simulated",
    endpoint: "/assets/142/history",
    providerAssetId: "CAT-336-142",
    receivedAt: "2026-10-08T14:22:00.000Z",
    sourceTimestamp: "2026-10-08T14:20:00.000Z",
    httpStatus: 200,
    contentType: "application/json",
    checksum: "sha256:ba90f544a827",
    ingestionRunId: "ingestion-run-demo-002",
    payload: {
      assetId: "CAT-336-142",
      engineHours: 1286.4,
      idleHours: 455.7,
      fuelConsumed: null
    }
  }
];

export const canonicalReadings: CanonicalTelemetryReading[] = [
  {
    id: "reading-cat-336-142-previous",
    rawPayloadId: rawPayloads[0].id,
    tenantId: demoTenant.id,
    machineId: "machine-001",
    provider: rawPayloads[0].provider,
    sourceTimestamp: rawPayloads[0].sourceTimestamp,
    engineHours: measured(1234.7, "h"),
    idleHours: measured(412.5, "h"),
    fuelConsumed: missing("unsupported", "gal")
  },
  {
    id: "reading-cat-336-142-current",
    rawPayloadId: rawPayloads[1].id,
    tenantId: demoTenant.id,
    machineId: "machine-001",
    provider: rawPayloads[1].provider,
    sourceTimestamp: rawPayloads[1].sourceTimestamp,
    engineHours: measured(1286.4, "h"),
    idleHours: measured(455.7, "h"),
    fuelConsumed: missing("unsupported", "gal")
  }
];

const historicalMachineDayFacts: MachineDayFact[] = Array.from({ length: 29 }, (_, index) => ({
    id: `fact-machine-001-${index + 1}`,
    tenantId: demoTenant.id,
    machineId: "machine-001",
    date: `2026-09-${String(index + 8).padStart(2, "0")}`,
    covered: index !== 6 && index !== 17,
    engineHoursDelta: measured(index % 4 === 0 ? 0.8 : 1.4, "h"),
    idleHoursDelta: measured(index % 4 === 0 ? 1.2 : 0.4, "h"),
    dataQuality: index === 6 || index === 17 ? "partial" : "good",
    sourceReadingIds: []
  }));

export const machineDayFacts: MachineDayFact[] = [
  ...historicalMachineDayFacts,
  buildMachineDayFact({
    id: "fact-machine-001-current",
    date: "2026-10-08",
    previous: canonicalReadings[0],
    current: canonicalReadings[1]
  })
];

export const decisions: Decision[] = [
  evaluateIdleDecision({
    tenantId: demoTenant.id,
    machineId: "machine-001",
    machineLabel: "Caterpillar 336 · Unit 001",
    facts: machineDayFacts,
    idleThresholdHours: 20,
    configuredCostPerIdleHour: 65.74,
    sourcePayloadIds: rawPayloads.map((payload) => payload.id)
  }),
  {
    id: "decision-rent-komatsu-002",
    tenantId: demoTenant.id,
    machineId: "machine-002",
    type: "idle_review",
    title: "Consider renting",
    recommendation: "Observed utilization is below the configured ownership threshold.",
    priority: "medium",
    status: "reviewing",
    financialImpact: 1920,
    createdAt: "2026-10-08T08:00:00.000Z",
    evidenceState: "partial",
    evidence: [
      { label: "Active days", value: "7 / 30" },
      { label: "Coverage", value: "87%" }
    ],
    calculation: [
      { label: "Observed ownership cost", value: "$4,210" },
      { label: "Comparable rental cost", value: "$2,290" }
    ],
    sourcePayloadIds: [],
    ruleVersion: "own-rent-rule.demo",
    agentVersion: "own-rent-agent.demo"
  },
  {
    id: "decision-service-jd-003",
    tenantId: demoTenant.id,
    machineId: "machine-003",
    type: "idle_review",
    title: "Service due",
    recommendation: "Schedule service before the next operating window.",
    priority: "info",
    status: "new",
    financialImpact: 0,
    createdAt: "2026-10-08T07:20:00.000Z",
    evidenceState: "complete",
    evidence: [
      { label: "Due in", value: "12 days" },
      { label: "Source", value: "Service interval rule" }
    ],
    calculation: [{ label: "Configured interval", value: "500 h" }],
    sourcePayloadIds: [],
    ruleVersion: "service-rule.demo",
    agentVersion: "service-agent.demo"
  }
].filter(Boolean) as Decision[];

export function getMachine(machineId: string) {
  return machines.find((machine) => machine.id === machineId);
}

export function getDecision(decisionId: string) {
  return decisions.find((decision) => decision.id === decisionId);
}

export function getDecisionMachine(decision: Decision) {
  return getMachine(decision.machineId);
}

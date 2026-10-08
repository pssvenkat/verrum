import type { Decision } from "./types";
import { coveragePercent, sumMeasured } from "@/domain/telemetry/calculations";
import type { MachineDayFact } from "@/domain/telemetry/types";

export type IdleAgentInput = {
  tenantId: string;
  machineId: string;
  machineLabel: string;
  facts: MachineDayFact[];
  idleThresholdHours: number;
  configuredCostPerIdleHour: number;
  sourcePayloadIds: string[];
};

export const idleAgent = {
  id: "idle-agent",
  name: "Idle Agent",
  version: "1.0.0",
  ruleVersion: "idle-rule.2026-10-08"
};

export function evaluateIdleDecision(input: IdleAgentInput): Decision | null {
  const coveredFacts = input.facts.filter((fact) => fact.covered);
  const idleHours = sumMeasured(coveredFacts.map((fact) => fact.idleHoursDelta));
  const coverage = coveragePercent(input.facts);

  if (coveredFacts.length === 0 || idleHours <= input.idleThresholdHours) {
    return null;
  }

  const impact = idleHours * input.configuredCostPerIdleHour;
  const priority = impact >= 2500 ? "high" : impact >= 1000 ? "medium" : "low";

  return {
    id: "decision-idle-cat-336-142",
    tenantId: input.tenantId,
    machineId: input.machineId,
    type: "idle_review",
    title: "High idle time",
    recommendation: "Review whether this machine should remain assigned to the current site.",
    priority,
    status: "new",
    financialImpact: impact,
    createdAt: "2026-10-08T10:30:00.000Z",
    evidenceState: coverage >= 80 ? "complete" : "partial",
    evidence: [
      { label: "Idle hours", value: `${idleHours.toFixed(1)} h`, detail: "Measured over covered days only" },
      { label: "Covered days", value: `${coveredFacts.length} / ${input.facts.length}` },
      { label: "Idle threshold", value: `${input.idleThresholdHours.toFixed(1)} h` },
      { label: "Source coverage", value: `${coverage}%` },
      { label: "Machine", value: input.machineLabel }
    ],
    calculation: [
      { label: "Measured idle hours", value: `${idleHours.toFixed(1)} h` },
      { label: "Configured idle cost", value: `$${input.configuredCostPerIdleHour.toFixed(2)} / h` },
      { label: "Calculated opportunity", value: `$${impact.toFixed(2)}` }
    ],
    sourcePayloadIds: input.sourcePayloadIds,
    ruleVersion: idleAgent.ruleVersion,
    agentVersion: idleAgent.version
  };
}

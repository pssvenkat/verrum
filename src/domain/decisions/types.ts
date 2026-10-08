export type DecisionPriority = "high" | "medium" | "low" | "info";
export type DecisionStatus = "new" | "reviewing" | "approved" | "rejected" | "deferred" | "completed";

export type EvidenceLine = {
  label: string;
  value: string;
  detail?: string;
};

export type CalculationStep = {
  label: string;
  value: string;
};

export type Decision = {
  id: string;
  tenantId: string;
  machineId: string;
  type: "idle_review";
  title: string;
  recommendation: string;
  priority: DecisionPriority;
  status: DecisionStatus;
  financialImpact: number;
  createdAt: string;
  evidenceState: "complete" | "partial" | "blocked";
  evidence: EvidenceLine[];
  calculation: CalculationStep[];
  sourcePayloadIds: string[];
  ruleVersion: string;
  agentVersion: string;
};

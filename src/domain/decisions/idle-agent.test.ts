import { describe, expect, it } from "vitest";
import { evaluateIdleDecision } from "./idle-agent";
import { machineDayFacts } from "@/domain/demo/seed";

describe("idle agent", () => {
  it("generates an evidence-backed idle decision from measured facts", () => {
    const decision = evaluateIdleDecision({
      tenantId: "tenant-test",
      machineId: "machine-test",
      machineLabel: "CAT 336 · Unit 142",
      facts: machineDayFacts,
      idleThresholdHours: 20,
      configuredCostPerIdleHour: 65.74,
      sourcePayloadIds: ["raw-1"]
    });

    expect(decision).not.toBeNull();
    expect(decision?.title).toBe("High idle time");
    expect(decision?.calculation.some((step) => step.label === "Calculated opportunity")).toBe(true);
    expect(decision?.sourcePayloadIds).toEqual(["raw-1"]);
  });
});

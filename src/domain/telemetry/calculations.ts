import type { CanonicalTelemetryReading, CounterDeltaResult, MachineDayFact, ReadingValue } from "./types";

const tolerance = 0.05;

export function measured(value: number, unit: string): ReadingValue {
  return { value, unit, state: "measured" };
}

export function missing(state: ReadingValue["state"], unit: string): ReadingValue {
  return { value: null, unit, state };
}

export function calculateCounterDelta(previous: ReadingValue, current: ReadingValue): CounterDeltaResult {
  if (previous.value === null || current.value === null) {
    return {
      delta: missing("no_reading", current.unit),
      issue: "missing_reading"
    };
  }

  const delta = current.value - previous.value;

  if (delta < -tolerance) {
    return {
      delta: missing("unavailable", current.unit),
      issue: "counter_moved_backwards"
    };
  }

  return {
    delta: measured(Math.max(0, delta), current.unit)
  };
}

export function buildMachineDayFact({
  id,
  date,
  previous,
  current
}: {
  id: string;
  date: string;
  previous: CanonicalTelemetryReading;
  current: CanonicalTelemetryReading;
}): MachineDayFact {
  const engineHours = calculateCounterDelta(previous.engineHours, current.engineHours);
  const idleHours = calculateCounterDelta(previous.idleHours, current.idleHours);
  const issues = [engineHours.issue, idleHours.issue].filter(Boolean);

  return {
    id,
    tenantId: current.tenantId,
    machineId: current.machineId,
    date,
    covered: issues.length === 0,
    engineHoursDelta: engineHours.delta,
    idleHoursDelta: idleHours.delta,
    dataQuality: issues.length === 0 ? "good" : "partial",
    sourceReadingIds: [previous.id, current.id]
  };
}

export function coveragePercent(facts: MachineDayFact[]) {
  if (facts.length === 0) return 0;
  const covered = facts.filter((fact) => fact.covered).length;
  return Math.round((covered / facts.length) * 100);
}

export function sumMeasured(values: ReadingValue[]) {
  return values.reduce((total, value) => total + (value.value ?? 0), 0);
}

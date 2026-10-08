export type MissingReason =
  | "unsupported"
  | "not_provided"
  | "no_reading"
  | "stale"
  | "disconnected"
  | "unavailable"
  | "not_applicable"
  | "unknown"
  | "zero"
  | "estimated";

export type ReadingValue = {
  value: number | null;
  unit: string;
  state: "measured" | MissingReason;
};

export type RawTelemetryPayload = {
  id: string;
  tenantId: string;
  provider: string;
  endpoint: string;
  providerAssetId: string;
  receivedAt: string;
  sourceTimestamp: string;
  httpStatus: number;
  contentType: string;
  checksum: string;
  ingestionRunId: string;
  payload: unknown;
};

export type CanonicalTelemetryReading = {
  id: string;
  rawPayloadId: string;
  tenantId: string;
  machineId: string;
  provider: string;
  sourceTimestamp: string;
  engineHours: ReadingValue;
  idleHours: ReadingValue;
  fuelConsumed: ReadingValue;
};

export type MachineDayFact = {
  id: string;
  tenantId: string;
  machineId: string;
  date: string;
  covered: boolean;
  engineHoursDelta: ReadingValue;
  idleHoursDelta: ReadingValue;
  dataQuality: "good" | "partial" | "poor";
  sourceReadingIds: string[];
};

export type CounterDeltaResult = {
  delta: ReadingValue;
  issue?: "counter_moved_backwards" | "missing_reading";
};

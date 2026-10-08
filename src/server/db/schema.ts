import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const decisionPriority = pgEnum("decision_priority", ["high", "medium", "low", "info"]);
export const decisionStatus = pgEnum("decision_status", [
  "new",
  "reviewing",
  "approved",
  "rejected",
  "deferred",
  "completed"
]);
export const readingState = pgEnum("reading_state", [
  "measured",
  "unsupported",
  "not_provided",
  "no_reading",
  "stale",
  "disconnected",
  "unavailable",
  "not_applicable",
  "unknown",
  "zero",
  "estimated"
]);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  email: text("email").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const machines = pgTable("machines", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  unitNumber: text("unit_number").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  category: text("category").notNull(),
  serialNumber: text("serial_number").notNull(),
  site: text("site").notNull(),
  status: text("status").notNull(),
  mappingStatus: text("mapping_status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const providerAssets = pgTable("provider_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  provider: text("provider").notNull(),
  providerAssetId: text("provider_asset_id").notNull(),
  machineId: uuid("machine_id").references(() => machines.id),
  mappingConfidence: integer("mapping_confidence").notNull().default(0),
  rawIdentity: jsonb("raw_identity").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const ingestionRuns = pgTable("ingestion_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  provider: text("provider").notNull(),
  status: text("status").notNull(),
  correlationId: text("correlation_id").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true })
});

export const rawTelemetryPayloads = pgTable("raw_telemetry_payloads", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  ingestionRunId: uuid("ingestion_run_id").notNull().references(() => ingestionRuns.id),
  provider: text("provider").notNull(),
  endpoint: text("endpoint").notNull(),
  providerAssetId: text("provider_asset_id").notNull(),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
  sourceTimestamp: timestamp("source_timestamp", { withTimezone: true }),
  httpStatus: integer("http_status").notNull(),
  contentType: text("content_type").notNull(),
  checksum: text("checksum").notNull(),
  payload: jsonb("payload").notNull()
});

export const canonicalTelemetryReadings = pgTable("canonical_telemetry_readings", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  machineId: uuid("machine_id").notNull().references(() => machines.id),
  rawPayloadId: uuid("raw_payload_id").notNull().references(() => rawTelemetryPayloads.id),
  provider: text("provider").notNull(),
  sourceTimestamp: timestamp("source_timestamp", { withTimezone: true }).notNull(),
  engineHoursValue: decimal("engine_hours_value"),
  engineHoursState: readingState("engine_hours_state").notNull(),
  idleHoursValue: decimal("idle_hours_value"),
  idleHoursState: readingState("idle_hours_state").notNull(),
  fuelConsumedValue: decimal("fuel_consumed_value"),
  fuelConsumedState: readingState("fuel_consumed_state").notNull()
});

export const machineDayFacts = pgTable("machine_day_facts", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  machineId: uuid("machine_id").notNull().references(() => machines.id),
  date: timestamp("date", { withTimezone: true }).notNull(),
  covered: boolean("covered").notNull(),
  engineHoursDeltaValue: decimal("engine_hours_delta_value"),
  engineHoursDeltaState: readingState("engine_hours_delta_state").notNull(),
  idleHoursDeltaValue: decimal("idle_hours_delta_value"),
  idleHoursDeltaState: readingState("idle_hours_delta_state").notNull(),
  dataQuality: text("data_quality").notNull(),
  sourceReadingIds: jsonb("source_reading_ids").notNull()
});

export const decisions = pgTable("decisions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id),
  machineId: uuid("machine_id").notNull().references(() => machines.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  recommendation: text("recommendation").notNull(),
  priority: decisionPriority("priority").notNull(),
  status: decisionStatus("status").notNull(),
  financialImpact: decimal("financial_impact"),
  evidence: jsonb("evidence").notNull(),
  calculation: jsonb("calculation").notNull(),
  sourcePayloadIds: jsonb("source_payload_ids").notNull(),
  ruleVersion: text("rule_version").notNull(),
  agentVersion: text("agent_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

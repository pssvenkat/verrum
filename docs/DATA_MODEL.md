# Data Model

## Status

Initial Drizzle schema added in `src/server/db/schema.ts`.

## Purpose

Define VERRUM entities, relationships, constraints, and persistence rules.

## To Be Defined

## Initial Entities

- Organizations
- Users
- Machines
- Provider assets
- Ingestion runs
- Raw telemetry payloads
- Canonical telemetry readings
- Machine-day facts
- Decisions

## Important Separation

Provider data, canonical data, derived facts, business rules, decisions, and outcomes must remain separate layers.

## Notes

Keep this document aligned with schema files as migrations are added.

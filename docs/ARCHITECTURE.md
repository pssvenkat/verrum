# Architecture

## Status

Initial Next.js application foundation implemented.

## Purpose

Document the technical structure of VERRUM once product requirements are known.

## To Be Defined

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Radix-compatible UI primitives
- Lucide icons
- Drizzle ORM
- PostgreSQL
- Vitest

## Current Boundaries

- `src/app`: routes and application screens
- `src/components`: reusable UI and layout components
- `src/domain`: deterministic domain logic for telemetry and decisions
- `src/server/db`: Drizzle schema
- `src/server/permissions`: tenant boundary helpers

## Data Plane

Raw telemetry payloads are modeled separately from canonical telemetry and machine-day facts.

## Decision Plane

The Idle Agent evaluates machine-day facts and produces evidence-backed decisions with rule and agent versions.

## Principles

- Prefer simple, explicit architecture until requirements justify complexity.
- Keep project memory in the repository.
- Record material architectural decisions in `docs/DECISION_LOG.md`.

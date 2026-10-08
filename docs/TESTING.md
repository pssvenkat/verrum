# Testing

## Status

Initial Vitest coverage added for telemetry counter calculations and Idle Agent decision generation.

## Purpose

Define how VERRUM will be verified as implementation begins.

## To Be Defined

## Current Checks

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`

## Current Unit Coverage

- Cumulative counter delta calculations
- Backward counter rejection
- Missing reading handling
- Idle decision generation with evidence and source payload IDs

## Principle

Testing should scale with risk and protect the core workflows described in `docs/PRODUCT_SPEC.md`.

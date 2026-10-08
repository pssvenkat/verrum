# Product Specification

## Status

Initial product brief captured from `docs/MASTER_APP_BUILD_PROMPT.md`.

## Purpose

VERRUM is a self-hosted fleet intelligence and decision-support platform for organizations operating heavy equipment and other physical assets.

## To Be Defined

## Target Users

- Equipment managers
- Fleet managers
- Operations managers
- Owners and administrators responsible for equipment decisions

## Core Product Flow

```text
Machine data -> normalized facts -> business rules -> evidence -> decisions -> outcomes
```

## First Vertical Slice

- Demo tenant
- 35 demo machines
- Simulated telemetry
- Raw payload preservation
- Canonical telemetry readings
- Machine-day facts
- Idle rule
- Evidence-backed idle decision
- Decision detail page with calculation and source chain

## Non-Goals

- Generic BI dashboard
- GPS tracking product
- Predictive maintenance product
- AI system that invents or changes numbers
- System that hides uncertainty or missing data

## Notes

The product's value is in traceable decisions, not vanity dashboard metrics.

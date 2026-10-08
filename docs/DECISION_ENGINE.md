# Decision Engine

## Status

Initial deterministic Idle Agent implemented in `src/domain/decisions/idle-agent.ts`.

## Purpose

Describe any rule-based, algorithmic, AI-assisted, scoring, recommendation, ranking, or workflow decision logic used by VERRUM.

## To Be Defined

## Initial Agent

Idle Agent:

- Inputs: machine-day facts, idle threshold, configured idle cost
- Output: idle review decision
- Evidence: idle hours, covered days, threshold, source coverage, machine label
- Calculation: measured idle hours multiplied by configured idle cost
- Versioned with agent and rule version strings

## Notes

Agents are deterministic decision engines with optional future AI explanation. LLMs must not alter readings, calculations, thresholds, or financial figures.

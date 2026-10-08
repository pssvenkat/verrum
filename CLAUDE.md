# VERRUM Project Memory

This file is the entry point for future Claude Code sessions working on VERRUM.

## Mission

VERRUM is being initialized as a durable software project. The repository must act as the source of truth across sessions, model changes, context loss, and contributor handoffs.

## Current Phase

Product definition. Do not build the application until the master app-build prompt, product specification, and implementation plan are intentionally updated.

## Required Reading Order

Before making project changes, read:

1. `docs/PROJECT_STATE.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/ARCHITECTURE.md`
4. `docs/IMPLEMENTATION_PLAN.md`
5. `docs/DECISION_LOG.md`
6. Relevant files under `.claude/rules/`

## Working Rules

- Treat repository documents as project memory.
- Update `docs/PROJECT_STATE.md` whenever meaningful progress is made.
- Record non-trivial product or technical decisions in `docs/DECISION_LOG.md`.
- Keep documentation synchronized with implementation as code is added.
- Preserve existing user-created files unless the user explicitly approves changing them.
- Do not rely on conversation history as permanent project state.

## Bootstrap Note

The original bootstrap prompt was removed from the repository at the user's request. The durable project memory now lives in `CLAUDE.md`, `docs/`, and `.claude/rules/`.

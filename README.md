# VERRUM

VERRUM is currently in product-definition mode.

This repository is the long-term source of truth for product intent, architecture, engineering decisions, implementation state, and future handoffs.

## Start Here

Read these files first in a new development session:

1. `CLAUDE.md`
2. `docs/MASTER_APP_BUILD_PROMPT.md`
3. `docs/PROJECT_STATE.md`
4. `docs/IMPLEMENTATION_PLAN.md`
5. `docs/DECISION_LOG.md`

The master app-build prompt is preserved in `docs/MASTER_APP_BUILD_PROMPT.md`.

## Repository Layout

```text
.
├── CLAUDE.md
├── README.md
├── docs/
├── .claude/rules/
└── .gitignore
```

## Local Setup

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Optional local PostgreSQL:

```bash
docker compose up -d
```

## Current Status

The project memory scaffold, master app-build prompt, Next.js foundation, Modern Clean token system, Drizzle schema, demo tenant data, deterministic telemetry calculations, Idle Agent, and first evidence-backed decision slice are present.

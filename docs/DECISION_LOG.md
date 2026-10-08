# Decision Log

Record durable product and engineering decisions here.

## 2026-10-08: Bootstrap Repository In Place

Decision: Use `C:\Users\venka\OneDrive\Documents\Verrum` as the VERRUM repository path.

Rationale: The initial bootstrap instructions identified this path as the project repository. The requested `C:\Users\venka\OneDrive\Documents\V` path was not present, while `Verrum` existed.

Impact: The repository was initialized at the intended Verrum path.

## 2026-10-08: Documentation Before Application Code

Decision: Create the project-memory and documentation scaffold before adding application code.

Rationale: The initial task required durable project memory first and no full application build during repository bootstrap.

Impact: Product, architecture, data, security, and testing documents now exist as structured placeholders for future work.

## 2026-10-08: Remove Bootstrap Prompt

Decision: Remove `1.VERRUM_CLAUDE_BOOTSTRAP_PROMPT.md` from the repository.

Rationale: The user requested that the bootstrap prompt be removed after repository initialization.

Impact: Repository memory now lives in `CLAUDE.md`, `docs/`, and `.claude/rules/`. A master app-build prompt is still not present and should be added before application implementation.

## 2026-10-08: Add Master App-Build Prompt

Decision: Preserve the user's full Verrum master app-build prompt at `docs/MASTER_APP_BUILD_PROMPT.md`.

Rationale: The prompt defines the product principles, architecture, design direction, stack, implementation strategy, and first vertical slice for Verrum.

Impact: Future implementation should use this file as the governing product and engineering brief.

## 2026-10-08: Establish Next.js Production Foundation

Decision: Build Verrum as a TypeScript-first Next.js App Router application with Tailwind semantic tokens, Drizzle ORM, PostgreSQL schema, and deterministic domain logic.

Rationale: This matches the master app-build prompt while keeping the first implementation modular and self-hostable.

Impact: The repository now has a working application foundation and first demo vertical slice. Persistence, migrations, authentication, and background jobs are the next major production gaps.

## 2026-10-08: Keep First Slice Deterministic

Decision: Implement telemetry calculations and the Idle Agent as deterministic domain code.

Rationale: Verrum must not invent missing data, distribute values across gaps, or allow AI to alter numerical calculations.

Impact: Counter deltas, missing readings, and idle decisions are unit-tested and traceable through source payload IDs.

# Decision Log

Record durable product and engineering decisions here.

## 2026-10-08: Bootstrap Repository In Place

Decision: Use `C:\Users\venka\OneDrive\Documents\Verrum` as the VERRUM repository path.

Rationale: The preserved bootstrap prompt identifies this path as the project repository. The requested `C:\Users\venka\OneDrive\Documents\V` path was not present, while `Verrum` existed and contained the bootstrap prompt.

Impact: The existing bootstrap prompt remains untouched. The repository is initialized around it.

## 2026-10-08: Documentation Before Application Code

Decision: Create the project-memory and documentation scaffold before adding application code.

Rationale: The bootstrap prompt explicitly says not to build the full application during this task and to establish durable project memory first.

Impact: Product, architecture, data, security, and testing documents now exist as structured placeholders for future work.

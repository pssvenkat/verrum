You are building Verrum from scratch as a production-quality application.

Do not treat this as a prototype, landing-page exercise, or generic SaaS dashboard.

Verrum is a self-hosted fleet intelligence and decision platform for organizations operating heavy equipment and other physical assets.

The core product idea is:

    MACHINE DATA IN
           ↓
    NORMALIZED FACTS
           ↓
    BUSINESS RULES
           ↓
    EVIDENCE
           ↓
    DECISIONS
           ↓
    OUTCOMES

The product should help an Equipment Manager, Fleet Manager, Operations Manager, owner, or administrator answer:

- What happened?
- What is happening?
- Which machines are actually working?
- Which machines are sitting idle?
- What is each machine costing us?
- Which equipment should we own, rent, repair, replace, transfer, or review?
- What evidence supports that recommendation?
- How much money is involved?
- What data is missing?
- What assumptions were used?
- What happened after we made the decision?

Verrum is NOT:

- a generic fleet map
- a GPS tracking product
- a telematics hardware company
- a generic BI dashboard
- a predictive-maintenance product
- an AI chatbot pretending to understand machines
- a system that invents missing data
- a system that hides uncertainty

Verrum is a decision-support and operational intelligence system.

The application must be modular from day one so that new integrations, decision agents, rules, pages, industries, terminology, and workflows can be added without restructuring the application.

==================================================
1. PRODUCT PRINCIPLES
==================================================

These are non-negotiable.

1. RAW DATA IS IMMUTABLE

When Verrum receives a source payload, preserve the original payload byte-for-byte whenever technically possible.

Never overwrite the original source response.

Store:

- source/provider
- endpoint
- request metadata
- response metadata
- received timestamp
- source timestamp
- asset/provider identifier
- HTTP status
- raw payload
- content type
- checksum/hash
- ingestion run ID
- tenant/customer ID

Every important number shown to the user should be traceable back through:

    Decision
      ↓
    Calculation
      ↓
    Canonical metric
      ↓
    Source reading
      ↓
    Raw payload

The UI must make this traceability visible.

2. MISSING DATA HAS MEANING

Never silently convert missing data into zero.

Distinguish at minimum:

- unsupported
- not provided
- no reading
- stale
- disconnected
- unavailable
- not applicable
- unknown
- zero
- estimated

"0 hours" and "no hours reading" are NOT the same thing.

3. NO MACHINE APPEARS AS TRUSTED DATA UNTIL MAPPED

External asset identities must be mapped to Verrum's canonical machine identity.

A provider asset is not automatically a trusted Verrum machine.

Machine mapping should support:

- provider
- provider asset ID
- serial number
- VIN where applicable
- customer asset number
- internal machine ID
- make
- model
- year
- category
- site/location
- status
- mapping confidence
- mapping history

Unmapped assets should be visible in an explicit "Needs Mapping" workflow.

Do not silently merge assets.

4. CUMULATIVE COUNTERS MUST BE HANDLED CORRECTLY

For cumulative values such as:

- engine hours
- odometer
- fuel consumed
- distance
- operating hours

do not assume every reading is a valid increase.

If a counter moves backwards:

- flag it
- do not manufacture a correction
- withhold the invalid delta
- preserve the source reading
- explain the issue

Allow small configurable rounding tolerance.

5. NEVER DISTRIBUTE DATA ACROSS GAPS

If readings exist for January 1 and January 10 but nothing exists between them, do not invent daily values.

Show:

    Coverage: 10 days
    Readings: 2
    Daily distribution: unavailable

Never silently spread cumulative differences evenly across missing days.

6. NO PREDICTION

Verrum can calculate facts, thresholds, trends, comparisons, and decisions.

It must not pretend to predict the future.

Examples of valid outputs:

- "Machine accumulated 43.2 idle hours during the last 30 covered days."
- "This machine was active on 7 of 30 covered days."
- "Based on the configured ownership cost and observed utilization, renting may be cheaper."
- "The machine exceeded the configured idle threshold."
- "The source has not reported in 11 days."

Avoid claims such as:

- "This machine will fail next month."
- "We predict the engine will fail."
- "This machine will cost $X next year."

Unless a future prediction feature is explicitly introduced later, do not implement predictive behavior.

7. TENANT ISOLATION IS NON-NEGOTIABLE

Every customer/organization must have strict data isolation.

Every tenant-scoped record must carry tenant ownership either directly or through a safe relational boundary.

Never rely solely on frontend filtering for tenant isolation.

8. OEM SYSTEMS ARE READ-ONLY

Verrum reads from OEM/telematics systems.

It must not write operational changes back into OEM systems unless a future explicit integration requires it.

9. LLMs MUST NOT ALTER NUMBERS

AI may explain, summarize, classify, or help navigate evidence.

AI may NOT:

- invent readings
- modify calculations
- change source values
- fabricate missing values
- override deterministic business rules
- silently alter thresholds
- create unsupported financial figures

All numerical calculations must happen in deterministic application code.

10. PLAIN LANGUAGE

The interface should use clear operational language.

Prefer:

"Idle for 43 hours"

over:

"Idle utilization anomaly detected."

Prefer:

"Data missing for 6 days"

over:

"Telemetry continuity degradation."

Technical details should remain available but should not dominate the primary UI.

11. CUSTOMER SELF-SERVICE

Customers should be able to configure:

- machines
- mappings
- terminology
- thresholds
- costs
- rules
- integrations
- users
- locations
- accounting settings
- fuel prices
- decision preferences

without requiring a developer for normal configuration.

12. TRANSPARENT LIMITS

Every major data view should make data quality visible.

Examples:

- Last received
- Coverage
- Source
- Data age
- Missing fields
- Mapping state
- Provider limitations

Never create a false impression of completeness.

==================================================
2. BRAND
==================================================

Product name:

Verrum

Primary positioning:

"Machine data in. Decisions out."

The brand should feel:

- precise
- industrial
- intelligent
- trustworthy
- modern
- premium
- operational
- calm

Do NOT make Verrum look like:

- a generic AI startup
- a crypto product
- a consumer fitness app
- a generic blue SaaS template
- an overly futuristic neon dashboard
- a construction marketing website full of stock photography

Verrum should feel like serious software used by people responsible for millions of dollars of equipment.

==================================================
3. PRIMARY UI DIRECTION
==================================================

Use:

MODERN CLEAN

This is the official Verrum default visual system.

Design reference:

- Linear-level cleanliness
- premium enterprise software
- modern industrial software
- financial-grade data presentation
- subtle influence from operational/control-room software

The UI must be:

- clean
- dense where useful
- spacious where comprehension matters
- highly readable
- information-first
- restrained
- professional

Avoid:

- excessive rounded cards
- excessive shadows
- huge typography
- oversized empty dashboard tiles
- excessive glassmorphism
- gradients everywhere
- purple AI gradients
- decorative animations
- meaningless charts
- giant hero sections inside the application
- excessive icons
- rainbow color palettes

Use color primarily to communicate:

- state
- priority
- status
- action
- exceptions
- selected state

==================================================
4. THEME ARCHITECTURE
==================================================

Modern Clean is the default theme.

However, DO NOT hard-code the Modern Clean colors into components.

Build a real design-token/theme system.

All colors must be semantic tokens.

For example:

--background
--surface
--surface-raised
--surface-muted
--border
--border-strong
--text
--text-muted
--text-subtle
--primary
--primary-foreground
--success
--warning
--danger
--info
--chart-1
--chart-2
--chart-3
...

The application must support future themes without rewriting components.

Initial theme:

    modern-clean

Initial modes:

    light
    dark
    system

The user must be able to change this from:

    Settings → Appearance

Store appearance preferences per user.

Example:

{
  theme: "modern-clean",
  mode: "light",
  density: "comfortable"
}

Also support:

- comfortable density
- compact density
- dense density

Do not implement ten themes initially.

Build the architecture so future themes can be added easily.

Modern Clean should use:

- white / off-white surfaces
- graphite text
- restrained borders
- Verrum green as primary brand color
- subtle green interaction states
- neutral data visualization
- semantic red/yellow/blue/green status colors
- excellent contrast

Dark mode should be a proper dark design, not simply inverted colors.

==================================================
5. DESIGN SYSTEM
==================================================

Create reusable primitives.

At minimum:

- AppShell
- Sidebar
- Topbar
- Breadcrumbs
- PageShell
- PageHeader
- SectionHeader
- Metric
- MetricGroup
- StatusBadge
- SeverityBadge
- DataTable
- DataTableToolbar
- SearchInput
- FilterBar
- FilterChip
- DateRangePicker
- Select
- Combobox
- Tabs
- Drawer
- Sheet
- Modal
- ConfirmationDialog
- EmptyState
- ErrorState
- LoadingState
- Skeleton
- Timeline
- ActivityFeed
- DecisionCard
- EvidencePanel
- EvidenceSource
- CalculationBreakdown
- ConfidenceIndicator
- DataQualityIndicator
- CoverageIndicator
- MachineStatus
- IntegrationStatus
- ConnectionCard
- RuleCard
- AgentCard
- DocumentCard
- CostBreakdown
- ChartContainer
- ChartLegend
- MapContainer
- AuditLog
- Toast
- CommandPalette

Do not duplicate UI patterns between modules.

If a pattern appears more than once, make it reusable.

==================================================
6. TECHNOLOGY STACK
==================================================

Use a modern TypeScript-first architecture.

Frontend:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- Radix primitives where useful
- Lucide icons
- React Hook Form
- Zod
- TanStack Query where client-side server-state management is useful
- Recharts or another lightweight chart library

Backend:

Use Next.js server-side capabilities for normal application APIs and server operations.

Use a separate worker process/service for long-running ingestion and processing jobs where appropriate.

Database:

- PostgreSQL

ORM:

- Drizzle ORM

Do not use SQLite as the production database.

Architecture should support:

- local development
- Docker
- self-hosted deployment
- managed PostgreSQL
- S3-compatible object storage

Background jobs:

Use a PostgreSQL-backed job approach or another self-hostable mechanism.

The job abstraction must support:

- retries
- exponential backoff
- idempotency
- job status
- failed jobs
- retry manually
- execution history

Do not tightly couple business logic to one queue vendor.

Authentication:

Use a production-grade authentication system compatible with Next.js and self-hosting.

Support:

- users
- organizations/tenants
- roles
- sessions
- invitation flow
- password reset
- optional OAuth later
- access codes for demo/test environments

Authorization must be enforced server-side.

==================================================
7. HIGH-LEVEL ARCHITECTURE
==================================================

Separate the DATA PLANE from the DECISION PLANE.

DATA PLANE:

OEM APIs
Files
Webhooks
Email
Documents
Accounting
Other telematics providers
        ↓
Raw ingestion
        ↓
Canonical normalization
        ↓
Asset identity resolution
        ↓
Machine-day facts
        ↓
Data quality / reconciliation

DECISION PLANE:

Machine-day facts
        ↓
Rules
        ↓
Decision engines
        ↓
Agents
        ↓
Evidence
        ↓
Decision
        ↓
Outcome
        ↓
Learning/memory

Do not mix ingestion logic with decision logic.

==================================================
8. MODULAR APPLICATION STRUCTURE
==================================================

Use a structure similar to:

src/
  app/
    (marketing)/
    (auth)/
    (app)/
    admin/
    api/

  components/
    ui/
    layout/
    data-display/
    forms/
    charts/
    maps/
    feedback/

  modules/
    dashboard/
    decisions/
    machines/
    telemetry/
    integrations/
    documents/
    costs/
    accounting/
    rules/
    agents/
    settings/
    demo/
    users/
    organizations/
    audit/

  server/
    auth/
    db/
    permissions/
    jobs/
    storage/
    integrations/

  lib/
    dates/
    formatting/
    validation/
    permissions/
    telemetry/
    calculations/
    terminology/
    errors/
    logging/

  domain/
    machines/
    telemetry/
    decisions/
    costs/
    documents/
    accounting/
    integrations/
    rules/
    agents/

  types/

Keep modules independently extensible.

Avoid a giant monolithic service file.

==================================================
9. VOCABULARY SYSTEM
==================================================

Verrum should support different customer vocabularies.

Example:

Construction:

    Machines
    Jobs
    Sites
    Equipment Manager

Agriculture:

    Machines
    Fields
    Farms
    Fleet Manager

Municipal:

    Vehicles
    Departments
    Locations
    Fleet Manager

Create a terminology configuration/service.

Do not hard-code "job" everywhere.

Example:

terminology.machine
terminology.job
terminology.location
terminology.operator

Default terminology should be:

- Machines
- Jobs
- Sites
- Fleet Manager

==================================================
10. APPLICATION SHELL
==================================================

Primary navigation:

- Overview
- Decisions
- Machines
- Telemetry
- Costs
- Documents
- Accounting
- Integrations
- Settings

Optional admin section:

- Administration

The navigation must be permission-aware.

Do not expose pages users cannot access.

Top bar:

- organization selector where applicable
- global search
- command palette trigger
- date range/context
- notifications
- user menu

The application should feel like one coherent product.

==================================================
11. OVERVIEW / FLEET TODAY
==================================================

Do not make this a generic analytics dashboard.

The overview should answer:

"What requires attention today?"

Primary content:

- fleet size
- reporting assets
- assets with no recent feed
- active machines
- idle machines
- open decisions
- high-priority decisions
- service due
- data coverage

Example:

Fleet Today

35 Machines
31 Reporting
4 No Recent Feed
92% Data Coverage

Then:

TOP DECISIONS

1. High idle time
   CAT 336 · Unit 142
   Estimated annual opportunity: $2,840
   High

2. Consider renting
   Komatsu WA380 · Unit 067
   Estimated opportunity: $1,920
   Medium

3. Service due
   John Deere 744 · Unit 019
   Due in 12 days
   Info

Each decision must be actionable.

Do not fill the overview with meaningless KPIs.

==================================================
12. DECISIONS
==================================================

This is one of the core Verrum experiences.

Decision list:

- priority
- decision type
- machine
- location/job
- financial impact
- evidence state
- created date
- status

Filters:

- priority
- decision type
- machine
- location
- status
- date
- financial impact

Decision detail should feel like a case file.

Example:

------------------------------------------------
HIGH IDLE TIME
CAT 336 · Unit 142
------------------------------------------------

Recommendation

Review whether this machine should remain assigned
to the current site.

Potential annual opportunity

$2,840

Evidence

Idle hours
43.2 h

Covered days
30

Active days
7

Idle threshold
20 h

Source
Cat telematics

Last reading
2026-10-07 14:20

Calculation

43.2 idle hours
× configured ownership cost
= calculated opportunity

Data quality

Good
30 covered days
92% source coverage

------------------------------------------------

Provide:

- evidence drawer
- calculation breakdown
- source payload access
- timeline
- decision history
- comments
- owner
- status
- outcome tracking

Possible decision states:

- New
- Reviewing
- Approved
- Rejected
- Deferred
- Completed

==================================================
13. DECISION AGENTS
==================================================

Implement an extensible agent architecture.

Initial agents:

1. Idle Agent
2. Own/Rent Agent
3. Repair/Replace Agent
4. Cost Allocation Agent
5. Rate Check Agent
6. Service Due Agent
7. Fuel Check Agent

Agents are NOT autonomous AI.

They are deterministic decision engines with optional AI explanation.

Each agent should have:

- ID
- name
- description
- enabled/disabled
- version
- applicable machine types
- rule configuration
- input requirements
- output type
- evidence requirements

Example:

Idle Agent

Inputs:

- engine hours
- idle hours
- covered days
- idle threshold
- ownership cost

Output:

- decision
- priority
- financial impact
- evidence
- explanation

==================================================
14. RULE ENGINE
==================================================

Rules must be explicit and configurable.

Do not bury customer logic inside frontend components.

Example:

IF
    idle_hours > idle_threshold
AND
    covered_days >= minimum_coverage
AND
    machine_status = active

THEN
    create idle_review decision

Rules should have:

- ID
- name
- description
- enabled
- version
- conditions
- thresholds
- effective date
- created by
- updated by

Store rule versions.

A historical decision must be explainable using the rule version that generated it.

==================================================
15. MACHINE MANAGEMENT
==================================================

Machine list:

- machine number
- make
- model
- category
- serial number
- location
- status
- last reporting
- engine hours
- idle hours
- data quality
- open decisions

Machine detail:

Overview
Telemetry
Utilization
Costs
Faults
Documents
Decisions
History
Integration

Machine page must show:

- identity
- source
- mapping status
- last reading
- coverage
- operating hours
- idle hours
- utilization
- fuel
- faults
- cost
- decisions
- documents

==================================================
16. TELEMETRY INGESTION
==================================================

Create a provider abstraction.

Example interface:

interface TelemetryProvider {
  authenticate(): Promise<void>
  listAssets(): Promise<ProviderAsset[]>
  getTelemetry(...): Promise<ProviderTelemetry[]>
  getHistory(...): Promise<ProviderTelemetry[]>
  getFaults(...): Promise<ProviderFault[]>
  getCapabilities(): Promise<ProviderCapabilities>
}

Providers should be modular.

Initial architecture should support:

- Cat
- Komatsu
- John Deere
- CNH / CASE
- Volvo
- Hitachi
- Bobcat
- Takeuchi
- Hyundai
- Generic AEMP / ISO 15143-3

Do NOT pretend all provider APIs are identical.

Use provider capability manifests.

Example:

{
  supportsLocation: true,
  supportsEngineHours: true,
  supportsIdleHours: true,
  supportsFuel: false,
  supportsFaults: true,
  supportsHistory: true,
  supportsWebhooks: false
}

A provider can explicitly say that a field is unsupported.

==================================================
17. OEM CONNECTIONS
==================================================

The integration UI should have connection cards.

Examples:

Cat
Komatsu
John Deere
CNH
Volvo
Hitachi
Bobcat
Takeuchi
Hyundai
Generic AEMP

Each card should show:

- connection status
- account
- number of assets
- last sync
- sync health
- available capabilities
- mapping state
- configuration
- test connection
- sync now
- disconnect

Never expose client secrets in the UI after storage.

Secrets must be encrypted or stored using an appropriate secure secret mechanism.

==================================================
18. INGESTION FLOW
==================================================

Every ingestion should follow:

1. Authenticate
2. Fetch source data
3. Store raw payload
4. Record ingestion event
5. Validate payload
6. Identify provider
7. Normalize
8. Resolve machine identity
9. Store canonical reading
10. Derive machine-day metrics
11. Run reconciliation
12. Run applicable decision rules
13. Generate decisions
14. Update data quality
15. Record audit event

Each step should be observable.

Failures must be explicit.

==================================================
19. INTAKE DOORS
==================================================

Verrum must support multiple ways to receive data.

Initial intake types:

1. OEM API
2. File upload
3. Push HTTP endpoint
4. Email

Create a common ingestion pipeline so all sources eventually become canonical data.

Example:

File
  ↓
Raw file
  ↓
Parser
  ↓
Canonical telemetry

OEM
  ↓
Raw API response
  ↓
Provider adapter
  ↓
Canonical telemetry

HTTP
  ↓
Raw payload
  ↓
Provider adapter
  ↓
Canonical telemetry

==================================================
20. FILE INGESTION
==================================================

Support:

- CSV
- Excel
- JSON
- PDF where useful for documents

File ingestion must show:

- filename
- source
- upload date
- parser
- rows
- accepted rows
- rejected rows
- errors
- mapping status

Do not silently discard malformed records.

==================================================
21. MACHINE-DAY MODEL
==================================================

Create a first-class machine-day fact model.

Example fields:

- tenant_id
- machine_id
- date
- engine_hours_start
- engine_hours_end
- engine_hours_delta
- idle_hours_start
- idle_hours_end
- idle_hours_delta
- fuel_start
- fuel_end
- fuel_delta
- distance_start
- distance_end
- distance_delta
- active
- reporting
- covered
- data_quality
- source_count

Do not derive fake values when source coverage is insufficient.

==================================================
22. DATA QUALITY
==================================================

Create a first-class data-quality model.

Track:

- source freshness
- missing readings
- counter anomalies
- unmapped assets
- duplicate assets
- serial mismatch
- stale machines
- unsupported fields
- partial coverage

The UI should make these visible.

Example:

Data Quality

92% coverage

31 / 35 machines reporting

4 machines require attention

2 serial mismatches

1 stale connection

==================================================
23. RECONCILIATION
==================================================

Support reconciliation between:

- provider assets
- customer machine register
- serial numbers
- internal machine IDs
- files
- accounting records

Never silently resolve conflicts.

Examples:

"Provider serial does not match machine register."

"Provider asset exists but is not mapped."

"Machine exists in register but has no telemetry."

==================================================
24. COST ENGINE
==================================================

Create deterministic cost calculations.

Possible inputs:

- purchase price
- depreciation
- financing
- insurance
- maintenance
- repair
- fuel
- operator cost
- ownership cost
- rental rate
- transportation
- overhead
- residual value

The customer must be able to configure which components are used.

Calculations must be explainable.

Example:

Annual ownership cost

$82,400

÷

Covered operating hours

1,120

=

$73.57 / operating hour

Never hide the calculation.

==================================================
25. OWN / RENT
==================================================

Build an Own/Rent decision workflow.

Inputs:

- utilization
- ownership cost
- rental rate
- required period
- transportation
- minimum utilization
- customer rules

Output:

- recommendation
- calculation
- assumptions
- evidence
- financial impact

Do not present the result as a prediction.

Use:

"Based on the configured assumptions..."

==================================================
26. REPAIR / REPLACE
==================================================

Support deterministic evaluation based on:

- repair cost
- machine age
- utilization
- downtime
- maintenance history
- replacement cost
- configured thresholds

Do not invent failure probability.

==================================================
27. COST ALLOCATION
==================================================

Allow machine costs to be associated with:

- job
- site
- department
- project
- cost center

Support configurable allocation rules.

==================================================
28. RATE CHECK
==================================================

Allow configured internal equipment rates to be compared against:

- ownership cost
- utilization
- configured target margin
- rental benchmarks if available

Make assumptions visible.

==================================================
29. SERVICE DUE
==================================================

Support:

- hour-based service
- calendar-based service
- configurable intervals
- last service
- next due
- overdue
- service documents

Do not invent service records.

==================================================
30. FUEL
==================================================

Support:

- fuel consumption
- fuel price
- fuel cost
- fuel usage by machine
- fuel usage by job/site where data supports it

Fuel price must be configurable.

==================================================
31. DOCUMENTS
==================================================

Support documents associated with:

- machines
- jobs
- decisions
- integrations
- organizations

Examples:

- invoices
- service records
- rental agreements
- purchase documents
- inspection documents
- registration
- warranties

Document metadata:

- filename
- type
- source
- uploaded by
- uploaded at
- associated entity

Optional document extraction can identify:

- machine
- date
- vendor
- amount
- invoice number
- service type

AI extraction must never silently become authoritative data.

Extracted fields should have:

- source location
- confidence
- review state

==================================================
32. ACCOUNTING
==================================================

Build accounting integration architecture.

Initial conceptual integrations:

- QuickBooks
- Xero

Do not hard-code accounting assumptions into the core domain.

Accounting records should be normalized.

Support:

- vendors
- bills
- expenses
- payments
- cost centers
- accounts
- machine associations where available

Accounting data should feed the cost engine.

==================================================
33. CARB / REGULATORY DATA
==================================================

Create a modular area for regulatory/compliance data where applicable.

Do not hard-code regulatory claims unless supported by source data.

Support future integration for:

- emissions information
- compliance documents
- jurisdiction
- reporting period
- compliance status

==================================================
34. CASE FILE / MEMORY
==================================================

Every important decision should be a case file.

A case can contain:

- decision
- machine
- evidence
- calculations
- documents
- comments
- status history
- responsible user
- related decisions
- outcome

Example:

CASE-000142

"Consider selling CAT 336 Unit 142"

Timeline:

Oct 2
Idle threshold exceeded

Oct 3
Decision generated

Oct 4
Equipment Manager reviewed

Oct 5
Marked for review

Oct 12
Outcome recorded

This becomes the operational memory of Verrum.

==================================================
35. OUTCOME TRACKING
==================================================

A decision is not complete simply because it was generated.

Support outcomes:

- accepted
- rejected
- deferred
- implemented
- expired

Capture:

- outcome date
- actual financial impact where known
- notes
- resulting machine status
- responsible user

This creates a feedback loop without pretending to perform predictive ML.

==================================================
36. AI
==================================================

AI is optional and secondary.

The deterministic data/calculation system must work without AI.

AI can help with:

- summarizing evidence
- explaining decisions
- searching documents
- answering questions about known Verrum data
- generating plain-language summaries
- assisting configuration

AI cannot:

- change source values
- override calculations
- invent data
- invent costs
- fabricate evidence
- decide that missing data is zero
- silently modify a rule

Every AI-generated answer should be grounded in actual Verrum records.

If evidence is insufficient, say so.

==================================================
37. GLOBAL SEARCH
==================================================

Implement global search / command palette.

Search:

- machines
- serial numbers
- decisions
- jobs
- documents
- integrations
- users

Example:

Search:
"CAT 336"

Results:

Machines
  CAT 336 · Unit 142

Decisions
  High idle time · Unit 142

Documents
  CAT 336 service invoice

==================================================
38. ADMINISTRATION
==================================================

Admin area should support:

- organizations
- users
- roles
- integrations
- ingestion runs
- failed jobs
- audit logs
- feature flags
- demo environments
- system health

System health:

- database
- job worker
- integrations
- recent ingestion
- failed ingestion
- storage

==================================================
39. ROLES
==================================================

Initial roles:

- Owner
- Admin
- Fleet Manager
- Equipment Manager
- Operations Manager
- Accountant
- Viewer

Permissions must be explicit.

Example:

Accountant:

Can view:

- costs
- accounting
- financial decisions

Cannot necessarily:

- modify telemetry integrations
- change machine mappings
- change system rules

Do not use frontend-only permission checks.

==================================================
40. DEMO MODE
==================================================

Verrum needs a polished simulated environment.

Create a demo tenant.

The demo must contain realistic but clearly synthetic data.

Example:

- 35 machines
- multiple OEMs
- multiple sites
- reporting and non-reporting machines
- idle machines
- service due
- cost data
- decisions
- documents
- accounting records
- telemetry history

Demo mode should allow users to understand the product without connecting a real OEM.

Clearly identify demo data.

Never mix demo data with real customer data.

==================================================
41. DEMO SIMULATOR
==================================================

Create an admin/demo simulator.

Allow:

- simulate OEM connection
- simulate new machine
- simulate missing telemetry
- simulate counter rollback
- simulate serial mismatch
- simulate stale connection
- simulate new fault
- simulate increased idle time
- simulate decision generation

This is useful for demonstrations and testing.

==================================================
42. PUBLIC WEBSITE
==================================================

Create a polished public site.

Sections:

Hero

    Machine data in.
    Decisions out.

Explain:

- Connect
- Normalize
- Understand
- Decide

Core capabilities:

- Fleet intelligence
- Equipment decisions
- Cost intelligence
- Data quality
- Evidence
- Integrations

Include:

- Demo request
- Sign in
- Contact
- Product overview

Do not over-market.

The website should feel credible and industrial.

==================================================
43. DEMO REQUEST PIPELINE
==================================================

Public demo request form:

- name
- company
- email
- phone
- fleet size
- industry
- current telematics providers
- message

Store as a lead.

Admin can:

- view
- qualify
- assign
- change status
- add notes
- schedule follow-up

Statuses:

- New
- Contacted
- Qualified
- Demo Scheduled
- Pilot
- Won
- Lost

==================================================
44. AUTHENTICATION / ACCESS
==================================================

Support:

- sign up where appropriate
- login
- logout
- password reset
- sessions
- invitation
- access code
- demo login

Demo/test/customer pilot environments must be clearly separated.

==================================================
45. SETTINGS
==================================================

Settings sections:

Organization
Users
Roles
Terminology
Appearance
Integrations
Data Sources
Rules
Agents
Costs
Fuel
Notifications
Security
Audit
Deployment

Appearance:

Theme
Mode
Density

Default:

Modern Clean
Light
Comfortable

Users can change their own appearance.

Organization administrators may optionally set an organization default.

==================================================
46. AUDIT LOG
==================================================

Audit important actions.

Examples:

- user created
- machine mapped
- machine unmapped
- rule changed
- rule enabled
- rule disabled
- integration connected
- integration disconnected
- decision created
- decision status changed
- document uploaded
- cost assumption changed

Audit record:

- actor
- tenant
- timestamp
- action
- entity
- before
- after
- request/context metadata

==================================================
47. API DESIGN
==================================================

Keep APIs modular.

Example domains:

/api/auth
/api/organizations
/api/machines
/api/telemetry
/api/integrations
/api/decisions
/api/rules
/api/agents
/api/documents
/api/costs
/api/accounting
/api/audit

Do not create one giant /api endpoint.

Use schema validation.

All externally received data must be validated.

==================================================
48. DATABASE
==================================================

Create proper relational models.

At minimum expect entities similar to:

Organization
User
Membership
Role
Machine
MachineIdentity
MachineMapping
Provider
Integration
IntegrationCredential
IngestionRun
RawPayload
TelemetryReading
MachineDay
Fault
DataQualityIssue
Rule
RuleVersion
Agent
Decision
DecisionEvidence
DecisionCalculation
DecisionOutcome
Document
DocumentExtraction
CostProfile
CostComponent
FuelPrice
Job
Location
AccountingRecord
AuditEvent
Notification

Use foreign keys.

Use indexes intentionally.

Use timestamps.

Use soft deletion where appropriate.

Do not over-normalize telemetry unnecessarily.

Raw payload storage must be optimized for large volumes.

==================================================
49. DATA RETENTION
==================================================

Design the data layer so raw telemetry can grow significantly.

Avoid loading large raw payloads into normal list endpoints.

Paginate.

Use server-side filtering.

Do not render thousands of records at once.

==================================================
50. OBSERVABILITY
==================================================

Implement structured logging.

Important events:

- ingestion started
- ingestion completed
- ingestion failed
- normalization failed
- mapping conflict
- rule execution
- decision generated
- background job failed

Include:

- tenant
- integration
- machine
- job
- correlation ID

Do not log secrets.

==================================================
51. ERROR HANDLING
==================================================

Errors should be understandable.

Instead of:

"500 Internal Server Error"

Prefer:

"Cat connection failed"

Details:

"Authentication succeeded, but the provider returned an authorization error while retrieving asset history."

Then:

- Retry
- View integration
- Contact administrator

Do not expose sensitive implementation details.

==================================================
52. ACCESSIBILITY
==================================================

Target WCAG 2.2 AA where practical.

Support:

- keyboard navigation
- focus states
- screen readers
- semantic HTML
- accessible dialogs
- accessible tables
- sufficient contrast
- reduced motion

Do not rely on color alone for status.

==================================================
53. RESPONSIVE DESIGN
==================================================

Desktop is primary.

Support:

- large desktop
- laptop
- tablet
- mobile

The dense operational screens may intentionally become simplified on mobile.

Do not simply shrink desktop tables.

On mobile:

- prioritize important columns
- use drawers
- stack evidence
- use cards where appropriate

==================================================
54. MOTION
==================================================

Motion should be subtle.

Use animation for:

- page transitions where useful
- drawer opening
- filtering
- status changes
- loading states
- data updates

Do not animate dashboards constantly.

Respect prefers-reduced-motion.

==================================================
55. TASTE SKILL
==================================================

Use the Taste Skill frontend design guidance.

Install:

npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

Use it to guide:

- design system quality
- spacing
- hierarchy
- typography
- component composition
- visual density
- interaction quality
- anti-generic-SaaS design

Do not blindly copy examples.

Adapt the principles to Verrum.

Verrum should have its own identity.

==================================================
56. CHARTS
==================================================

Charts must answer a question.

Useful charts:

- engine hours
- idle hours
- utilization
- fuel
- cost/hour
- reporting coverage
- machine activity
- decision impact

Avoid decorative charts.

Every chart should show:

- time period
- units
- source/coverage where relevant
- tooltip
- empty state
- missing-data state

Never interpolate missing data without explicitly stating it.

==================================================
57. TABLES
==================================================

Tables are critical.

Support:

- sorting
- filtering
- pagination
- column visibility
- search
- row selection where useful
- export where appropriate

Use tabular numerals for financial/numeric values.

Numbers should align properly.

==================================================
58. EVIDENCE UI
==================================================

Evidence should be a first-class interaction.

A user should be able to click:

$2,840

and understand:

How was this calculated?

Then:

43.2 idle hours
×
$65.74 configured cost/hour
=
$2,840.00

Then:

Source:
Cat telematics

Reading:
2026-10-07 14:20

Then:

Raw payload

This is one of Verrum's most important differentiators.

==================================================
59. DATA SOURCE TRANSPARENCY
==================================================

Where applicable show:

Source
Last received
Coverage
Mapping
Data quality

Example:

Cat Telematics

Last received:
12 minutes ago

Coverage:
28 / 30 days

Status:
Healthy

This should not be hidden behind an admin screen.

==================================================
60. SECURITY
==================================================

Treat security seriously.

Requirements:

- secure password handling
- secure sessions
- CSRF protection where applicable
- input validation
- authorization checks
- tenant isolation
- encrypted secrets
- no credentials in logs
- secure file handling
- upload validation
- rate limiting for public endpoints
- audit logging
- secure headers
- environment variables for secrets

Never commit credentials.

Provide .env.example.

==================================================
61. CONFIGURATION
==================================================

Configuration should support:

DATABASE_URL
AUTH_SECRET
OBJECT_STORAGE_*
OEM credentials
ACCOUNTING credentials
EMAIL credentials

Never hard-code production credentials.

==================================================
62. SELF-HOSTING
==================================================

The architecture must support self-hosting.

Provide:

- Dockerfile
- docker-compose configuration for local development
- PostgreSQL
- worker
- optional object storage
- environment documentation
- database migrations
- seed data

A customer should be able to deploy Verrum without relying on a proprietary hosted platform.

==================================================
63. TESTING
==================================================

Build tests alongside the application.

Unit tests:

- counter delta calculations
- gap detection
- coverage calculations
- cost calculations
- rule evaluation
- decision generation
- permission logic
- terminology
- mapping

Integration tests:

- ingestion
- normalization
- database
- authentication
- tenant isolation
- integrations

End-to-end tests:

- login
- machine mapping
- view machine
- inspect decision
- inspect evidence
- change settings
- theme switching
- demo workflow

Especially test:

- tenant A cannot access tenant B
- missing telemetry is not treated as zero
- backward counters are not accepted
- unmapped machines are not treated as trusted machines
- AI cannot change deterministic calculations

==================================================
64. SEED DATA
==================================================

Create realistic demo seed data.

Include:

Organizations:
- Demo Construction Co.

Machines:
- Caterpillar
- Komatsu
- John Deere
- Volvo
- CASE
- Bobcat

Use fictional identifiers.

Create:

- 35 machines
- 31 reporting
- 4 stale/unavailable
- multiple sites
- multiple decisions
- telemetry history
- faults
- documents
- accounting records
- cost profiles
- rules

The demo must look realistic.

==================================================
65. IMPLEMENTATION STRATEGY
==================================================

Do NOT build every feature as a fake placeholder.

Build vertical slices.

Phase 1:

Foundation

- Next.js
- TypeScript
- Tailwind
- shadcn
- theme system
- PostgreSQL
- Drizzle
- auth
- organization/tenant
- layout
- design system
- seed data

Phase 2:

Machines

- machine model
- machine list
- machine detail
- mapping
- data quality

Phase 3:

Telemetry

- provider abstraction
- raw payload
- canonical telemetry
- machine-day
- ingestion runs
- simulated provider

Phase 4:

Decision engine

- rules
- agents
- decisions
- evidence
- calculations

Phase 5:

Costs

- cost profiles
- fuel
- ownership
- own/rent
- rate checks

Phase 6:

Documents

- upload
- metadata
- machine association
- extraction architecture

Phase 7:

Integrations

- OEM connection framework
- provider adapters
- accounting abstraction

Phase 8:

Case files

- outcomes
- history
- audit
- comments

Phase 9:

Admin / operations

- jobs
- integrations
- audit
- system health

Phase 10:

Polish

- accessibility
- responsive behavior
- loading states
- error states
- empty states
- performance
- test coverage

==================================================
66. IMPORTANT: DO NOT FAKE EXTERNAL APIs
==================================================

For OEM integrations, do not pretend an API exists or behaves a certain way unless the implementation is based on documented provider behavior.

Build provider interfaces and simulated adapters first.

When implementing a real connector:

- document required credentials
- document subscription requirements
- document capabilities
- document polling behavior
- document limitations
- preserve raw responses
- make unsupported fields explicit

If credentials are unavailable, the connector should remain disabled/configurable rather than being filled with fake network behavior.

==================================================
67. UX FOR INCOMPLETE INTEGRATIONS
==================================================

If a customer has not connected an OEM:

Show:

"Connect a data source"

not:

"No machines found."

If a provider does not support fuel:

"Fuel data is not available from this source."

not:

"Fuel: $0"

If telemetry has stopped:

"Last received 11 days ago."

not:

"0 hours."

==================================================
68. PERFORMANCE
==================================================

The application may eventually process:

- thousands of machines
- millions of telemetry readings
- large raw payload volumes
- years of history

Design accordingly.

Use:

- pagination
- indexing
- server-side aggregation
- background jobs
- caching where appropriate
- incremental ingestion
- batched processing
- streaming/file processing where appropriate

Do not query all telemetry to render a dashboard.

==================================================
69. DESIGN QUALITY BAR
==================================================

Every screen must answer:

1. What is this?
2. What matters?
3. What can I do?
4. Why should I trust this?
5. Where did this number come from?

Do not ship generic CRUD screens when a better operational workflow is appropriate.

Use progressive disclosure.

Primary information first.

Evidence and technical detail second.

==================================================
70. IMPORTANT UI PATTERNS
==================================================

Use these consistently.

LIST:

Header
↓
Context / filters
↓
Important summary
↓
Table/list
↓
Pagination

DETAIL:

Header
↓
Status
↓
Key metrics
↓
Primary action
↓
Evidence
↓
Details
↓
History

DECISION:

Decision
↓
Recommendation
↓
Financial impact
↓
Evidence
↓
Calculation
↓
Source
↓
Action
↓
Outcome

INTEGRATION:

Connection status
↓
Capabilities
↓
Last sync
↓
Assets
↓
Mapping
↓
Health
↓
Actions

==================================================
71. DO NOT OVERBUILD THE DASHBOARD
==================================================

The product's value is in decisions.

Do not create:

- 20 KPI cards
- meaningless pie charts
- vanity metrics
- decorative maps
- excessive analytics

The main screen should direct attention toward decisions and exceptions.

==================================================
72. MAPS
==================================================

Maps are useful but secondary.

Use maps for:

- machine location
- site distribution
- asset movement where supported
- geographic context

Do not make the product primarily a map.

==================================================
73. NOTIFICATION SYSTEM
==================================================

Support a notification architecture.

Examples:

- integration failed
- machine stopped reporting
- high-priority decision created
- service due
- mapping conflict

Allow future:

- email
- in-app
- webhook

Do not spam users.

==================================================
74. FEATURE FLAGS
==================================================

Create a simple feature flag system.

Useful for:

- beta integrations
- AI
- accounting
- experimental agents
- new themes

Feature flags must not replace authorization.

==================================================
75. DOCUMENTATION
==================================================

Create:

README.md

Include:

- what Verrum is
- architecture
- local setup
- environment variables
- database setup
- migrations
- seed data
- running web app
- running worker
- testing
- Docker
- deployment

Also create:

docs/
  architecture.md
  data-model.md
  integrations.md
  decision-engine.md
  security.md
  self-hosting.md

==================================================
76. CODE QUALITY
==================================================

Use:

- strict TypeScript
- meaningful names
- small modules
- typed boundaries
- schema validation
- domain-oriented code
- clear error handling

Avoid:

- any
- giant components
- giant service files
- business logic inside JSX
- duplicated calculations
- hidden magic numbers
- hard-coded tenant IDs
- hard-coded demo logic in production paths

==================================================
77. IMPORTANT DOMAIN SEPARATION
==================================================

Separate:

Provider data

from

Canonical data

from

Derived facts

from

Business rules

from

Decisions

from

Outcomes

For example:

Cat API says:

engineHours = 1234.7

Verrum stores source reading.

Canonical telemetry stores:

engine_hours = 1234.7

Machine-day derives:

engine_hours_delta = 7.4

Rule evaluates:

idle_hours_delta > threshold

Decision produces:

"Review idle utilization"

Outcome later records:

"Accepted"

Never collapse all these layers into one database record.

==================================================
78. VERSIONING
==================================================

Version:

- rules
- decision agents
- cost profiles where necessary
- provider adapters where appropriate

Historical decisions must remain explainable.

If a rule changes today, yesterday's decision must still be reproducible.

==================================================
79. FINAL PRODUCT FEEL
==================================================

When a fleet manager opens Verrum, it should feel like:

"I immediately understand the state of my fleet, I can see what needs attention, and I can prove why Verrum is recommending something."

Not:

"This is another dashboard."

The product should feel:

- calm
- intelligent
- precise
- trustworthy
- operational
- expensive
- technically credible

==================================================
80. FIRST-RUN EXPERIENCE
==================================================

After installation, the user should be able to:

1. Create/login to an organization
2. Enter the demo environment OR create a real environment
3. See the Modern Clean interface
4. Explore the demo fleet
5. Open a machine
6. Open a decision
7. Inspect evidence
8. Inspect calculation
9. View source
10. Change appearance settings
11. Switch Light/Dark
12. Change density

Theme switching must work throughout the application, not just on the settings page.

==================================================
81. DEFINITION OF DONE
==================================================

The project is not considered complete simply because pages render.

A feature is complete when:

- UI is implemented
- server logic exists
- database model exists where needed
- validation exists
- permissions exist
- loading state exists
- empty state exists
- error state exists
- audit behavior exists where appropriate
- tests exist
- mobile behavior exists where applicable
- theme works
- accessibility is reasonable
- data lineage is preserved
- documentation is updated

==================================================
82. CLAUDE CODE EXECUTION RULES
==================================================

You are operating as the primary senior engineer.

Before writing large amounts of code:

1. Inspect the repository.
2. Establish the project structure.
3. Install the required frontend design skill.
4. Establish the design token system.
5. Establish the database schema.
6. Establish authentication and tenant boundaries.
7. Establish the domain model.
8. Then build vertical slices.

Do not create throwaway architecture just to make a screen render.

Do not replace the architecture later unless necessary.

Prefer simple, maintainable solutions.

When a requirement is ambiguous:

- choose the simplest production-quality interpretation
- document the decision
- keep the implementation modular

Do not stop after generating scaffolding.

Continue until the first complete vertical slice works end-to-end.

==================================================
83. FIRST VERTICAL SLICE
==================================================

The first complete slice should be:

Demo tenant
    ↓
35 machines
    ↓
Simulated telemetry
    ↓
Raw payload
    ↓
Canonical telemetry
    ↓
Machine-day calculation
    ↓
Idle rule
    ↓
Idle decision
    ↓
Evidence
    ↓
Calculation
    ↓
Decision page
    ↓
Outcome

The user must be able to experience this flow through the UI.

==================================================
84. FIRST UI SCREENS
==================================================

Build these first:

Public landing page

Login

Demo selection

Overview

Machines list

Machine detail

Decisions list

Decision detail

Settings → Appearance

Integration page

Admin ingestion page

These screens must already use the final Modern Clean design system.

Do not build a temporary UI and promise to redesign it later.

==================================================
85. MODERN CLEAN DESIGN DETAILS
==================================================

Default visual characteristics:

Typography:

- Inter or Geist
- strong hierarchy
- tabular numerals
- readable small text
- no oversized headings inside operational screens

Surfaces:

- white
- soft neutral background
- subtle borders
- restrained radius
- minimal shadow

Primary:

- Verrum green

Status:

- green = healthy / positive
- amber = attention
- red = critical
- blue = informational

Do not use status colors decoratively.

Spacing:

- consistent 4/8-based spacing system
- compact operational tables
- generous section spacing

Cards:

Use cards when they create grouping.

Do not put every piece of content in a card.

==================================================
86. BRAND MARK
==================================================

Use a simple Verrum wordmark/mark treatment.

Do not create a complicated logo.

If no final logo asset exists, use a minimal text-based brand treatment and a simple geometric temporary mark.

Make the brand system easy to replace later.

==================================================
87. FINAL INSTRUCTION
==================================================

Build Verrum as a serious production-quality system.

Do not optimize for number of screens.

Optimize for:

- correctness
- traceability
- modularity
- usability
- data integrity
- decision quality
- visual quality
- extensibility

The core experience is:

DATA
→ FACTS
→ EVIDENCE
→ DECISION
→ OUTCOME

Everything in the architecture and UI should reinforce this.

Start by setting up the project and design system, then implement the first vertical slice end-to-end.

Do not use fake business logic when deterministic logic can be implemented.

Do not hide missing data.

Do not invent data.

Do not make unsupported claims.

Do not turn Verrum into a generic dashboard.

Build the product as if real fleet managers will rely on it to make expensive equipment decisions.
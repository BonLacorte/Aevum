# Implementation Phase 1 — Executable Application Foundation

PLAN status: `PLAN_APPROVED`  
Previous SPEC status: `SPEC_INVALIDATED`  
Replacement SPEC status: `NOT_STARTED`  
Build eligibility: `NOT_READY_FOR_BUILD`  
BUILD status: `BLOCKED`

> A historical architecture migration defect invalidated the previous Java/Spring Boot PLAN assumptions and detailed SPEC. The BUILD was halted before commit. The revised PLAN in this document is now approved. No application implementation is authorized until a replacement SPEC is prepared, approved through PSB review, and the phase explicitly returns to `READY_FOR_BUILD`.

## Historical correction record

Repository Baseline v1 accidentally imported **Java + Spring Boot** from the separate **OrbisOne** project as Aevum's backend.

Historical Aevum/LifeOS planning established:

- Frontend: **Next.js + TypeScript**
- Backend: **NestJS + TypeScript**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**
- Initial application architecture: **modular monolith**

The Java/Spring Boot SPEC previously contained in this file is invalid and has been removed from the active implementation contract rather than mechanically translated to NestJS.

Preserved implementation outcome:

> **Prove that Aevum's executable application foundation works locally without implementing major Aevum product features.**

---

# PLAN — Revised, Approved

## 1. Phase purpose

Establish the smallest real executable foundation for Aevum using the corrected historical V1 architecture without prematurely implementing Aevum's product domains or AI systems.

This phase exists to remove foundational application uncertainty before later implementation phases add product behavior. It should prove that the approved frontend, backend, relational data layer, and vector-capable PostgreSQL foundation can be structured correctly and run together on a developer machine.

## 2. Primary goal

Prove the following application path:

```text
Browser
  ↓
Next.js + TypeScript frontend
  ↓
HTTP application contract
  ↓
NestJS + TypeScript backend
  ↓
PostgreSQL + pgvector
```

The phase answers:

> Can Aevum exist as a correctly structured, locally runnable application using its corrected historical V1 architecture?

It does not attempt to prove any major Aevum product feature.

## 3. User/developer-visible outcome

When this phase is eventually implemented and verified, a developer should be able to follow documented local setup instructions, start the required local services, open the Aevum frontend, and observe a minimal foundation/status experience that confirms the frontend can communicate with the backend and that the backend has initialized its required database foundation.

The visible result is approximately:

```text
frontend running
  ↓
backend reachable
  ↓
database foundation initialized
```

This is a technical foundation experience, not the first real Aevum dashboard or product workflow.

## 4. Inherited repository decisions and constraints

This revised implementation PLAN inherits the following active repository decisions and architecture constraints:

- Aevum uses the **PSB Workflow: Plan → Spec → Build**.
- Repository documentation is the operational source of truth, with historical planning available to correct proven migration defects.
- BUILD scopes must remain independently implementable, testable, reviewable, and committable.
- Aevum remains a general-purpose personal organizational intelligence system and must not revert to a developer-centric Projects model.
- Frontend: **Next.js + TypeScript**.
- Backend: **NestJS + TypeScript**.
- Primary database: **PostgreSQL**.
- Vector capability: **pgvector**, kept within the PostgreSQL data architecture rather than introducing a separate vector database by default.
- The backend is the trusted application boundary for validation, persistence orchestration, and future protected-data enforcement.
- The frontend owns presentation and interaction but is not the authoritative persistence or security boundary.
- Initial application architecture follows a **modular-monolith direction** with explicit logical boundaries rather than premature microservices.
- Product rules should remain explicit and deterministic rather than being hidden inside AI prompts.
- Privacy and security are architectural concerns, not final-stage hardening.
- Infrastructure must not be added merely because it is common in other systems.

The following repository areas remain unresolved or provisional and are not silently finalized by this PLAN:

- exact production deployment topology;
- local-versus-cloud product boundary;
- authentication implementation;
- synchronization behavior;
- AI model/provider selection;
- embedding model/provider selection;
- complete product schema;
- observability/background-job architecture.

## 5. Scope

Implementation Phase 1 is limited to establishing the executable application foundation.

### 5.1 Repository/application foundation

The phase may establish:

- the real frontend project;
- the real backend project;
- the minimum local infrastructure required for PostgreSQL;
- migration-controlled database initialization;
- environment/configuration conventions;
- local-development documentation;
- project-owned verification needed to prove the foundation.

### 5.2 Frontend foundation

The phase should establish:

- a runnable Next.js + TypeScript application;
- one minimal application/foundation route or screen;
- one explicit frontend boundary for communicating with the backend;
- configuration-driven backend location;
- minimal understandable behavior for backend reachability/unavailability.

No domain-specific frontend state or major product experience belongs in this phase.

### 5.3 Backend foundation

The phase should establish:

- one runnable NestJS + TypeScript backend application;
- an initial organization consistent with the modular-monolith direction;
- one small application-owned system/status HTTP contract;
- PostgreSQL connectivity;
- migration-controlled database initialization;
- stable project-owned JSON output for the frontend foundation.

The backend should not create placeholder domain modules or services that have no Phase 1 responsibility.

### 5.4 Database foundation

The phase should establish:

- PostgreSQL as the local development database;
- migration-controlled initialization;
- pgvector availability;
- successful backend database connectivity;
- a repeatable clean initialization path.

No Aevum product/domain tables are required in this phase.

### 5.5 Integration baseline

The phase should prove:

- browser → frontend;
- frontend → backend;
- backend → PostgreSQL;
- predictable application behavior when a required local dependency is unavailable.

## 6. Explicit non-goals

Do **not** implement any of the following in Implementation Phase 1:

### Product/domain features

- authentication or user accounts;
- roles or permissions;
- Goals;
- Pursuits;
- Activities;
- Projects;
- Memories or Memory Engine;
- conversations or messages;
- journal;
- chat;
- Today;
- Timeline;
- Search;
- StoryOfMe;
- reflections or Insights;
- domain settings/preferences.

### AI/semantic features

- AI provider integration;
- model calls;
- prompt infrastructure;
- structured AI output;
- embedding generation;
- embedding persistence;
- vector similarity search;
- RAG;
- context building;
- retrieval/ranking;
- agents;
- tool execution.

### Runtime/infrastructure expansion

- production deployment;
- hosting-provider selection;
- production TLS setup;
- production secret-management infrastructure;
- complex CI/CD;
- caches;
- queues;
- distributed jobs;
- microservices;
- object storage;
- synchronization;
- backup/recovery architecture;
- observability platforms;
- telemetry/analytics;
- performance optimization.

Do not create empty placeholder modules for these deferred systems.

## 7. Dependencies

### Repository dependencies

This implementation phase is derived from and constrained by:

- Repository Baseline v1 plus the recorded backend-stack historical correction;
- historical Phase 1 — Product Foundation;
- historical Phase 1.2 — Product Model Refinement;
- corrected historical Phase 2 — V1 Architecture;
- applicable active decisions and architecture documents;
- applicable cross-project requirements.

Historical Phase 3A/3B may constrain the foundation only where durable principles have already been promoted into active repository architecture or decisions. Their feature systems are not Phase 1 implementation requirements.

### Development-environment decisions to settle in SPEC

SPEC must choose, rather than inherit from the invalidated Spring Boot SPEC:

- supported Node.js version or version range;
- supported Next.js and TypeScript versions;
- NestJS version;
- frontend/backend package-manager and lockfile/workspace conventions;
- exact frontend scaffold and routing conventions;
- exact backend project/module structure;
- PostgreSQL/pgvector development versions;
- local database/container orchestration approach where needed;
- database-access approach;
- migration library and migration ownership;
- backend/API implementation details;
- testing libraries and test strategy;
- exact runtime configuration and environment-variable conventions.

No AI provider, authentication provider, or cloud service is a Phase 1 dependency.

## 8. Proposed repository/application structure

The PLAN establishes only this responsibility-level direction:

```text
aevum/
├── frontend/
│   └── Next.js + TypeScript application
├── backend/
│   └── NestJS + TypeScript application
├── infra/
│   └── local infrastructure where justified
├── docs/
│   ├── phases/
│   │   └── historical planning archive
│   └── implementation/
│       └── active PSB implementation contracts
├── local configuration examples where required
├── local database orchestration where required
└── README.md
```

This is not a frozen file tree.

SPEC must define exact paths, package/workspace organization, configuration filenames, scripts, and backend module structure.

Do not create speculative top-level modules for Memory, Goals, Pursuits, AI, RAG, agents, jobs, authentication, or other deferred capabilities.

## 9. Frontend foundation direction

The frontend should establish only the minimum reusable foundation needed by future Aevum screens:

- Next.js + TypeScript starts successfully;
- a minimal application route renders;
- backend communication occurs through an explicit application boundary rather than scattered direct fetch logic;
- the backend address is configuration-driven;
- backend unavailability is handled without crashing the page;
- no domain-specific persistent state is introduced.

SPEC must decide:

- supported runtime/framework/compiler versions;
- routing convention;
- exact minimal page structure;
- styling baseline;
- lint/typecheck commands;
- frontend test-runner approach if justified.

Do not introduce authentication, global state management, a complex component system, domain navigation, or generated API tooling merely for anticipated future use.

## 10. Backend foundation direction

The backend should remain one **NestJS + TypeScript** application following the initial modular-monolith direction.

Its Phase 1 responsibilities are limited to:

- starting correctly;
- loading required configuration;
- connecting to PostgreSQL;
- executing or invoking the approved migration mechanism;
- exposing one small application-owned system/status contract;
- returning stable project-owned output appropriate for the frontend foundation.

Transport/controller logic should remain thin, and application/database responsibilities should remain explicit enough to support later modular growth without manufacturing unused domain modules.

This PLAN does **not** choose:

- exact NestJS module/package structure;
- ORM versus query builder versus lower-level PostgreSQL access;
- migration library;
- API route/DTO shape;
- health/readiness library;
- test framework details;
- backend runtime/configuration conventions.

Those are SPEC-stage decisions.

## 11. Database foundation direction

Implementation Phase 1 should establish PostgreSQL and migration control without prematurely designing Aevum's domain schema.

The phase must not require tables for:

- users;
- memories;
- goals;
- pursuits;
- activities;
- journals;
- conversations/messages;
- embeddings;
- relationships among those entities.

Those require later feature-specific specifications and, where applicable, authentication/ownership decisions.

## 12. pgvector decision for Phase 1

### PLAN decision: enable the capability now; defer vector behavior

pgvector is already an approved V1 technology direction. The executable architecture foundation should therefore prove that the selected PostgreSQL development environment supports the extension.

Implementation Phase 1 should establish migration-controlled pgvector availability.

It must **not** establish:

- vector columns;
- embedding dimensions;
- embedding model metadata;
- vector indexes;
- embedding generation;
- vector similarity queries;
- semantic retrieval.

The embedding model and vector dimensionality remain unresolved until a later implementation phase requires vector persistence.

## 13. Frontend/backend communication baseline

The phase should establish exactly one small non-domain HTTP path conceptually equivalent to:

```text
frontend
  ↓
application/system readiness request
  ↓
backend
  ↓
required foundation readiness
  ↓
small stable JSON response
```

The contract should expose only information needed to establish application readiness. It must not expose database credentials, environment variables, stack traces, or sensitive infrastructure diagnostics.

SPEC must define:

- exact route and HTTP method;
- response DTO/shape;
- error behavior;
- frontend TypeScript representation;
- database-readiness semantics;
- whether framework health/readiness utilities are used internally.

The frontend should depend on an Aevum-owned application contract, not directly on a framework-specific management endpoint.

## 14. Local development environment direction

The PLAN favors a simple development model:

- frontend runs through its normal Next.js development tooling;
- backend runs through its normal NestJS/Node.js development tooling;
- PostgreSQL + pgvector runs through Docker Compose or an equivalently lightweight, reproducible local database mechanism selected during SPEC.

Phase 1 does not require containerizing the frontend and backend.

The repository should eventually document a predictable sequence equivalent to:

```text
prepare configuration
  ↓
start database
  ↓
start backend
  ↓
start frontend
  ↓
verify application
```

Exact commands belong in SPEC/BUILD documentation.

## 15. Configuration/environment approach

The phase must establish these principles:

### Backend

- database connection settings come from configuration/environment rather than committed credentials;
- required configuration failures are actionable;
- server-only secrets remain server-side.

### Frontend

- only values safe for browser exposure may use public frontend environment variables;
- the backend location or other non-secret browser configuration is configuration-driven.

### Repository

- real secret/config overrides are excluded from source control;
- example configuration is committed where useful;
- example values contain no real credentials;
- server credentials are never exposed through frontend-public configuration.

Exact variable names, file names, validation mechanisms, and local profiles must be defined during SPEC.

## 16. Minimum security requirements

Because Phase 1 intentionally contains no authentication and no protected personal data, it must not create temporary/fake identity behavior.

The minimum security baseline is:

- no credentials committed to Git;
- no secrets returned to the browser;
- no database credentials exposed through APIs;
- no environment-variable dumping;
- no internal stack traces returned as normal frontend data;
- local-development cross-origin access is restricted to the origins required by the development setup rather than made universally permissive without need;
- the backend remains the trusted server boundary;
- logs do not contain secrets;
- no personal information is intentionally persisted by Phase 1;
- dependencies remain minimal;
- the project must not claim local-only, offline-first, end-to-end-encrypted, zero-retention, or equivalent guarantees not established by specification.

Authentication/authorization must be specified before a later phase handles protected user data.

## 17. Testing and verification strategy

This PLAN establishes verification intent. Exact commands, tools, fixtures, acceptance criteria, and Definition of Done belong in the regenerated SPEC.

### Frontend

Verify as applicable that:

- dependencies install successfully;
- the application builds/runs;
- TypeScript/static checks pass;
- configured backend communication works;
- the minimal application route renders;
- backend unavailability produces understandable behavior rather than a frontend crash.

A new test framework should not be introduced solely for nominal coverage unless SPEC demonstrates a meaningful Phase 1 benefit.

### Backend

Verify as applicable that:

- the NestJS application boots;
- automated backend tests pass;
- configuration loads as specified;
- the system/status contract behaves as specified;
- database startup/connectivity failures are surfaced clearly.

### Database

Using a real PostgreSQL + pgvector-capable environment, verify that:

- the database starts;
- migrations execute from a clean database;
- pgvector capability initializes successfully;
- the backend establishes its required connection.

SPEC must select the database-access layer, migration mechanism, integration-test tooling, and reproducible verification method.

### Manual vertical smoke test

The completed phase must prove the real local chain:

```text
database starts
  ↓
backend starts and initializes
  ↓
frontend starts
  ↓
browser loads frontend
  ↓
frontend reaches backend
  ↓
foundation status succeeds
```

A fresh-clone/setup verification should be performed where practical to validate the documented setup path.

## 18. Documentation affected by implementation

The implementation cycle is expected to update only documentation affected by durable implementation facts.

At minimum:

- `docs/implementation/PHASE-01.md` — active implementation contract and lifecycle state;
- `docs/PROGRESS.md` — actual PSB and implementation status;
- `README.md` — actual setup/start instructions after implementation exists;
- `docs/DECISIONS.md` — only when SPEC/BUILD establishes a durable cross-project decision;
- architecture documents — only when durable architecture facts are established or changed.

`docs/phases/` remains the historical planning archive and should not be rewritten as the implementation contract.

## 19. SPEC-stage unresolved decisions

The revised PLAN deliberately returns implementation mechanics to SPEC. The invalidated Spring Boot SPEC is not a source of binding implementation detail.

### Toolchain and workspace

SPEC must establish:

- supported Node.js version or version range;
- supported Next.js version;
- supported TypeScript version;
- supported NestJS version;
- frontend/backend package manager choice;
- whether frontend and backend use separate package roots or a workspace/monorepo convention;
- lockfile strategy;
- development/build scripts.

### Frontend

SPEC must resolve:

- routing convention;
- exact minimal page structure;
- styling baseline;
- lint/typecheck/build commands;
- test-runner decision;
- frontend API-boundary implementation.

### Backend

SPEC must resolve:

- exact NestJS application/project structure;
- module boundaries for the Phase 1 foundation capability;
- controller/service/DTO organization;
- configuration-validation approach;
- exact system/status route and DTO;
- database readiness behavior;
- ORM/query-builder/database-client choice, if any;
- migration library;
- migration ownership/location;
- pgvector initialization behavior;
- test framework and integration-test approach.

### Database/local infrastructure

SPEC must resolve:

- PostgreSQL development version;
- pgvector-compatible image/distribution/version;
- local database/container versioning;
- database name;
- schema strategy if any;
- clean initialization behavior;
- how migration execution is wired into local development and tests.

### Integration/configuration

SPEC must resolve:

- frontend/backend local ports;
- allowed development origins/CORS behavior;
- API base-URL configuration;
- exact error contract;
- environment-variable names;
- example/local configuration file convention;
- startup/readiness/failure semantics.

### Verification

SPEC must resolve:

- exact frontend checks;
- exact backend test suite;
- database integration verification strategy;
- clean migration verification procedure;
- manual smoke-test commands and evidence requirements;
- acceptance criteria;
- Definition of Done.

## 20. Deferred work

The following remains intentionally deferred to later PSB cycles:

- all user-facing Aevum domains;
- identity, authentication, authorization, protected-data ownership, deletion/export workflows;
- AI providers and model operations;
- Memory Engine;
- embeddings and semantic retrieval;
- RAG/context construction;
- agents/tool architecture;
- queues/background AI jobs;
- caching/object storage;
- synchronization;
- observability platforms;
- production deployment/hosting;
- backup/recovery architecture;
- production secrets/key management;
- complex CI/CD.

## 21. Revised PLAN approval state

The previous PLAN/SPEC approval chain cannot authorize BUILD because its backend architecture was derived from the cross-project Java/Spring Boot migration defect. The corrected revised PLAN has now passed PSB review.

Current state:

- revised PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `NOT_STARTED`
- Build eligibility: `NOT_READY_FOR_BUILD`
- BUILD: `BLOCKED`
- Previous BUILD attempt: halted before commit
- Accepted/committed Phase 1 implementation: none

The replacement SPEC may be prepared only as the next explicit PSB stage. BUILD remains unauthorized until that replacement SPEC is approved and the phase explicitly returns to `READY_FOR_BUILD`.

### PLAN Approval Record

The Aevum PSB Guide approved the revised PLAN with the following review conditions satisfied:

- [x] The preserved phase purpose remains correct: prove Aevum's executable local foundation without major product features.
- [x] The architecture boundary is correctly restored to Next.js + TypeScript → NestJS + TypeScript → PostgreSQL + pgvector.
- [x] The initial modular-monolith direction remains active.
- [x] Java + Spring Boot is treated only as a recorded migration defect belonging to OrbisOne, not as an Aevum backend option.
- [x] Authentication and protected personal-data behavior remain out of scope.
- [x] Goals, Pursuits, Activities, Projects, Memories/Memory Engine, Journal, Chat, Today, Timeline, Search, StoryOfMe, and other product domains remain out of scope.
- [x] AI-provider integration, embeddings, semantic retrieval, RAG, agents, and tool execution remain out of scope.
- [x] pgvector remains infrastructure capability only; vector schemas and embeddings remain deferred.
- [x] No speculative future modules are required.
- [x] Exact toolchain/framework versions are returned to SPEC.
- [x] Exact NestJS project/module structure is returned to SPEC.
- [x] ORM/database-access choice is returned to SPEC.
- [x] Migration library and migration wiring are returned to SPEC.
- [x] Exact API route/DTO/error behavior is returned to SPEC.
- [x] Exact runtime configuration, ports, CORS, and environment-variable names are returned to SPEC.
- [x] Exact tests, verification commands, acceptance criteria, and Definition of Done are returned to SPEC.
- [x] The previous Spring Boot SPEC is invalidated rather than mechanically translated.
- [x] BUILD remains blocked and `NOT_READY_FOR_BUILD` until the replacement SPEC passes PSB review and the phase is explicitly restored to `READY_FOR_BUILD`.

**PLAN review result:** `APPROVED`

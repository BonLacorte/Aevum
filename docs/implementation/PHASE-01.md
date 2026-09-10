# Implementation Phase 1 — Executable Application Foundation

PLAN status: `PLAN_APPROVED`  
Previous SPEC status: `SPEC_INVALIDATED`  
Replacement SPEC status: `SPEC_APPROVED`  
Build eligibility: `READY_FOR_BUILD`  
BUILD status: `COMPLETED`
Verification: `VERIFIED`
Phase lifecycle: `CLOSED`

> A historical architecture migration defect invalidated the previous Java/Spring Boot PLAN assumptions and detailed SPEC. That earlier BUILD was halted before commit and was never accepted. The revised PLAN and replacement NestJS/TypeScript SPEC in this document are approved. The replacement BUILD completed and passed final PSB review on 2026-09-10; this phase is `VERIFIED` and `CLOSED`.

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
- replacement SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `COMPLETED`
- Verification: `VERIFIED`
- Phase lifecycle: `CLOSED`
- Previous Spring Boot BUILD attempt: halted before commit and never accepted
- Accepted/committed Phase 1 implementation from that invalidated BUILD: none

The replacement NestJS/TypeScript SPEC below passed PSB review and governed the completed replacement BUILD. The final PSB review result is recorded in the closeout record below.

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
- [x] At the PLAN approval checkpoint, BUILD correctly remained blocked and `NOT_READY_FOR_BUILD` until replacement SPEC review. That gate has now passed, and the current lifecycle is recorded separately as `READY_FOR_BUILD` with BUILD `NOT_STARTED`.

**PLAN review result:** `APPROVED`


---

# Replacement SPEC — Approved

## 22. SPEC purpose and authority

This replacement SPEC converts the approved revised PLAN into one concrete, implementable foundation contract using Aevum's corrected historical architecture:

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

This SPEC is intentionally new. It does not inherit Java, Spring Boot, Maven, JDK, Spring JDBC, Flyway-via-Spring, Spring package structure, Spring Actuator, or any other implementation mechanic from the invalidated SPEC.

The approved revised PLAN remains the scope boundary. If any wording in this SPEC appears to broaden the PLAN, the PLAN wins and the broader interpretation is rejected.

Approved lifecycle at this READY_FOR_BUILD checkpoint:

- PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

At that checkpoint, the replacement SPEC was approved to govern implementation once Codex received an explicit BUILD instruction. The phase was not yet `BUILDING`.

## 23. Resolved toolchain and framework versions

### 23.1 Shared Node.js runtime

Phase 1 supports:

```text
Node.js >=24.21.0 <25
```

The development and verification baseline is:

```text
Node.js 24.21.0 LTS
```

A root `.nvmrc` must contain:

```text
24.21.0
```

Every workspace package must declare an `engines.node` range compatible with `>=24.21.0 <25`.

Node.js 26 Current is not adopted in Phase 1. The foundation uses the active LTS line rather than the Current line.

### 23.2 Shared package manager

The repository package manager is:

```text
pnpm 12.3.4
```

The root `package.json` must declare:

```json
{
  "packageManager": "pnpm@12.3.4"
}
```

`pnpm --version` must report `12.3.4` during verification.

Do not create npm or Yarn lockfiles.

### 23.3 Frontend framework

Frontend versions are fixed to:

```text
Next.js 16.3.3
React 19.2.8
React DOM 19.2.8
```

Next.js uses the **App Router** and the `src/` directory convention.

Do not use the Pages Router for Phase 1.

### 23.4 Shared TypeScript version

Both frontend and backend use the ordinary npm package:

```text
typescript@5.9.3
```

The exact package must be declared directly in both workspace package manifests as a development dependency:

```text
@aevum/frontend → typescript 5.9.3
@aevum/backend  → typescript 5.9.3
```

The root `package.json` must **not** contain a repository-wide pnpm override that rewrites transitive `typescript` dependencies. Unrelated tooling may resolve its own compatible TypeScript dependency versions through the lockfile.

Phase 1 must **not** use:

- the invalidated TypeScript 6 compatibility alias;
- `@typescript/typescript6`;
- `tsc6`;
- TypeScript 7;
- Next.js `experimental.useTypeScriptCli`.

Rationale: Phase 1 requires one conventional compiler package that works without a compatibility alias or experimental Next.js compiler path. TypeScript 5.9.3 is the shared Phase 1 compiler baseline.

Verification must include:

```text
pnpm --filter @aevum/frontend exec tsc --version
pnpm --filter @aevum/backend exec tsc --version
```

Both must report:

```text
Version 5.9.3
```

### 23.5 NestJS

Phase 1 deliberately uses the mature NestJS 11 line rather than NestJS 12.

Backend framework/tooling versions are fixed to:

```text
@nestjs/common 11.2.3
@nestjs/core 11.2.3
@nestjs/platform-express 11.2.3
@nestjs/testing 11.2.3
@nestjs/config 4.0.2
@nestjs/cli 11.0.24
```

Required Nest runtime peer dependencies are pinned to:

```text
reflect-metadata 0.2.2
rxjs 7.8.2
```

`@nestjs/schematics` must **not** be declared as a direct Aevum dependency in Phase 1. The Nest CLI may use its own compatible schematics dependency internally; Phase 1 does not invoke schematics as an application dependency.

The Phase 1 backend uses Nest's default Express HTTP adapter.

Do not introduce NestJS 12, Fastify, GraphQL, WebSockets, microservices transports, or a second Nest application.

### 23.6 PostgreSQL and pgvector

The supported database major is:

```text
PostgreSQL 18.x
```

The Phase 1 baseline current minor is:

```text
PostgreSQL 18.6
```

The required vector extension version is:

```text
pgvector 0.8.6
```

Local development and integration tests use:

```text
pgvector/pgvector:0.8.6-pg18-trixie
```

The repository intentionally pins the pgvector release and PostgreSQL major through that image tag. Verification must confirm that the running server is PostgreSQL major 18 and that the installed `vector` extension reports version `0.8.6`.

A future PostgreSQL 18 minor security/fix update does not require reopening the architecture decision, but changing the PostgreSQL major or pgvector release requires an explicit later dependency/update decision.

### 23.7 Database and testing libraries

Backend Phase 1 uses:

```text
pg 8.23.0
node-pg-migrate 9.0.0
dotenv 17.4.2
zod 4.5.4
@testcontainers/postgresql 12.1.0
testcontainers 12.1.0
supertest 7.2.2
jest 30.5.1
ts-jest 29.4.12
reflect-metadata 0.2.2
rxjs 7.8.2
```

`reflect-metadata` and `rxjs` are required Nest runtime peer dependencies for this Phase 1 backend and are not new architectural capabilities.

These libraries serve only the Phase 1 foundation responsibilities defined below.

## 24. Workspace and lockfile strategy

### 24.1 Repository model

Aevum uses a **pnpm workspace** with independent frontend/backend application roots and one repository-level dependency lock.

Required root structure:

```text
aevum/
├── .gitignore
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── frontend/
├── backend/
├── infra/
└── docs/
```

`pnpm-workspace.yaml` must include exactly the Phase 1 application packages:

```text
frontend
backend
```

Do not add a `packages/`, `shared/`, `common/`, `sdk/`, or future-domain workspace merely in anticipation of later work.

### 24.2 Package identities

Use:

```text
frontend package name: @aevum/frontend
backend package name:  @aevum/backend
```

Both packages are private.

### 24.3 Lockfile

There must be exactly one committed dependency lockfile:

```text
pnpm-lock.yaml
```

It lives at repository root.

The following must not exist after BUILD:

```text
frontend/package-lock.json
backend/package-lock.json
package-lock.json
yarn.lock
frontend/pnpm-lock.yaml
backend/pnpm-lock.yaml
```

### 24.4 Root orchestration

The root `package.json` must provide scripts conceptually equivalent to:

```text
dev:frontend
dev:backend
db:up
db:down
db:migrate
lint
typecheck
build
test
test:integration
verify
```

The scripts must delegate to the two workspaces and `infra/compose.yaml`; the root package must not contain application source code.

`verify` must run all non-manual Phase 1 verification required by Section 38, excluding only the destructive clean-database procedure and the manual browser smoke test.

## 25. Exact repository structure

The BUILD must establish this Phase 1 structure:

```text
aevum/
├── .gitignore
├── .nvmrc
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── frontend/
│   ├── .env.local.example
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   └── foundation-status.tsx
│       └── lib/
│           └── api/
│               └── system-status.ts
├── backend/
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── jest.config.cjs
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.build.json
│   ├── tsconfig.json
│   ├── migrations/
│   │   └── 001_enable_vector.ts
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── config/
│   │   │   └── environment.ts
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   └── database.service.ts
│   │   └── system/
│   │       ├── dto/
│   │       │   └── system-status.dto.ts
│   │       ├── system.controller.ts
│   │       ├── system.module.ts
│   │       └── system.service.ts
│   └── test/
│       ├── jest.integration.config.cjs
│       └── system-status.integration-spec.ts
├── infra/
│   ├── .env.example
│   └── compose.yaml
└── docs/
    └── ...
```

Small framework-generated support files are allowed when required by the chosen versions, but Codex must not create speculative application modules or future-domain directories.

## 26. Frontend specification

### 26.1 Routing and rendering

The frontend uses the Next.js App Router.

Phase 1 has one user-facing route:

```text
/
```

`src/app/page.tsx` renders the Phase 1 application-foundation experience only.

No dashboard, authenticated shell, domain navigation, route groups, or product-domain routes are permitted.

### 26.2 Styling

Use the existing Next.js-compatible CSS pipeline with:

```text
src/app/globals.css
```

Do not add Tailwind CSS, a component library, CSS-in-JS framework, design system, icon library, or animation library in Phase 1.

The foundation screen should be clean and readable but visually minimal.

### 26.3 Frontend API boundary

All browser communication with the Phase 1 backend contract must go through:

```text
frontend/src/lib/api/system-status.ts
```

Components must not scatter direct backend `fetch()` calls elsewhere.

This module owns:

- the frontend `SystemStatusResponse` TypeScript union;
- runtime validation/type guarding of the received JSON;
- the configured API base URL;
- the status request;
- conversion of network/protocol/shape failures into a frontend-safe unavailable result.

No generated API client and no shared frontend/backend DTO workspace package is introduced in Phase 1.

### 26.4 API base configuration

The frontend reads:

```text
NEXT_PUBLIC_AEVUM_API_BASE_URL
```

Required local example:

```text
NEXT_PUBLIC_AEVUM_API_BASE_URL=http://localhost:8080
```

Rules:

- value must be an absolute `http://` or `https://` URL;
- no trailing slash is required by the contract; implementation must normalize safely;
- the frontend must not contain a second hard-coded production/backend URL;
- no secret may use the `NEXT_PUBLIC_` prefix.

If the variable is missing or invalid, the UI must enter the unavailable state with a safe configuration message rather than exposing an exception trace.

### 26.5 Frontend request behavior

On first client mount:

1. enter `CHECKING`;
2. call `GET {NEXT_PUBLIC_AEVUM_API_BASE_URL}/api/system/status`;
3. use `cache: "no-store"`;
4. abort the request after **5 seconds**;
5. validate the HTTP status and response body;
6. render `READY` or `UNAVAILABLE`.

No automatic polling, background refresh loop, WebSocket, or Server-Sent Events are permitted.

The unavailable state includes one manual **Retry** action. Retry repeats the same request contract.

### 26.6 Frontend visible states

#### CHECKING

Render:

```text
Aevum
Checking application foundation…
```

The Retry action is not shown while a request is in flight.

#### READY

When HTTP 200 returns the exact valid READY DTO, render:

```text
Aevum application foundation is ready.
Backend: UP
Database: UP
pgvector: AVAILABLE
```

No Retry action is required in READY.

#### NOT_READY from backend

When HTTP 503 returns one of the valid NOT_READY DTOs, render:

```text
Aevum application foundation is not ready.
Backend: UP
Database: <DTO database value>
pgvector: <DTO pgvector value>
Retry
```

#### Backend/configuration/protocol unavailable

For network failure, timeout, missing/invalid API base URL, unexpected HTTP status, malformed JSON, or invalid DTO shape, render:

```text
Aevum backend is unavailable.
Backend: DOWN
Database: UNKNOWN
pgvector: UNKNOWN
Retry
```

Do not display raw fetch errors, stack traces, environment values, URLs containing credentials, or backend exception bodies.

## 27. NestJS application specification

### 27.1 Application shape

The backend is one NestJS modular-monolith application.

Required top-level application modules for Phase 1 are only:

```text
AppModule
DatabaseModule
SystemModule
ConfigModule
```

`ConfigModule` may be configured globally by `AppModule`.

`DatabaseModule` must be imported explicitly by `SystemModule`; do not make the database service a globally available application dependency merely for convenience.

Do not create modules named or corresponding to:

```text
Auth
Users
Goals
Pursuits
Activities
Projects
Memory
Journal
Chat
AI
RAG
Agents
Jobs
Queues
Cache
Timeline
Search
StoryOfMe
```

### 27.2 Application bootstrap

`src/main.ts` must:

- create the single Nest application;
- use the default Express adapter;
- set global API prefix `api`;
- enable the local CORS contract from Section 34;
- listen on the validated `AEVUM_API_PORT`;
- not print secrets or the database URL.

The backend must be capable of starting when the database is temporarily unavailable, provided environment configuration itself is valid.

Database reachability is a readiness concern, not a prerequisite for constructing the HTTP application process.

### 27.3 Transport/application separation

`SystemController` must remain transport-thin:

- handle `GET /api/system/status`;
- delegate readiness calculation to `SystemService`;
- set HTTP 200 or 503 based on the returned application status;
- return the exact application-owned DTO.

`SystemService` owns the readiness decision.

`DatabaseService` owns PostgreSQL connectivity/readiness primitives.

The controller must not issue SQL directly.

### 27.4 No framework health endpoint dependency

Do not add `@nestjs/terminus` in Phase 1.

The public Phase 1 contract is Aevum-owned and must not expose a framework-specific health payload.

### 27.5 Backend module-system contract

The Phase 1 NestJS backend uses **CommonJS** module semantics.

`backend/package.json` must explicitly contain:

```json
{
  "type": "commonjs"
}
```

`backend/tsconfig.json` must use:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  }
}
```

`backend/tsconfig.build.json` must extend `tsconfig.json`, exclude tests and test configuration from production compilation, and must not override the CommonJS `module` or `moduleResolution` settings.

Source files may use normal TypeScript `import` / `export` syntax; TypeScript compilation must emit CommonJS-compatible JavaScript.

The Nest production build must emit runnable application output under:

```text
backend/dist/
```

The production entry contract is:

```text
backend/dist/main.js
```

and `start:prod` must execute:

```text
node dist/main.js
```

Do not use:

```text
"type": "module"
module: nodenext
moduleResolution: nodenext
module: node16
moduleResolution: node16
.mjs production entrypoints
ESM-only backend bootstrap behavior
```

Jest configuration remains CommonJS:

```text
backend/jest.config.cjs
backend/test/jest.integration.config.cjs
```

`ts-jest` must compile backend unit/integration test TypeScript using CommonJS-compatible compiler semantics. No ESM Jest preset, `--experimental-vm-modules`, or TypeScript-config loader may be introduced.

This CommonJS decision is a Phase 1 toolchain-stability choice. It does not redefine Aevum's architecture and may be revisited only through a later approved implementation decision if an actual ESM requirement appears.

## 28. Database-access approach

### 28.1 Phase 1 decision

Use **node-postgres (`pg`) directly**.

Do not introduce an ORM or query builder in Phase 1.

Specifically excluded for this phase:

```text
Prisma
TypeORM
Drizzle ORM
Kysely
Sequelize
MikroORM
```

This is not a permanent rejection of those tools. Phase 1 has no product/domain tables, so choosing a domain persistence abstraction now would be premature.

### 28.2 Database service

`DatabaseService` owns one `pg.Pool`.

Pool configuration is derived from validated backend configuration.

Required Phase 1 connection timeout:

```text
connectionTimeoutMillis = 2000
```

No connection is required during Nest application construction. Queries establish/use pool connections lazily.

`DatabaseService` must close the pool during Nest application shutdown.

### 28.3 Database readiness operations

`DatabaseService` must provide an application-level readiness result using real PostgreSQL queries.

Required sequence:

1. execute a simple database reachability query equivalent to `SELECT 1`;
2. if it succeeds, query PostgreSQL extension metadata for `vector`;
3. map the result according to Section 32.

Do not query Aevum domain tables because none exist in Phase 1.

## 29. Migration tooling and ownership

### 29.1 Migration tool

Use:

```text
node-pg-migrate 9.0.0
```

Migration ownership belongs to the **backend workspace**.

Migration files live only under:

```text
backend/migrations/
```

### 29.2 Migration execution model

Migrations are explicit repository/developer actions.

The Nest application must **not automatically run migrations during normal application startup**.

The backend package must provide:

```text
db:migrate
db:rollback
```

The backend must declare pinned `dotenv@17.4.2` so node-pg-migrate can load the backend workspace's `.env` file without requiring manual shell exports.

Because these scripts execute with `backend/` as the pnpm workspace working directory, their required command contracts are:

```text
db:migrate
→ node-pg-migrate up --envPath .env --migrations-dir migrations

db:rollback
→ node-pg-migrate down --envPath .env --migrations-dir migrations
```

Both commands must obtain `DATABASE_URL` from `backend/.env` when that file exists. They must not require the developer to manually export or set `DATABASE_URL` in the shell before running the migration command.

`--envPath .env` is mandatory in both migration scripts; relying only on node-pg-migrate's implicit current-directory `.env` lookup is not sufficient for this Phase 1 contract.

Migration files remain under `backend/migrations/`, and the commands operate from the backend workspace.

The migration history table is:

```text
public.pgmigrations
```

### 29.3 Initial migration

The only Phase 1 schema migration is:

```text
001_enable_vector.ts
```

Its behavior is:

```text
UP:
CREATE EXTENSION IF NOT EXISTS vector

DOWN:
DROP EXTENSION IF EXISTS vector
```

The DOWN behavior must not use `CASCADE`.

The migration must not create any Aevum product/domain table, vector column, embedding table, index, user table, or seed data.

### 29.4 Re-run behavior

Running `db:migrate` twice against the same up-to-date database must succeed and make no second schema change.

## 30. Local PostgreSQL/Docker specification

### 30.1 Compose scope

Only PostgreSQL + pgvector is containerized in Phase 1.

Do not containerize the frontend or backend.

Required file:

```text
infra/compose.yaml
```

Required Compose service name:

```text
postgres
```

Do **not** set a fixed `container_name`. Docker Compose project scoping must manage the actual container name so parallel checkouts, branches, or differently scoped Compose projects do not collide unnecessarily.

Required image:

```text
pgvector/pgvector:0.8.6-pg18-trixie
```

### 30.2 Database port and storage

Default host mapping:

```text
5432:5432
```

The host port is configurable through:

```text
POSTGRES_PORT
```

Default:

```text
5432
```

Use one named Docker volume:

```text
aevum_pgdata
```

No additional database container, Redis, queue, object store, proxy, or admin UI may be added.

### 30.3 Compose health check

The PostgreSQL container must have a `pg_isready` health check based on the configured database/user.

Local setup instructions must wait for the container to be healthy before migrations are run.

## 31. Environment and configuration contract

### 31.1 Root ignore contract

The root `.gitignore` must ignore at minimum:

```text
/backend/.env
/frontend/.env.local
/infra/.env
**/node_modules/
frontend/.next/
backend/dist/
backend/coverage/
```

The following example files must remain trackable:

```text
backend/.env.example
frontend/.env.local.example
infra/.env.example
```

No rule may accidentally ignore those example files.

### 31.2 Backend environment

Required committed example:

```text
backend/.env.example
```

It must contain safe local example values equivalent to:

```text
NODE_ENV=development
AEVUM_API_PORT=8080
AEVUM_CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgres://aevum:aevum_local@localhost:5432/aevum
AEVUM_DB_CONNECTION_TIMEOUT_MS=2000
```

`DATABASE_URL` is server-only and must never be exposed to the frontend.

### 31.3 Backend validation

Use `@nestjs/config` plus **Zod 4.5.4** to validate environment configuration during bootstrap.

Required validation:

```text
NODE_ENV:
  development | test | production
  default development

AEVUM_API_PORT:
  integer 1..65535
  default 8080

AEVUM_CORS_ORIGIN:
  one absolute http:// or https:// origin
  default http://localhost:3000
  must not be "*"

DATABASE_URL:
  required
  valid postgres:// or postgresql:// URL

AEVUM_DB_CONNECTION_TIMEOUT_MS:
  positive integer
  default 2000
```

Invalid configuration must fail backend startup with an actionable error that identifies the invalid **variable name** but does not print secret values or the full `DATABASE_URL`.

### 31.4 Frontend environment

Required committed example:

```text
frontend/.env.local.example
```

with:

```text
NEXT_PUBLIC_AEVUM_API_BASE_URL=http://localhost:8080
```

The real local file is:

```text
frontend/.env.local
```

and must be ignored.

### 31.5 Infra environment

Required committed example:

```text
infra/.env.example
```

with safe local development values:

```text
POSTGRES_DB=aevum
POSTGRES_USER=aevum
POSTGRES_PASSWORD=aevum_local
POSTGRES_PORT=5432
```

The real local file:

```text
infra/.env
```

must be ignored.

The local example password is explicitly a development-only example and must not be described as a production secret strategy.

## 32. Application-owned system status contract

### 32.1 Endpoint

Exact endpoint:

```text
GET /api/system/status
```

Response media type:

```text
application/json
```

No request body, query parameters, authentication, cookies, or credentials are used.

### 32.2 DTO

The response is exactly one of these three shapes and contains no additional fields.

#### READY

HTTP:

```text
200 OK
```

Body:

```json
{
  "status": "READY",
  "database": "UP",
  "pgvector": "AVAILABLE"
}
```

#### Database unavailable

HTTP:

```text
503 Service Unavailable
```

Body:

```json
{
  "status": "NOT_READY",
  "database": "DOWN",
  "pgvector": "UNKNOWN"
}
```

#### PostgreSQL reachable but pgvector unavailable

HTTP:

```text
503 Service Unavailable
```

Body:

```json
{
  "status": "NOT_READY",
  "database": "UP",
  "pgvector": "UNAVAILABLE"
}
```

### 32.3 TypeScript DTO domain

The backend DTO must restrict values to:

```text
status:     READY | NOT_READY
database:   UP | DOWN
pgvector:   AVAILABLE | UNAVAILABLE | UNKNOWN
```

Only the three combinations listed above are valid Phase 1 responses.

### 32.4 No diagnostic leakage

The endpoint must not return:

- database URL;
- host/user/password;
- PostgreSQL version;
- pgvector version;
- environment values;
- exception message;
- stack trace;
- SQL;
- internal module/framework details.

Version verification belongs to tests/setup verification, not the public status payload.

## 33. Readiness semantics

### 33.1 READY

Return READY only when:

1. the PostgreSQL reachability query succeeds; and
2. the `vector` extension exists in the connected database.

### 33.2 Database DOWN

If the initial PostgreSQL connection/query fails for any reason:

```text
HTTP 503
status     = NOT_READY
database   = DOWN
pgvector   = UNKNOWN
```

The request should complete after the configured database connection timeout rather than hang indefinitely.

### 33.3 pgvector UNAVAILABLE

If PostgreSQL is reachable but the query of `pg_extension` shows no installed `vector` extension:

```text
HTTP 503
status     = NOT_READY
database   = UP
pgvector   = UNAVAILABLE
```

If the extension-metadata query fails after database reachability was already proven, treat pgvector as unavailable and return the same 503 shape without leaking the database error.

### 33.4 Extension version

Runtime readiness checks **presence**, not an exact pgvector version string.

The Phase 1 environment/test verification separately proves that the selected local/test environment uses pgvector `0.8.6`.

This prevents the public readiness contract from becoming a version-reporting endpoint.

## 34. Ports and CORS

### 34.1 Default local ports

```text
Frontend:   3000
Backend:    8080
PostgreSQL: 5432
```

### 34.2 CORS contract

The backend enables CORS for exactly the validated `AEVUM_CORS_ORIGIN`.

Default allowed origin:

```text
http://localhost:3000
```

Phase 1 CORS behavior:

```text
allowed methods: GET, OPTIONS
credentials: false
wildcard origin: prohibited
```

Do not add broad production-origin lists, regex origin matching, credentials/cookies, or authentication headers in Phase 1.

## 35. Frontend scripts and verification

`frontend/package.json` must provide at minimum:

```text
dev
build
start
lint
typecheck
```

Required semantics:

```text
dev       -> next dev
build     -> next build
start     -> next start
lint      -> ESLint check with no auto-fix requirement
typecheck -> tsc --noEmit
```

The following must pass from repository root:

```text
pnpm install --frozen-lockfile

pnpm --filter @aevum/frontend exec tsc --version
pnpm --filter @aevum/frontend lint
pnpm --filter @aevum/frontend typecheck
pnpm --filter @aevum/frontend build
```

TypeScript version output must be:

```text
Version 5.9.3
```

The frontend build must not suppress TypeScript errors.

### 35.1 Frontend automated test decision

Phase 1 does **not** add a dedicated frontend unit/component/E2E test framework.

Reason: the frontend behavior is one small foundation screen with no product state. Static checks, production build, backend automated contract tests, and the explicit manual browser smoke tests below provide sufficient Phase 1 verification without introducing React Testing Library, jsdom, Playwright, Cypress, or another test stack solely for nominal coverage.

This decision applies only to Phase 1 and does not prohibit frontend automated testing in later feature phases.

## 36. Backend scripts and verification

`backend/package.json` must provide at minimum:

```text
dev
build
start
start:prod
lint
typecheck
test
test:integration
db:migrate
db:rollback
```

Jest configuration must use conventional CommonJS configuration files so Jest can load configuration without `ts-node` or another TypeScript-config loader:

```text
backend/jest.config.cjs
backend/test/jest.integration.config.cjs
```

No dependency may be added solely to load Jest configuration.

Required semantics:

```text
dev              -> Nest watch mode
build            -> Nest production build
start            -> Nest start
start:prod       -> node dist/main.js
lint             -> ESLint check
typecheck        -> tsc --noEmit -p tsconfig.json
test             -> Jest using backend/jest.config.cjs
test:integration -> Jest using backend/test/jest.integration.config.cjs in serial mode
db:migrate       -> node-pg-migrate up --envPath .env --migrations-dir migrations
db:rollback      -> node-pg-migrate down --envPath .env --migrations-dir migrations
```

The following must pass:

```text
pnpm --filter @aevum/backend exec tsc --version
pnpm --filter @aevum/backend lint
pnpm --filter @aevum/backend typecheck
pnpm --filter @aevum/backend build
pnpm --filter @aevum/backend test
pnpm --filter @aevum/backend test:integration
```

TypeScript version output must be:

```text
Version 5.9.3
```

The backend package/module contract must also be verifiable from repository metadata:

```text
node -p "require('./backend/package.json').type"
```

must report:

```text
commonjs
```

`backend/tsconfig.json` must retain:

```text
module = commonjs
moduleResolution = node
```

and the production build must produce:

```text
backend/dist/main.js
```

`node backend/dist/main.js` must be a valid production startup path when required environment configuration is present.

Docker must be available for `test:integration`.

## 37. Backend unit testing requirements

Use Nest testing utilities with Jest.

Unit tests must cover at minimum:

### 37.1 SystemService mapping

With DatabaseService behavior mocked/stubbed at the module boundary, verify:

```text
database reachable + vector available
→ READY / UP / AVAILABLE

database failure
→ NOT_READY / DOWN / UNKNOWN

database reachable + vector unavailable
→ NOT_READY / UP / UNAVAILABLE
```

### 37.2 Configuration validation

Verify that backend configuration validation:

- accepts the committed local example shape;
- rejects missing `DATABASE_URL`;
- rejects malformed database URLs;
- rejects invalid API ports;
- rejects wildcard CORS origin;
- rejects non-positive database timeout values.

Tests must not snapshot or print real secret values.

## 38. Real PostgreSQL + pgvector integration testing

### 38.1 Test environment

Use:

```text
@testcontainers/postgresql 12.1.0
```

with the same database image as local development:

```text
pgvector/pgvector:0.8.6-pg18-trixie
```

The integration suite must run serially (`--runInBand` or equivalent) because one required test temporarily mutates extension state.

The tests must start a real Nest application instance and call it through Supertest/HTTP semantics. They must not mock `SystemService` or `DatabaseService` in the real database cases.

### 38.2 Migration reuse

The integration suite must run the **same `backend/migrations/` files** through the node-pg-migrate programmatic API before healthy readiness assertions.

Do not create a test-only schema initialization path.

### 38.3 Healthy integration case

Starting from a clean Testcontainers database, verify:

1. PostgreSQL server major is 18;
2. migration history starts empty;
3. Phase 1 migrations run successfully;
4. `public.pgmigrations` records the initial migration;
5. `vector` exists in `pg_extension`;
6. `vector` reports version `0.8.6`;
7. no Aevum product/domain tables exist;
8. `GET /api/system/status` returns exact HTTP 200 READY DTO.

The only Phase 1-created regular table allowed in `public` is the migration history table `pgmigrations`.

### 38.4 Real pgvector-unavailable case

Using an isolated or serial healthy migrated Testcontainers database:

1. confirm the endpoint is READY;
2. execute `DROP EXTENSION vector` without `CASCADE`;
3. call `GET /api/system/status`;
4. verify exact HTTP 503:

```json
{
  "status": "NOT_READY",
  "database": "UP",
  "pgvector": "UNAVAILABLE"
}
```

5. in guaranteed cleanup (`finally` or equivalent), execute `CREATE EXTENSION IF NOT EXISTS vector`;
6. verify the extension again reports `0.8.6`;
7. call the endpoint again;
8. verify exact HTTP 200 READY DTO.

The test must not rely on transaction rollback to restore extension state.

### 38.5 Database-unavailable HTTP case

Start a Nest test application with a valid `DATABASE_URL` pointing to a deliberately unreachable local TCP endpoint and the Phase 1 connection timeout.

Call:

```text
GET /api/system/status
```

Verify exact HTTP 503:

```json
{
  "status": "NOT_READY",
  "database": "DOWN",
  "pgvector": "UNKNOWN"
}
```

This test must exercise the real `pg` connection failure path rather than mocking DatabaseService.

## 39. Clean-database migration verification

This is a required BUILD verification separate from the Testcontainers suite.

### 39.1 Prepare local configuration

From repository root:

```text
copy infra/.env.example -> infra/.env
copy backend/.env.example -> backend/.env
copy frontend/.env.local.example -> frontend/.env.local
```

Platform-specific copy syntax may differ; the resulting files and values must match the examples.

### 39.2 Verify ignore behavior

From repository root:

```text
git check-ignore -v infra/.env
git check-ignore -v backend/.env
git check-ignore -v frontend/.env.local
```

All three real local files must be ignored.

The following must return non-zero because examples must not be ignored:

```text
git check-ignore -q infra/.env.example
git check-ignore -q backend/.env.example
git check-ignore -q frontend/.env.local.example
```

Once committed, this must succeed:

```text
git ls-files --error-unmatch \
  infra/.env.example \
  backend/.env.example \
  frontend/.env.local.example
```

### 39.3 Reset database

Run:

```text
docker compose --env-file infra/.env -f infra/compose.yaml down -v
docker compose --env-file infra/.env -f infra/compose.yaml up -d
docker compose --env-file infra/.env -f infra/compose.yaml ps
```

The `postgres` service must become healthy.

### 39.4 Run migrations

Do **not** manually export or set `DATABASE_URL` in the shell for this verification. The copied `backend/.env` file must be the migration command's configuration source.

From repository root, run:

```text
pnpm --filter @aevum/backend db:migrate
```

It must succeed from the empty database by loading `DATABASE_URL` from `backend/.env` through the script's explicit `--envPath .env` contract.

Run the same command a second time, still without manually exporting `DATABASE_URL`.

The second run must succeed with no new migration applied.

This verifies the committed `backend/.env.example` → local `backend/.env` → node-pg-migrate workflow is deterministic and cross-platform at the package-script level.

### 39.5 Verify database facts

Using the running Compose PostgreSQL service, verify:

```sql
SHOW server_version;
```

Result must be PostgreSQL major 18.

Verify:

```sql
SELECT extversion
FROM pg_extension
WHERE extname = 'vector';
```

Result must be:

```text
0.8.6
```

Verify public regular tables:

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Phase 1 must not introduce an Aevum domain table. `pgmigrations` is permitted as migration infrastructure.

## 40. Manual end-to-end smoke-test procedure

The BUILD review must execute this local flow.

### 40.1 Start/reset database

Use the prepared `infra/.env`.

Run:

```text
docker compose --env-file infra/.env -f infra/compose.yaml up -d
pnpm --filter @aevum/backend db:migrate
```

Do not manually export `DATABASE_URL`; the migration command must load it from `backend/.env` through `--envPath .env`.

Confirm PostgreSQL is healthy.

### 40.2 Start backend

Run:

```text
pnpm --filter @aevum/backend dev
```

Expected:

- Nest application starts on `http://localhost:8080`;
- no secret or full database URL is printed;
- application can remain running if the database later becomes temporarily unavailable.

### 40.3 Verify backend directly

With database and vector extension healthy:

```text
GET http://localhost:8080/api/system/status
```

Expected HTTP 200 and exact READY DTO.

### 40.4 Start frontend

In another terminal:

```text
pnpm --filter @aevum/frontend dev
```

Open:

```text
http://localhost:3000
```

Expected final state:

```text
Aevum application foundation is ready.
Backend: UP
Database: UP
pgvector: AVAILABLE
```

### 40.5 Verify backend/database unavailable frontend behavior

Stop the PostgreSQL service while leaving backend and frontend running:

```text
docker compose --env-file infra/.env -f infra/compose.yaml stop postgres
```

Use **Retry** in the browser.

Expected:

```text
Aevum application foundation is not ready.
Backend: UP
Database: DOWN
pgvector: UNKNOWN
```

Restart database:

```text
docker compose --env-file infra/.env -f infra/compose.yaml start postgres
```

After the service becomes healthy, use Retry.

Expected READY state again.

### 40.6 Verify backend unavailable frontend behavior

Stop the Nest backend while leaving the frontend running.

Use Retry.

Expected:

```text
Aevum backend is unavailable.
Backend: DOWN
Database: UNKNOWN
pgvector: UNKNOWN
```

Restart backend and use Retry.

Expected READY state again.

### 40.7 pgvector-unavailable browser behavior

The real extension-absent behavior is mandatory in automated integration testing under Section 38.4.

It does not need to be reproduced destructively in the manual developer smoke test unless the reviewer explicitly chooses to do so.

## 41. Root/full verification contract

After dependencies are installed and Docker is available, the repository must support a root verification command:

```text
pnpm verify
```

It must perform at minimum:

```text
frontend lint
frontend typecheck
frontend production build
backend lint
backend typecheck
backend production build
backend unit tests
backend integration tests
```

It must fail if any required command fails.

The destructive clean-database Compose reset and manual browser checks remain explicit separate review steps and must not be hidden inside `pnpm verify`.

## 42. Security and privacy implementation requirements

The approved PLAN security baseline remains mandatory.

Phase 1 implementation must ensure:

- no real local `.env` files are committed;
- no server secret is exposed through `NEXT_PUBLIC_*`;
- no `DATABASE_URL` is returned to the browser;
- no status response contains stack traces or SQL/database errors;
- CORS does not use wildcard origin;
- CORS credentials remain disabled;
- no authentication placeholder or fake user is introduced;
- no personal user data is persisted;
- no production privacy/security guarantee is claimed;
- logs do not print database credentials or the full database URL;
- the public status endpoint exposes only the three approved DTO shapes.

No additional security product/framework is required in Phase 1.

## 43. Preserved non-goals

The approved revised PLAN non-goals remain fully binding.

The replacement SPEC does not authorize:

- authentication, accounts, roles, or permissions;
- Goals, Pursuits, Activities, Projects, Memories/Memory Engine, Journal, Chat, Today, Timeline, Search, StoryOfMe, reflections, or other Aevum product domains;
- AI providers, model calls, prompts, embeddings, vector persistence/search, RAG, retrieval/ranking, agents, or tools;
- production deployment/hosting;
- frontend/backend application containers;
- queues, caches, distributed jobs, microservices, object storage, synchronization, observability platforms, telemetry, backups, or production secret infrastructure;
- speculative modules/workspaces/packages for future functionality.

The only pgvector work in Phase 1 is extension capability, migration, readiness, and verification.

## 44. Acceptance criteria

Implementation Phase 1 passes only when all criteria below are satisfied.

1. Repository uses one pnpm workspace with only `frontend` and `backend` application packages.
2. `pnpm-lock.yaml` is the only dependency lockfile.
3. `pnpm --version` reports 12.3.4.
4. Node baseline is 24.21.0 and package engines reject Node 25+ for Phase 1.
5. Both frontend and backend directly pin and resolve ordinary `typescript@5.9.3`; no repository-wide pnpm TypeScript override is used.
6. Neither TypeScript 6 compatibility packages nor TypeScript 7 are used for Aevum application workspaces.
7. Frontend uses Next.js 16.3.3 App Router under `frontend/src/app`.
8. Backend uses the pinned NestJS 11 toolchain (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, and `@nestjs/testing` 11.2.3; `@nestjs/config` 4.0.2; `@nestjs/cli` 11.0.24) with the default Express adapter, and does not directly depend on `@nestjs/schematics`.
9. Backend uses explicit CommonJS semantics (`package.json` type `commonjs`, TypeScript `module: commonjs`, `moduleResolution: node`, CommonJS-compatible Jest/ts-jest execution, and production output runnable as `node dist/main.js`) and contains only the approved App/Config/Database/System foundation modules with no speculative domain modules.
10. Backend database access uses `pg` directly and no ORM/query builder is installed for Phase 1.
11. Backend-owned migrations use node-pg-migrate 9.0.0 under `backend/migrations`, with pinned `dotenv@17.4.2` available for node-pg-migrate `.env` loading.
12. Application startup does not automatically execute migrations.
13. `db:migrate` and `db:rollback` explicitly use `--envPath .env`; after copying `backend/.env.example` to `backend/.env`, clean migration works without manually exporting `DATABASE_URL`, creates migration history, and enables `vector` without creating Aevum domain tables.
14. Re-running `db:migrate` against an up-to-date database is a successful no-op.
15. Local Compose uses service name `postgres` with `pgvector/pgvector:0.8.6-pg18-trixie` and does not set a fixed `container_name`.
16. Local/test PostgreSQL reports major version 18 and pgvector reports 0.8.6.
17. `GET /api/system/status` returns exact HTTP 200 READY/UP/AVAILABLE when PostgreSQL and vector are ready.
18. The endpoint returns exact HTTP 503 NOT_READY/DOWN/UNKNOWN on real database connection failure.
19. The endpoint returns exact HTTP 503 NOT_READY/UP/UNAVAILABLE when PostgreSQL is reachable and `vector` is absent.
20. The endpoint exposes none of the prohibited diagnostic fields.
21. Backend starts with valid configuration even when PostgreSQL is temporarily unavailable.
22. Backend environment is validated with @nestjs/config + Zod and invalid required configuration fails safely.
23. Default local ports are frontend 3000, backend 8080, PostgreSQL 5432.
24. Local CORS allows only the configured frontend origin, GET/OPTIONS, and no credentials.
25. Frontend uses only `src/lib/api/system-status.ts` as the Phase 1 backend request boundary.
26. Frontend CHECKING state renders while the request is in flight.
27. Frontend READY state renders exactly the safe READY information after a valid HTTP 200 DTO.
28. Frontend NOT_READY state renders safe database/pgvector status after a valid HTTP 503 DTO.
29. Frontend backend-unavailable state handles network, timeout, configuration, protocol, or malformed-response failure without crashing or leaking raw errors.
30. Frontend Retry action re-runs the same status request and no automatic polling is added.
31. Frontend lint, TypeScript typecheck, and production build pass.
32. Backend lint, TypeScript typecheck, production build, and unit tests pass; Jest loads `jest.config.cjs` and `test/jest.integration.config.cjs` without a TypeScript-config loader dependency, ts-jest uses CommonJS-compatible semantics, and the production build emits runnable `backend/dist/main.js`.
33. Real Testcontainers healthy integration verification passes using the same pgvector image and migrations as local development.
34. Real extension-removal integration verification produces exact pgvector-unavailable HTTP 503 and safely restores READY state.
35. Real `pg` connection-failure integration verification produces exact database-down HTTP 503.
36. Root `.gitignore` ignores real backend/frontend/infra environment files while all three example files remain trackable.
37. `pnpm verify` passes and performs all required non-manual frontend/backend verification.
38. The clean-database migration procedure passes from a removed Docker volume.
39. The manual browser smoke test proves browser → Next.js → NestJS → PostgreSQL + pgvector READY behavior.
40. Manual database-down and backend-down smoke tests produce the specified frontend unavailable states and recover after dependencies restart.
41. No authentication, Aevum product domain, AI integration, embedding behavior, RAG, agent, queue, cache, production deployment, or speculative future module is implemented.
42. No application code or documentation claims a privacy/deployment guarantee beyond what Phase 1 actually establishes.

## 45. Definition of Done

Implementation Phase 1 is Done only when:

- all 42 acceptance criteria pass;
- the repository structure matches this SPEC without speculative future modules;
- the pinned Node/pnpm/Next/TypeScript/NestJS 11/database foundation is reproducible from the committed lockfile and examples;
- both workspaces directly pin and use TypeScript 5.9.3 through the normal `typescript` package, without a repository-wide TypeScript override;
- the backend uses the approved CommonJS module contract and produces runnable `dist/main.js` output;
- local PostgreSQL 18 + pgvector 0.8.6 starts reproducibly through `infra/compose.yaml`;
- node-pg-migrate initializes a clean database and safely re-runs using `backend/.env` through explicit `--envPath .env`, without manual `DATABASE_URL` shell export;
- pinned `dotenv@17.4.2` is available to the migration CLI for deterministic `.env` loading;
- the only Phase 1 schema artifacts are pgvector extension capability and migration infrastructure;
- the application-owned status endpoint passes all unit and real integration behaviors;
- the pgvector-unavailable integration test removes the real extension, asserts exact HTTP behavior, restores state, and proves READY again;
- frontend lint/typecheck/build passes;
- backend lint/typecheck/build/unit/integration tests pass using CommonJS Jest config files and no TypeScript-config loader dependency;
- `pnpm verify` passes;
- Git ignore behavior for all real local configuration files is proven;
- the clean-database verification is recorded as passing;
- the manual browser READY/database-down/backend-down/recovery smoke procedure is recorded as passing;
- no approved PLAN non-goal has entered the implementation;
- review finds no secret leakage or broad CORS behavior;
- implementation documentation is updated to describe only behavior that actually exists;
- `docs/PROGRESS.md` is updated to the actual post-BUILD state only after implementation/review;
- the phase is not marked `VERIFIED` or `CLOSED` until the PSB review explicitly reaches those gates.

## 46. SPEC approval and BUILD-readiness record

The Aevum PSB Guide has approved this replacement SPEC.

At the `READY_FOR_BUILD` checkpoint:

- PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

The invalidated Spring Boot SPEC remains historical invalidation context only and is not an implementation source. Its associated BUILD was halted before commit and was never accepted.

`READY_FOR_BUILD` authorized implementation after the explicit Codex BUILD instruction received on 2026-09-10. The phase then entered `BUILDING`; final PSB review subsequently reached `VERIFIED` and `CLOSED`, as recorded below.

## 47. SPEC Approval Record — Aevum PSB Guide

The following review checklist was satisfied when the Aevum PSB Guide approved the replacement SPEC:

- [x] The SPEC is a new NestJS/TypeScript design and does not mechanically inherit Spring Boot mechanics.
- [x] Node.js `>=24.21.0 <25` with 24.21.0 as the development baseline is acceptable.
- [x] pnpm 12.3.4 is acceptable as the single repository package manager.
- [x] A two-application pnpm workspace with one root lockfile is acceptable.
- [x] Next.js 16.3.3 + React 19.2.8 is acceptable.
- [x] TypeScript 5.9.3 is directly pinned in both `@aevum/frontend` and `@aevum/backend` without a repository-wide pnpm TypeScript override.
- [x] TypeScript 6 compatibility alias mechanics remain removed.
- [x] TypeScript 7 and Next's experimental TypeScript CLI path remain out of Phase 1.
- [x] The pinned NestJS 11 toolchain is acceptable: core/common/platform/testing 11.2.3, config 4.0.2, and CLI 11.0.24.
- [x] `@nestjs/schematics` correctly remains non-direct/transitive-only for Phase 1.
- [x] The backend CommonJS decision is acceptable: package type `commonjs`, TypeScript `module: commonjs`, `moduleResolution: node`, CommonJS Jest/ts-jest behavior, and `node dist/main.js` production startup.
- [x] The exact frontend structure is sufficiently minimal.
- [x] The exact NestJS App/Config/Database/System module structure fits the modular-monolith direction without speculative domains.
- [x] Direct node-postgres (`pg`) access is appropriate for Phase 1 instead of selecting an ORM prematurely.
- [x] node-pg-migrate 9.0.0 remains acceptable as the backend-owned migration mechanism.
- [x] Pinned `dotenv@17.4.2` plus explicit `--envPath .env` migration scripts sufficiently guarantee `backend/.env` loading without manual `DATABASE_URL` export.
- [x] Explicit migrations rather than automatic application-start migrations are acceptable.
- [x] PostgreSQL 18.x / baseline 18.6 and pgvector 0.8.6 are acceptable.
- [x] `pgvector/pgvector:0.8.6-pg18-trixie` is acceptable for local development and integration tests.
- [x] Docker Compose is correctly limited to the database, keeps service name `postgres`, and does not set a fixed container name.
- [x] Backend/frontend/infra environment files and validation rules are sufficiently explicit.
- [x] The root `.gitignore` contract correctly protects all real local environment files while preserving examples.
- [x] Default ports 3000/8080/5432 are acceptable.
- [x] Local CORS is sufficiently narrow and does not introduce credential behavior.
- [x] `GET /api/system/status` and its three exact DTOs are acceptable.
- [x] The backend may start while the database is unavailable and report readiness through the endpoint.
- [x] The runtime pgvector readiness rule correctly checks presence while version 0.8.6 is verified separately.
- [x] Frontend CHECKING/READY/NOT_READY/backend-unavailable/Retry behavior is sufficiently deterministic.
- [x] No frontend test framework in Phase 1 is acceptable given static/build checks and mandatory manual browser verification.
- [x] CommonJS `jest.config.cjs` / `test/jest.integration.config.cjs` correctly avoid adding a dependency solely to load Jest configuration while preserving Jest 30.5.1, ts-jest 29.4.12, and serial integration behavior.
- [x] Nest/Jest unit tests sufficiently cover readiness and configuration behavior.
- [x] Real Testcontainers healthy PostgreSQL + pgvector testing is sufficient.
- [x] Real extension removal/restoration testing sufficiently proves the pgvector-unavailable 503 path.
- [x] Real pg connection-failure testing sufficiently proves the database-down 503 path.
- [x] Clean-database migration verification is reproducible and strong enough.
- [x] `pnpm verify` covers all required non-manual checks.
- [x] The manual end-to-end READY/database-down/backend-down/recovery procedure is sufficient.
- [x] All 42 acceptance criteria are testable.
- [x] The Definition of Done is complete and reviewable.
- [x] Authentication, product domains, AI, embeddings, RAG, agents, queues, caches, production deployment, and speculative modules remain excluded.
- [x] The replacement SPEC passed PSB review and the READY_FOR_BUILD checkpoint correctly records `SPEC_APPROVED`, `READY_FOR_BUILD`, and current BUILD `NOT_STARTED`; implementation starts only after an explicit Codex BUILD instruction.

**SPEC review result:** `APPROVED`

## 48. BUILD closeout record — VERIFIED/CLOSED

The Aevum PSB Guide completed final BUILD review on 2026-09-10.

- PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `SPEC_APPROVED`
- BUILD: `COMPLETED`
- verification: `VERIFIED`
- phase lifecycle: `CLOSED`

All **42/42 acceptance criteria** and the Definition of Done passed through the Codex BUILD verification and independent local-host verification.

Verified evidence includes Node.js `24.21.0`, npm `11.19.0`, pnpm `12.3.4`, TypeScript `5.9.3` in both workspaces, frontend lint/typecheck/build, backend lint/typecheck/build, 9/9 backend unit tests, 3/3 real Testcontainers integration tests, PostgreSQL `18.6`, pgvector `0.8.6`, clean migration plus successful no-op rerun, browser READY/database-down/backend-down recovery checks, narrow CORS, local environment ignore/trackability checks, `pnpm install --frozen-lockfile`, `pnpm verify`, and `git diff --check` with exit code `0`.

The first destructive Compose reset collided with an unrelated local `fintech-ledger` project because both resolved through the generic `infra` project name. Aevum was subsequently isolated with Compose project identity `name: aevum`, and the corrected clean-database verification passed. This record does not claim recovery of the unrelated project’s removed Docker resources or data.

Phase 1 non-goals remained excluded. The invalidated Spring Boot BUILD remains unaccepted historical context only. No Phase 2 work is authorized by this closeout.

# Implementation Phase 2 — Identity & Ownership Foundation

PLAN status: `PLAN_APPROVED`  
SPEC status: `SPEC_APPROVED`
Build eligibility: `READY_FOR_BUILD`
BUILD status: `NOT_STARTED`

Depends on: **Implementation Phase 1 — Executable Application Foundation (`CLOSED`)**

> The Aevum PSB Guide has approved both the PLAN and the complete Phase 2 SPEC below. The 56 acceptance criteria are approved implementation requirements and have not yet been executed/passed; the Definition of Done is approved and not yet satisfied. `READY_FOR_BUILD` authorizes implementation only after Codex receives a later explicit BUILD instruction. Phase 2 BUILD has not started.

---

# PLAN — Approved

## 1. Phase purpose

Establish the minimum deterministic identity, authentication, and ownership foundation required before Aevum begins storing real user-owned personal life data.

Implementation Phase 1 proved that the executable application foundation works:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

Implementation Phase 2 should now make that foundation capable of answering one essential application question safely:

> **Who is the current Aevum user, and how does the backend know which durable records belong to that user?**

This phase does **not** introduce Aevum's first personal-content domain. It establishes the security and ownership prerequisite those domains require.

## 2. Why this phase should come next

Aevum's likely first product domains—Goals, Pursuits, Journal, Memories, Conversations, and personal settings—contain personal information.

The repository already establishes several constraints that make ownership a prerequisite rather than optional later hardening:

- features handling personal information must account for authentication and authorization;
- protected-resource authorization is enforced by the server rather than trusted to the frontend;
- authentication implementation is an unresolved architecture area that must be resolved before protected user data is implemented;
- historical Aevum design requires major user-owned records to be directly scoped by `user_id`;
- cross-user relationships and provenance should be structurally difficult or impossible;
- AI, retrieval, and tools may never be the authority for authentication, authorization, or user ownership.

Therefore, jumping directly to Goal, Journal, Memory, or Chat persistence would force those domains either to:

1. store personal data without a proper owner boundary; or
2. invent a temporary identity mechanism that would later require migration.

Implementation Phase 2 removes that blocker first.

## 3. Candidate comparison

### Candidate A — Identity & Ownership Foundation

**Strengths**

- resolves the explicit authentication prerequisite before personal data;
- creates the stable owner boundary required by later domain records;
- establishes deterministic server-side user context once rather than reinventing it in every domain;
- remains small if limited to one identity flow and one current-user capability;
- unlocks several later product slices independently.

**Risk**

Authentication can become large if this phase expands into complete account management. The PLAN therefore strictly excludes profile systems, roles, MFA, account recovery, organization/team concepts, and broad identity-provider support.

**Decision:** **SELECTED.**

### Candidate B — Minimal Goal creation

A Goal is a good early Aevum product capability, but it is durable personal information. Historical design expects Goals to be directly owner-scoped.

**Decision:** defer until an authenticated ownership boundary exists.

### Candidate C — Minimal Journal capture

Journal content is even more clearly sensitive personal data and requires authentication, authorization, logging, storage, and deletion considerations from the beginning.

**Decision:** defer until an authenticated ownership boundary exists.

### Candidate D — Memory / Memory Engine foundation

Memory requires user ownership plus provenance, lifecycle rules, correction semantics, later embedding behavior, and eventually AI/retrieval boundaries.

**Decision:** too dependency-heavy for the immediate next slice.

### Candidate E — Product shell/navigation only

A small application shell could safely precede personal data, but it would not resolve the main architectural blocker for meaningful product work.

**Decision:** not enough leverage to justify an independent Phase 2 ahead of identity/ownership.

## 4. Primary outcome

At the end of this phase, Aevum should have a minimal real identity boundary such that:

```text
User
  ↓
one supported authentication path
  ↓
Aevum frontend session state
  ↓
authenticated request
  ↓
NestJS derives trusted authenticated principal
  ↓
Aevum user/account identity in PostgreSQL
```

The application should be able to distinguish:

```text
Unauthenticated visitor
vs
Authenticated Aevum user
```

and the backend should have a stable Aevum user identifier that future user-owned domain services can derive from authenticated request context.

This phase should prove the identity/ownership foundation, not yet prove Goal, Journal, Memory, Chat, or other product behavior.

## 5. Exact PLAN scope

Implementation Phase 2 may establish only the following capabilities.

### 5.1 One supported authentication flow

Provide one coherent way for a person to authenticate to the local/current Aevum application.

The exact authentication mechanism/provider is a SPEC-stage decision.

The resulting flow must be sufficient to prove:

- unauthenticated state;
- authentication;
- authenticated state;
- session continuity appropriate to the selected mechanism;
- sign-out;
- loss/expiry/invalidity of authentication state.

This PLAN does not require multiple sign-in methods.

### 5.2 Stable Aevum user identity

Introduce the minimum durable account/identity representation required for Aevum to assign a stable internal user identifier.

The application must not make an external provider's mutable display name or email address the universal ownership key for future domain data.

The internal Aevum user identity becomes the future ownership anchor.

### 5.3 Trusted backend principal

NestJS must gain a reusable authenticated-request boundary that can answer:

```text
current authenticated Aevum user ID
```

The trusted user ID must be derived from validated authentication/session context.

Future domain APIs must be able to consume this authenticated principal without accepting arbitrary ownership identifiers supplied by the client.

### 5.4 Minimal current-user capability

Provide one minimal authenticated application capability conceptually equivalent to:

```text
Who am I?
```

Its purpose is to prove the full identity path:

```text
frontend
→ authentication/session
→ backend verification
→ internal Aevum user mapping
→ safe current-user response
```

The exact endpoint, DTO, route, UI wording, and fields are SPEC-stage decisions.

### 5.5 Protected frontend boundary

The frontend may establish only the minimal authenticated/unauthenticated application boundary needed to exercise Phase 2.

It may include:

- an unauthenticated sign-in entry;
- authenticated application state;
- a minimal protected foundation/current-user view;
- sign-out;
- understandable authentication failure/expired-session behavior.

It must not become the full Aevum dashboard or navigation architecture.

### 5.6 Ownership foundation for future domains

Establish a reusable rule:

> User-owned application records are scoped from the authenticated Aevum user identity, not from client-selected `user_id` values.

This phase need not create Goal, Journal, Memory, or other domain tables merely to demonstrate ownership.

Ownership should be proven at the identity/account boundary and through tests of authenticated principal derivation.

## 6. Explicit non-goals

Implementation Phase 2 must **not** implement the following.

### 6.1 Product domains

- Goals;
- Pursuits;
- Activities;
- Projects;
- Journal;
- Memories or Memory Engine;
- Conversations or Chat;
- Messages;
- Today;
- Timeline;
- Search;
- StoryOfMe;
- Insights/reflections;
- tasks/todos;
- personal-content capture.

### 6.2 Expanded account management

- rich user profiles;
- avatars;
- biographies;
- arbitrary personal profile facts;
- account preferences unrelated to authentication;
- user timezone settings unless technically required by the chosen authentication mechanism;
- organizations;
- teams;
- workspaces/tenants;
- invitations;
- admin user management;
- roles/permission matrices;
- RBAC/ABAC frameworks;
- impersonation;
- account switching;
- multiple linked identity providers.

### 6.3 Advanced authentication/security features

Unless the selected SPEC mechanism inherently requires them, Phase 2 does not require:

- MFA;
- passkeys;
- password reset/recovery;
- email verification workflows;
- phone verification;
- social-provider matrix;
- enterprise SSO;
- SCIM;
- production anti-abuse infrastructure;
- production-grade bot detection;
- production deployment/security perimeter.

If a chosen auth mechanism requires a narrow supporting behavior, SPEC must justify it rather than treating the list above as permission to broaden scope.

### 6.4 AI and semantic capabilities

- AI provider integration;
- LLM calls;
- prompts;
- embeddings;
- vector persistence/search;
- RAG;
- retrieval;
- agents;
- AI tools;
- memory extraction;
- AI-generated account/profile information.

### 6.5 Infrastructure expansion

- microservices;
- queues;
- caches;
- background-worker platform;
- object storage;
- production deployment;
- synchronization;
- complex CI/CD;
- observability platform;
- billing/subscriptions.

## 7. Dependency on Implementation Phase 1

Implementation Phase 2 inherits the accepted executable foundation from closed Phase 1.

It must reuse rather than replace:

- the pnpm workspace;
- the Next.js + TypeScript frontend;
- the NestJS + TypeScript backend;
- PostgreSQL;
- migration-controlled schema changes;
- the modular-monolith backend direction;
- existing configuration/environment conventions where applicable;
- existing frontend/backend communication patterns where applicable;
- the existing testing and verification foundation;
- the existing database container/development setup.

Phase 2 must not re-platform, restructure, or re-decide Phase 1 unless an actual compatibility defect is discovered through PSB review.

The existing system-status capability remains a foundation capability and should not be converted into an authentication endpoint.

## 8. Inherited product decisions

Implementation Phase 2 inherits these product principles:

- Aevum is a general-purpose personal organizational intelligence system.
- It is life-first, not developer/project-first.
- Authentication exists to protect the user's personal system; it is not itself the product's primary experience.
- Account identity must remain separate from evolving personal context.
- A giant user-profile record is not the place to store arbitrary facts about the person.
- Future Goals, Pursuits, Memories, Journal entries, and other personal objects belong to the authenticated user.
- AI must never invent, choose, or override user identity.
- Future user-facing terminology should stay natural and understandable.

## 9. Inherited architecture decisions

Phase 2 inherits:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

and:

- initial modular-monolith architecture;
- thin transport/controller boundaries;
- reusable backend application/service responsibilities;
- PostgreSQL as the system of record;
- migration-controlled schema changes;
- server-enforced authorization for protected resources;
- secrets outside source control;
- no premature microservices or infrastructure;
- deterministic application code owns authentication, authorization, data ownership, persistence rules, and validation.

pgvector remains present from Phase 1 but has no role in authentication or ownership.

## 10. Frontend responsibilities

The Phase 2 frontend is responsible only for the minimum identity experience.

It should:

- represent unauthenticated versus authenticated state;
- initiate the selected authentication flow;
- maintain/use session state according to the SPEC-selected mechanism;
- access the minimal protected/current-user capability;
- provide sign-out;
- handle unauthenticated, expired, invalid, or unavailable authentication state safely;
- avoid trusting frontend state as proof of authorization;
- avoid storing server secrets or privileged credentials in browser-exposed configuration.

The frontend must not:

- decide what user ID owns backend data;
- authorize protected operations by itself;
- expose a user-ID selector;
- create a full account/profile settings area;
- create a full application dashboard merely to house authentication.

## 11. Backend responsibilities

The NestJS backend should gain one coherent identity/authentication module boundary within the modular monolith.

At PLAN level, responsibilities include:

- validate/verify authentication according to the SPEC-selected mechanism;
- resolve authenticated request context to one stable Aevum user identity;
- create or reconcile the minimum Aevum account identity when appropriate to the selected flow;
- expose the minimal current-user capability;
- reject protected requests that lack valid authentication;
- make authenticated Aevum user identity reusable by later domain services;
- ensure ownership identity comes from server-validated context;
- never trust arbitrary client `user_id` values as authorization.

The backend must not implement Goal, Journal, Memory, Chat, or other domain logic in this phase.

## 12. Database responsibilities

Phase 2 may introduce only identity/authentication persistence required by the chosen SPEC mechanism.

The durable model should provide:

- a stable internal Aevum user identifier;
- only the identity fields necessary for authentication/account mapping;
- timestamps/lifecycle metadata only where required for correct account/authentication behavior;
- authentication/session/provider-related tables only if required by the selected mechanism;
- migration-controlled creation and rollback behavior;
- constraints that prevent ambiguous or duplicate identity mapping where applicable.

The PLAN does **not** approve:

- Goal tables;
- Pursuit tables;
- Journal tables;
- Memory tables;
- Message/Conversation tables;
- embedding tables;
- generic profile-fact tables;
- role/permission tables unless SPEC proves a concrete Phase 2 requirement.

The exact schema belongs in SPEC.

## 13. Ownership rule established by this phase

The most important reusable invariant from Phase 2 is:

> **Authenticated application context determines the Aevum owner.**

Future user-owned records should follow a direction equivalent to:

```text
request
→ validate authentication
→ derive Aevum user ID
→ application/domain service
→ owner-scoped persistence/query
```

not:

```text
request body/query parameter contains user_id
→ trust that value
→ read/write personal data
```

A future domain may carry `user_id` in its database row for structural ownership, but the authorized owner value must come from trusted application context.

## 14. Privacy and security implications

This phase introduces the first real identity/security boundary, so privacy/security review is central even though it does not yet store substantive personal-life content.

PLAN-level requirements:

- authentication verification occurs server-side for protected backend capabilities;
- user ownership is deterministic application logic;
- frontend route protection is UX, not the authoritative security boundary;
- authentication/session secrets and provider credentials remain server-side;
- credentials/tokens/session identifiers must not be unnecessarily logged;
- account identity responses expose only fields required by the Phase 2 UX;
- errors must not leak credentials, provider secrets, token contents, or internal stack traces;
- the chosen mechanism must address relevant CSRF, session/token integrity, cookie/storage, and transport assumptions during SPEC;
- local-development behavior must not be presented as a production security guarantee;
- no external AI provider receives authentication or account context in this phase;
- no arbitrary personal profile information should be collected simply because a user table now exists.

### Deletion/retention boundary

Full account deletion/export remains out of Phase 2 unless the chosen authentication mechanism technically requires a narrow identity cleanup behavior.

However, SPEC must define what happens to Phase 2 identity/session records on sign-out, expiry, revocation, or test cleanup so the phase does not leave lifecycle behavior ambiguous.

## 15. Testing and verification direction

The detailed test suite belongs in SPEC, but Phase 2 must ultimately prove the following behaviors.

### Authentication lifecycle

Verify:

- unauthenticated state is recognized;
- the supported authentication flow succeeds;
- authenticated state persists as designed;
- sign-out invalidates or ends the applicable session state;
- invalid/expired authentication is rejected safely.

### Backend authorization boundary

Verify:

- protected current-user capability rejects unauthenticated requests;
- authenticated requests resolve to the correct Aevum user;
- client input cannot arbitrarily select another Aevum user identity;
- two test identities resolve to distinct internal users;
- the backend—not frontend state—determines the authenticated principal.

### Database identity integrity

Verify:

- migrations create only the approved Phase 2 identity/authentication schema;
- identity mappings are structurally unambiguous;
- repeated authentication for the same identity does not accidentally create duplicate Aevum users;
- separate test identities do not collapse into one internal user;
- clean-database migration works.

### Frontend behavior

Verify:

- unauthenticated entry state is understandable;
- successful authentication reaches the minimal protected experience;
- refresh/session continuity behaves as specified;
- sign-out returns to unauthenticated state;
- expired/invalid authentication produces safe behavior;
- backend/auth unavailability does not expose raw internal errors.

### Regression

Phase 1 foundation verification must continue to pass unless SPEC intentionally updates an affected verification contract.

## 16. Documentation expected to be affected

If this PLAN later passes SPEC and BUILD, the implementation cycle will likely update:

- `docs/implementation/PHASE-02.md`;
- `docs/PROGRESS.md`;
- `docs/implementation/README.md`;
- `README.md` for actual local authentication/setup instructions if needed;
- `docs/DECISIONS.md` because D-103 authentication implementation will be resolved by the approved SPEC/BUILD;
- `docs/architecture/SECURITY-PRIVACY.md` if the selected authentication mechanism establishes durable architecture facts;
- `docs/ARCHITECTURE.md` only if a durable cross-project authentication boundary needs to be promoted;
- database/data documentation only for durable identity/ownership schema principles established by the final implementation.

Historical `docs/phases/` should not be rewritten as executable requirements.

Implementation Phase 1 remains closed and must not be modified.

## 17. Decisions deferred to SPEC

The following are BUILD-blocking implementation choices and must be explicitly resolved before Phase 2 may become `READY_FOR_BUILD`.

### Authentication mechanism

SPEC must choose:

- authentication approach/provider;
- whether identity is first-party credential based, external-provider based, or another justified mechanism;
- exact sign-in/sign-out flow;
- whether registration/provisioning is explicit or occurs as part of first successful authentication;
- exact session/token model;
- session duration/expiry behavior;
- revocation/sign-out semantics.

The PLAN does not prefer a provider by brand.

### Frontend authentication integration

SPEC must define:

- exact routes/screens;
- client/server responsibility split in Next.js;
- session-loading behavior;
- route/protected-content behavior;
- failure states;
- sign-in/sign-out interaction;
- browser storage/cookie behavior where applicable.

### Backend identity integration

SPEC must define:

- exact NestJS module structure;
- authentication guard/middleware/interceptor strategy;
- trusted principal/request-context representation;
- current-user endpoint/method/DTO;
- authentication error contract;
- mapping from verified external/credential identity to internal Aevum user;
- whether authorization helpers/policies beyond authenticated-owner context are necessary.

### Database

SPEC must define:

- exact user/account tables;
- identity/provider/session tables if required;
- UUID generation;
- unique constraints;
- indexes;
- migrations;
- timestamps/lifecycle fields;
- deletion/cleanup behavior within Phase 2 scope;
- transaction requirements for first-login provisioning or identity reconciliation.

### Security

SPEC must define as applicable:

- password hashing if first-party credentials are selected;
- cookie attributes;
- CSRF protections;
- token verification;
- OAuth/OIDC state/PKCE/nonce handling if applicable;
- secret/environment-variable names;
- local redirect/origin allowlists;
- safe error/logging rules;
- brute-force/rate-limiting scope if credentials are handled directly;
- exact transport assumptions for local development.

### Verification

SPEC must define:

- unit tests;
- backend integration tests;
- authentication-provider/mechanism test strategy;
- database integration tests;
- browser/manual or automated end-to-end flow;
- exact verification commands;
- acceptance criteria;
- Definition of Done.

## 18. Later capabilities unlocked

A successful Phase 2 should unblock independently scoped future product phases such as:

### Minimal Goal capability

A Goal can be persisted safely with owner-scoped queries because authenticated user identity already exists.

### Minimal Journal capture

Journal entries can become durable personal records without inventing a temporary ownership model.

### Personal settings

Timezone, privacy controls, or memory settings can attach to a known user when separately scoped.

### Conversations / Chat

Conversation and Message data can be owner-scoped before AI behavior is introduced.

### Memory Engine

Sources and Memories can inherit deterministic user ownership before provenance, lifecycle, extraction, embeddings, and retrieval are implemented.

### Retrieval and AI tools

Historical architecture already requires ownership filtering before personal semantic retrieval and authenticated backend context before domain tools execute.

Phase 2 therefore unlocks product work without itself implementing those later capabilities.

## 19. Deferred work

The following remains for later PSB cycles:

- first actual personal-content domain;
- Goal/Pursuit relationships;
- Journal;
- Chat/Conversation;
- Memory Engine;
- personal settings beyond authentication requirements;
- roles/permissions beyond simple authenticated owner context;
- account profile features;
- account deletion/export;
- MFA/passkeys unless separately approved;
- multiple authentication providers;
- AI providers;
- embeddings;
- RAG/retrieval;
- agents/tools;
- queues/caches/workers;
- production deployment;
- synchronization;
- billing/teams/organizations.

## 20. Phase boundary summary

Implementation Phase 2 is **not** "build Aevum accounts and then also add Goals."

It is:

> **Establish one trustworthy authenticated Aevum user and reusable owner context so the next product domain can safely store personal data.**

The intended dependency progression is therefore:

```text
Implementation Phase 1
Executable Application Foundation
CLOSED
  ↓
Implementation Phase 2
Identity & Ownership Foundation
PLAN_APPROVED
  ↓
later independently scoped product domain
Goal OR Journal OR another reviewed first domain
```

This keeps Phase 2 small, foundational, and reusable.

## 21. PLAN approval state

Current lifecycle:

- Implementation Phase 1: `CLOSED`
- Implementation Phase 2 PLAN: `PLAN_APPROVED`
- Implementation Phase 2 SPEC: `SPEC_APPROVED`
- Implementation Phase 2 build eligibility: `READY_FOR_BUILD`
- Implementation Phase 2 BUILD: `NOT_STARTED`

The PLAN and SPEC have passed PSB review. `READY_FOR_BUILD` authorizes implementation only after Codex receives a later explicit BUILD instruction; the phase is not yet `BUILDING`.

### Mandatory review conditions carried into SPEC

The Aevum PSB Guide approved this PLAN with two conditions that the future SPEC must satisfy without broadening the approved scope:

1. **Identity mapping/reconciliation boundary:** SPEC must precisely define how the selected authentication identity maps or reconciles to the stable internal Aevum user ID, including the rules that prevent ambiguous or duplicate ownership identities.
2. **Authentication-data minimization:** SPEC must not persist provider tokens, broad profile data, or other identity artifacts unless the selected authentication mechanism concretely requires them.

These are SPEC requirements derived from PLAN review; they do not select an authentication provider or mechanism.

## PLAN Approval Record — Aevum PSB Guide

The following review checklist was satisfied when the PLAN was approved:

- [x] **Implementation Phase 2 — Identity & Ownership Foundation** is the correct phase name and boundary.
- [x] Identity/ownership is the correct next dependency before any durable personal-content domain.
- [x] The PLAN does not assume historical Phase 2 equals Implementation Phase 2.
- [x] Implementation Phase 1 remains `CLOSED` and unchanged.
- [x] Phase 2 is limited to one supported authentication path and stable Aevum user identity.
- [x] A reusable server-derived authenticated principal/owner context belongs in Phase 2.
- [x] One minimal current-user capability is sufficient to prove the identity path.
- [x] A minimal protected frontend boundary is appropriate, without building the full dashboard.
- [x] The internal Aevum user ID is the future ownership anchor rather than client-selected `user_id`, display name, or mutable email.
- [x] Future user-owned domain records will derive ownership from authenticated backend context.
- [x] The database scope is limited to identity/authentication persistence required by the selected mechanism.
- [x] Goals, Pursuits, Journal, Memories, Chat, and other product domains remain excluded.
- [x] Rich profiles, organizations, teams, role matrices, MFA, broad provider support, and account-management expansion remain excluded.
- [x] AI providers, embeddings, RAG, agents, and AI tools remain excluded.
- [x] pgvector remains unrelated to Phase 2 identity behavior.
- [x] The modular-monolith architecture remains unchanged.
- [x] Server-enforced authorization remains the authoritative boundary; frontend protection is UX only.
- [x] The exact authentication provider/mechanism is correctly deferred to SPEC.
- [x] Exact session/token behavior is correctly deferred to SPEC.
- [x] Exact frontend auth integration is correctly deferred to SPEC.
- [x] Exact NestJS guard/request-context/module design is correctly deferred to SPEC.
- [x] Exact user/identity/session schema is correctly deferred to SPEC.
- [x] Exact cookie/CSRF/OAuth/password/security mechanics are correctly deferred to SPEC based on the selected mechanism.
- [x] Exact test commands, acceptance criteria, and Definition of Done are correctly deferred to SPEC.
- [x] The scope is small enough for one PLAN → SPEC → BUILD → review → commit cycle.
- [x] Phase 2 remains `NOT_READY_FOR_BUILD` until a detailed SPEC passes PSB review.

**PLAN review result:** `APPROVED`


---

# SPEC — Approved

## 22. SPEC purpose and authority

This SPEC implements only the approved **Implementation Phase 2 — Identity & Ownership Foundation** PLAN.

It must prove:

```text
person
  ↓
one supported authentication path
  ↓
trusted NestJS authenticated principal
  ↓
stable internal Aevum user ID
  ↓
reusable future ownership context
```

The binding ownership invariant is:

> **Authenticated server-side application context determines the Aevum owner.**

No protected API may authorize ownership from a client-selected `user_id`.

This SPEC also carries forward the two mandatory PLAN-review conditions:

1. precisely define authentication-identity → internal-Aevum-user reconciliation; and
2. minimize persisted authentication data.

Approved lifecycle at this READY_FOR_BUILD checkpoint:

- Implementation Phase 1: `CLOSED`
- Phase 2 PLAN: `PLAN_APPROVED`
- Phase 2 SPEC: `SPEC_APPROVED`
- Phase 2 build eligibility: `READY_FOR_BUILD`
- Phase 2 BUILD: `NOT_STARTED`

The SPEC is approved as the canonical Phase 2 BUILD contract. The 56 acceptance criteria are approved requirements, not passed results, and the Definition of Done is approved but not yet satisfied. Implementation begins only after a later explicit Codex BUILD instruction.

## 23. Authentication architecture comparison

### 23.1 First-party credentials

Aevum could accept and verify a password directly.

That would require Phase 2 to own substantially more security behavior immediately:

- password hashing and parameter policy;
- password rules;
- registration credentials;
- brute-force/credential-stuffing controls;
- recovery/reset design;
- likely email verification later;
- additional sensitive credential lifecycle.

It is locally reproducible and vendor-independent, but it creates unnecessary credential custody for a phase whose real goal is stable identity and ownership.

**Decision:** defer first-party credentials.

### 23.2 OAuth/OpenID Connect

Aevum can delegate primary authentication to an OpenID Provider while keeping authorization and ownership inside NestJS.

Advantages:

- Aevum does not store user passwords;
- OIDC provides a protocol-defined stable external identity key: `(issuer, subject)`;
- the backend can perform the Authorization Code exchange itself;
- the browser does not receive provider tokens for Aevum API authorization;
- one standards-based path avoids coupling the application to a provider-specific profile schema;
- the provider can own credential policy, MFA, recovery, and verification without Phase 2 implementing those systems.

The drawback is dependence on an OIDC issuer at authentication time. Phase 2 addresses reproducibility with a test-only local OIDC provider fixture.

**Decision:** **selected**.

### 23.3 Framework/library-managed full auth systems

Examples include broad authentication frameworks that own user/session/account schemas and expose framework-specific adapters.

They can reduce boilerplate but may:

- introduce their own identity/account model beyond Phase 2's minimum;
- create parallel migration/schema ownership;
- persist provider/account artifacts Aevum does not need;
- make a Next.js-oriented auth layer appear authoritative over NestJS APIs;
- introduce an extra abstraction around Aevum's ownership invariant.

**Decision:** defer. Phase 2 uses a protocol client plus Aevum-owned session/identity persistence instead.

### 23.4 Externally hosted authentication platforms

Hosted authentication services can provide strong operational capabilities, but choosing one now would introduce vendor-specific configuration, lifecycle, pricing, and data-processing dependencies before production deployment is in scope.

**Decision:** defer provider-vendor selection.

## 24. Selected Phase 2 authentication path

Phase 2 supports exactly one authentication path:

> **OpenID Connect Authorization Code Flow with PKCE, against one configured standards-compliant OIDC issuer, with NestJS acting as the confidential relying party/client and Aevum issuing its own server-side opaque application session after successful OIDC verification.**

The application is **not** a multi-provider auth platform.

Exactly one configured issuer/client is active for a running Aevum backend.

### 24.1 Protocol requirements

The selected issuer must support:

- OpenID Connect discovery;
- Authorization Code flow;
- PKCE using `S256`;
- ID Tokens;
- `client_secret_basic` token-endpoint client authentication;
- the configured redirect URI.

Aevum requests exactly:

```text
scope = openid
response_type = code
```

Aevum must **not** request:

```text
email
profile
phone
address
offline_access
```

during Phase 2.

### 24.2 OIDC client library

Backend dependency:

```text
openid-client 6.8.8
```

`openid-client` owns standards-level behavior including:

- discovery;
- authorization URL construction;
- PKCE;
- authorization-code exchange;
- ID-token validation;
- issuer/audience/signature/expiry validation.

Phase 2 must not hand-roll OIDC token validation.

#### Explicit token-endpoint client authentication

Aevum must explicitly configure `openid-client` to use:

```text
ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)
```

as the client-authentication implementation supplied when creating/discovering the `openid-client` configuration.

The base configuration contract is therefore equivalent to:

```text
discovery(
  configured issuer,
  AEVUM_OIDC_CLIENT_ID,
  client metadata if required,
  ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)
)
```

#### Local HTTP discovery/endpoint exception

`openid-client` permits HTTPS protocol endpoints by default. Phase 2 may opt in to insecure HTTP requests **only** for the already-approved development/test loopback case.

Define:

```text
localLoopbackHttp =
  NODE_ENV is development or test
  AND AEVUM_OIDC_ISSUER.protocol is "http:"
  AND AEVUM_OIDC_ISSUER hostname passes the existing permitted-loopback validation
```

When `localLoopbackHttp` is true, the `openid-client` discovery/configuration contract must be equivalent to:

```text
discovery(
  issuer,
  AEVUM_OIDC_CLIENT_ID,
  client metadata if required,
  ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET),
  {
    execute: [allowInsecureRequests]
  }
)
```

When `localLoopbackHttp` is false, `allowInsecureRequests` must **not** be supplied:

```text
discovery(
  issuer,
  AEVUM_OIDC_CLIENT_ID,
  client metadata if required,
  ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)
)
```

Hard rules:

- `allowInsecureRequests` is permitted only in `development` or `test`;
- it is permitted only when the validated issuer uses `http:` and the hostname is an approved loopback host;
- it must not be enabled for an HTTPS issuer;
- it must not be enabled in `production`;
- a production HTTP issuer fails configuration validation before OIDC discovery;
- a development/test HTTP issuer on a non-loopback host fails configuration validation before OIDC discovery;
- the local HTTP exception does not change the required `ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)` client-authentication method.

The client secret must **not** be supplied only through shorthand/client metadata in a way that allows `openid-client` to select its default secret-authentication behavior.

For Phase 2 token-endpoint requests:

- client authentication method is explicitly `client_secret_basic`;
- `client_id` and `client_secret` are conveyed through the HTTP Basic `Authorization` header as defined by the library;
- `client_secret` must not appear as a form-body parameter;
- `client_secret_post` is prohibited.

The local OIDC test-provider integration must verify this behavior as specified in Section 52.

### 24.3 CommonJS compatibility

The closed Phase 1 NestJS backend remains CommonJS and is not re-platformed.

`openid-client` 6.8.8 is an ESM package, but the accepted Node.js 24 baseline supports `require(esm)` interoperability.

Phase 2 must preserve:

```text
backend/package.json      type = commonjs
backend/tsconfig.json     module = commonjs
backend/tsconfig.json     moduleResolution = node
production entry          node dist/main.js
```

A verification command must prove runtime interoperability:

```text
pnpm --filter @aevum/backend exec node -e "const oidc=require('openid-client'); if (typeof oidc.discovery !== 'function') process.exit(1)"
```

This SPEC does not authorize changing the backend to ESM.

## 25. Authentication provider boundary

### 25.1 Runtime provider contract

The Phase 2 application is provider-vendor-neutral but protocol-specific.

Runtime configuration supplies one:

```text
OIDC issuer URL
client ID
client secret
redirect URI
```

No provider-specific SDK is installed.

No Google-, Microsoft-, GitHub-, Auth0-, Clerk-, Supabase-, or other vendor-specific user API is used.

### 25.2 Provider responsibility

The configured OIDC issuer is responsible for:

- authenticating the person;
- credential storage;
- password/MFA/recovery behavior it chooses to provide;
- producing a valid OIDC identity assertion.

Aevum is responsible for:

- initiating/verifying the OIDC protocol flow;
- mapping the validated OIDC identity to a stable internal user;
- creating and validating Aevum sessions;
- server-side authorization/ownership context.

### 25.3 Registration

Aevum exposes **no registration endpoint or sign-up form** in Phase 2.

Registration/account creation at the configured identity provider is outside Aevum.

The first successful OIDC authentication for a previously unseen `(issuer, subject)` provisions the minimum internal Aevum user automatically.

## 26. Exact sign-in flow

The sign-in flow is:

```text
browser /signin
  ↓
GET backend /api/auth/login
  ↓
backend creates short-lived OIDC login transaction
  ↓
backend sets opaque transaction cookie
  ↓
302 redirect to configured OIDC authorization endpoint
  ↓
person authenticates at OIDC provider
  ↓
provider redirects to /api/auth/callback?code=...&state=...
  ↓
backend resolves transaction cookie + transaction row
  ↓
backend validates state + PKCE + nonce + OIDC response
  ↓
backend reconciles validated (iss, sub) to internal Aevum user
  ↓
backend creates Aevum application session
  ↓
backend deletes login transaction
  ↓
backend sets Aevum session cookie
  ↓
302 redirect to frontend /me
```

### 26.1 Login endpoint

Exact public endpoint:

```text
GET /api/auth/login
```

It accepts:

- no request body;
- no `user_id`;
- no email;
- no provider selector;
- no dynamic return URL.

It must:

1. opportunistically prune expired OIDC login transactions;
2. generate a cryptographically random transaction handle;
3. generate OIDC `state`;
4. generate OIDC `nonce`;
5. generate a PKCE verifier and S256 challenge;
6. persist the minimum transaction state defined in Section 33;
7. set the transaction cookie defined in Section 30;
8. redirect to the single configured issuer.

The success redirect destination after callback is fixed by server configuration to the frontend `/me` route. The client cannot supply an arbitrary redirect URI or `returnTo`.

### 26.2 OIDC discovery behavior

Discovery is lazy:

- the NestJS process must still boot when the OIDC provider is temporarily unavailable;
- the first auth request may perform discovery;
- successfully discovered configuration may be cached in process memory until backend restart;
- no discovery metadata is persisted to PostgreSQL.

For the configured local test issuer `http://127.0.0.1:9090`, discovery and all resulting OIDC protocol requests must use the explicitly conditional `allowInsecureRequests` execution hook defined in Section 24.2.

For HTTPS issuers, discovery must use the normal HTTPS-only behavior and must not receive `allowInsecureRequests`.

If discovery fails during login initiation, redirect safely to:

```text
{AEVUM_CORS_ORIGIN}/signin?error=authentication_unavailable
```

No raw provider/network error is exposed.

## 27. Exact callback flow

Exact public endpoint:

```text
GET /api/auth/callback
```

The callback must require:

- expected transaction cookie;
- matching unexpired transaction row;
- returned authorization `code`;
- returned `state`;
- exact state match;
- PKCE verification through the code exchange;
- nonce validation;
- validated OIDC ID Token;
- exact configured issuer;
- expected client audience;
- non-empty `sub`.

A callback is single-use.

### 27.1 Success

On success:

1. derive the canonical external identity key from validated `iss` and `sub`;
2. reconcile/provision internal Aevum user atomically;
3. create a new Aevum session;
4. delete the OIDC login-transaction row;
5. clear the login-transaction cookie;
6. set the Aevum session cookie;
7. redirect `302` to:

```text
{AEVUM_CORS_ORIGIN}/me
```

### 27.2 Failure

For invalid code, state, nonce, issuer, audience, signature, expiry, missing subject, expired/missing transaction, or other OIDC validation failure:

- do not create a user;
- do not create an Aevum session;
- an expired transaction must never be accepted after its `expires_at` boundary;
- delete the matching expired/failed transaction row when safely identifiable;
- opportunistically prune other expired login-transaction rows during callback handling;
- clear the transaction cookie;
- do not expose provider tokens/errors;
- redirect `302` to:

```text
{AEVUM_CORS_ORIGIN}/signin?error=authentication_failed
```

### 27.3 Provider tokens

The token endpoint may return an access token and may unexpectedly return other token material.

Aevum may hold such values only ephemerally in process memory while completing the OIDC callback.

Phase 2 must not persist:

- access token;
- refresh token;
- raw ID Token;
- authorization code;
- provider token response;
- UserInfo response.

The implementation must not call the UserInfo endpoint.

## 28. Sign-out and invalidation

Exact endpoint:

```text
POST /api/auth/logout
```

It is an Aevum **local-session logout** only.

Phase 2 does not implement OIDC RP-initiated provider logout.

### 28.1 Successful sign-out

After CSRF validation:

- if a valid current Aevum session exists, delete that session row;
- clear the Aevum session cookie;
- return:

```text
204 No Content
```

The operation is idempotent. If the session cookie is absent, malformed, already deleted, or expired, the endpoint still clears the cookie and returns `204` after CSRF validation.

### 28.2 Scope of revocation

Phase 2 supports:

- current-session deletion on sign-out;
- expiry-based invalidation;
- invalidation when a session row no longer exists.

Phase 2 does **not** add:

- sign out all devices;
- session-management UI;
- admin revocation;
- provider-token revocation;
- provider logout.

## 29. Aevum application-session model

### 29.1 Session token

On successful authentication, generate:

```text
32 cryptographically random bytes
```

encoded as base64url for the browser cookie.

The raw session token:

- exists in the browser cookie;
- is never stored in PostgreSQL;
- is never logged.

PostgreSQL stores:

```text
SHA-256(raw session token)
```

as binary data.

### 29.2 Session lifetime

Aevum Phase 2 sessions have a fixed absolute lifetime of:

```text
24 hours
```

There is:

- no sliding expiration;
- no refresh token;
- no silent session renewal;
- no "remember me".

Each successful OIDC login creates a new Aevum session.

Multiple simultaneous Aevum sessions for one user are permitted.

### 29.3 Session lookup

For a protected request:

1. read only the configured Aevum session cookie;
2. reject bearer tokens, URL session IDs, and client-supplied user IDs as authentication;
3. validate token format/length;
4. hash the raw token with SHA-256;
5. lookup the matching non-expired database session;
6. derive `user_id` only from that session row;
7. attach a trusted principal to the Nest request context.

### 29.4 Session expiry cleanup

If the presented session exists but is expired:

- delete that session row;
- clear the cookie;
- return the expired-session response defined in Section 39.

On successful login, the backend may also delete expired sessions belonging to that same user.

No queue, scheduler, or background cleanup worker is introduced.

## 30. Browser cookie contract

Use two cookies only.

### 30.1 Aevum session cookie

Name:

```text
aevum.sid
```

Attributes:

```text
HttpOnly = true
SameSite = Lax
Path = /
Domain = omitted
Max-Age = 86400 seconds
Secure = false only in development/test local HTTP
Secure = true when NODE_ENV=production
```

The cookie contains only the opaque random session token.

### 30.2 OIDC transaction cookie

Name:

```text
aevum.oidc
```

Attributes:

```text
HttpOnly = true
SameSite = Lax
Path = /api/auth/callback
Domain = omitted
Max-Age = 600 seconds
Secure = false only in development/test local HTTP
Secure = true when NODE_ENV=production
```

The cookie contains only the opaque random transaction handle.

It must not contain:

- state;
- nonce;
- PKCE verifier;
- provider tokens;
- user identity claims.

### 30.3 Cookie library

Backend dependency:

```text
cookie 2.0.1
```

Use it to parse/serialize the exact cookie values/attributes rather than adding a general cookie-session framework.

Do not use browser `localStorage` or `sessionStorage` for any authentication/session token.

## 31. CSRF contract

### 31.1 OIDC redirect flow

OIDC sign-in/callback uses all of:

- PKCE S256;
- unpredictable `state`;
- unpredictable `nonce`;
- short-lived browser-bound transaction cookie;
- single-use server-side login transaction.

These mechanisms are mandatory.

### 31.2 Logout CSRF

`POST /api/auth/logout` must require:

```text
Origin header exactly equals AEVUM_CORS_ORIGIN
```

and:

```text
X-Aevum-CSRF: 1
```

The custom header is mandatory.

Requests with:

- missing Origin;
- wrong Origin;
- missing custom header;
- wrong custom-header value

return:

```text
403 Forbidden
```

with:

```json
{
  "code": "CSRF_VALIDATION_FAILED"
}
```

and must not delete a valid session.

`GET /api/auth/logout` does not exist.

### 31.3 Future mutations

This Phase 2 CSRF contract covers the only authenticated state-changing application endpoint in scope.

Future personal-data write APIs must re-evaluate and extend CSRF protection during their own SPEC rather than assuming logout protection alone is universally sufficient.

## 32. Stable internal Aevum user identity

### 32.1 Internal user ID

Aevum user IDs are:

```text
UUID v4
```

generated server-side using Node.js cryptographic UUID generation.

The internal Aevum `user_id` is:

- stable;
- provider-independent;
- the future ownership anchor;
- never selected by the frontend;
- never derived from email/display name.

### 32.2 External identity key

The durable OIDC authentication identity key is the exact validated tuple:

```text
(issuer, subject)
```

where:

- `issuer` is the canonical issuer identifier returned by validated OIDC discovery/ID-token processing and must equal the configured issuer;
- `subject` is the validated OIDC `sub` claim and is treated as case-sensitive.

The application must **not** use these as identity keys:

```text
email
email_verified
name
preferred_username
picture/avatar URL
provider display name
access-token subject from an unvalidated source
```

### 32.3 One provider in Phase 2

A running Phase 2 backend supports exactly one configured issuer.

The database schema retains `issuer` explicitly so ownership mapping remains semantically correct and does not depend on an implicit global provider assumption.

Phase 2 does not implement account linking across issuers.

## 33. Identity reconciliation and provisioning

This section is a hard implementation contract.

### 33.1 First successful authentication

For a validated `(issuer, subject)` not yet present:

1. begin one PostgreSQL transaction;
2. generate candidate internal `user_id` UUID;
3. insert a minimal candidate `users` row;
4. attempt the identity insert using SQL semantics equivalent to:

```sql
INSERT INTO auth_identities (id, user_id, issuer, subject)
VALUES (...)
ON CONFLICT (issuer, subject) DO NOTHING
RETURNING user_id;
```

5. inspect the insert result inside the still-valid transaction;
6. if a row is returned, the identity insert succeeded:
   - retain the candidate `users` row;
   - use that candidate internal `user_id`;
   - create the Aevum session for that user;
   - commit;
7. if no row is returned, an existing/concurrent identity won:
   - delete the losing candidate `users` row within the same transaction;
   - resolve the existing `(issuer, subject)` mapping;
   - use the existing internal `user_id`;
   - create the Aevum session for that existing user;
   - commit.

The implementation must not rely on catching a plain unique-constraint violation and continuing inside a PostgreSQL transaction that has already entered an error state.

### 33.2 Duplicate/racing first-login attempts

The unique database constraint on:

```text
(issuer, subject)
```

remains the final race-safety boundary.

Concurrent reconciliation must use the explicit `ON CONFLICT (issuer, subject) DO NOTHING` strategy above so the transaction remains usable regardless of which caller wins.

If another transaction wins the identity insert:

- the losing identity insert returns no row;
- the losing candidate `users` row is deleted before commit;
- the already-existing identity mapping is resolved after the winning transaction becomes visible;
- both callers resolve to the same stable internal `user_id`;
- each successful authentication may create its own Aevum session for that same user.

The implementation must tolerate the normal PostgreSQL blocking/visibility behavior of concurrent unique-key insertion without converting the reconciliation transaction into a failed state.

No orphan candidate user may remain after a reconciliation conflict.

### 33.3 Repeat authentication

For an existing exact `(issuer, subject)`:

- reuse the existing internal `user_id`;
- do not replace it;
- do not create a second `users` row;
- create a fresh Aevum session.

### 33.4 Two different external identities

Different identity tuples must map independently:

```text
(issuer A, subject 1) ≠ (issuer A, subject 2)
(issuer A, subject 1) ≠ (issuer B, subject 1)
```

Phase 2 does not automatically merge identities, even if external email/name claims happen to match.

Two different validated identities therefore produce two different internal Aevum users unless a later explicitly scoped account-linking phase defines otherwise.

### 33.5 Mutable email/display-name behavior

Phase 2 requests only `openid` scope and does not persist email or display name.

If a provider happens to include extra claims:

- ignore them for reconciliation;
- do not persist them;
- do not update internal ownership because of them.

Email/display-name changes therefore have no effect on the internal user mapping.

### 33.6 Invalid/unverified assertion

If OIDC validation does not produce a trusted exact issuer and subject:

- reject authentication;
- do not provision a user;
- do not create a session.

No fallback to email/name is permitted.

## 34. PostgreSQL schema

Phase 2 adds exactly one new migration:

```text
backend/migrations/002_identity_ownership_foundation.ts
```

It creates these tables.

### 34.1 `users`

```text
id          uuid primary key
created_at  timestamptz not null default now()
```

No email, display name, profile, avatar, timezone, role, or domain fields are added.

### 34.2 `auth_identities`

```text
id          uuid primary key
user_id     uuid not null
issuer      text not null
subject     varchar(255) not null
created_at  timestamptz not null default now()
```

Constraints:

```text
foreign key (user_id) references users(id) on delete cascade
unique (issuer, subject)
unique (user_id)
check issuer is non-empty
check subject is non-empty
```

`unique(user_id)` intentionally enforces one external identity per Aevum user during Phase 2 because account linking/multiple providers are out of scope.

Indexes:

- the unique `(issuer, subject)` index created by the constraint;
- the unique `user_id` index created by the constraint.

No email index exists.

### 34.3 `auth_sessions`

```text
id          uuid primary key
user_id     uuid not null
token_hash  bytea not null
created_at  timestamptz not null default now()
expires_at  timestamptz not null
```

Constraints:

```text
foreign key (user_id) references users(id) on delete cascade
unique (token_hash)
check expires_at > created_at
```

Indexes:

```text
index on user_id
index on expires_at
```

No IP address, User-Agent, device name, geolocation, provider token, or raw session token is stored.

### 34.4 `auth_login_transactions`

```text
id             uuid primary key
token_hash     bytea not null
state          varchar(128) not null
nonce          varchar(128) not null
code_verifier  varchar(128) not null
created_at     timestamptz not null default now()
expires_at     timestamptz not null
```

Constraints:

```text
unique (token_hash)
unique (state)
check state is non-empty
check nonce is non-empty
check code_verifier is non-empty
check expires_at > created_at
```

Index:

```text
index on expires_at
```

The transaction row is temporary authentication state, not user profile data.

### 34.5 No other Phase 2 tables

Phase 2 must not create:

- roles;
- permissions;
- profiles;
- password credentials;
- provider-token storage;
- OAuth account tables containing access/refresh tokens;
- goals;
- pursuits;
- activities;
- journals;
- memories;
- conversations/messages;
- embeddings.

## 35. Migration and rollback contract

Phase 1 migration infrastructure remains unchanged.

Phase 2 uses the existing:

```text
node-pg-migrate
dotenv
--envPath .env
backend/migrations/
public.pgmigrations
```

### 35.1 UP

`002_identity_ownership_foundation.ts` must create, in dependency-safe order:

1. `users`;
2. `auth_identities`;
3. `auth_sessions`;
4. `auth_login_transactions`;
5. required indexes/constraints.

### 35.2 DOWN

Rollback must drop, in reverse dependency order:

1. `auth_login_transactions`;
2. `auth_sessions`;
3. `auth_identities`;
4. `users`.

It must not:

- drop pgvector;
- drop Phase 1 migration infrastructure;
- use `CASCADE` to conceal dependency mistakes.

### 35.3 Clean migration

From an empty Phase 1-compatible database:

```text
001_enable_vector
002_identity_ownership_foundation
```

must both migrate successfully.

Re-running `db:migrate` at head must remain a successful no-op.

## 36. NestJS module structure

Add only these application boundaries:

```text
backend/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── current-user.controller.ts
│   ├── auth.service.ts
│   ├── oidc.service.ts
│   ├── session.service.ts
│   ├── session-auth.guard.ts
│   ├── current-principal.decorator.ts
│   └── auth.types.ts
└── identity/
    ├── identity.module.ts
    ├── identity.service.ts
    └── identity.types.ts
```

### 36.1 `IdentityModule`

Owns:

- stable internal user creation;
- `(issuer, subject)` lookup;
- race-safe reconciliation/provisioning.

It may use the existing Phase 1 `DatabaseService`/`pg` pool.

It does not own HTTP transport.

### 36.2 `AuthModule`

Owns:

- OIDC protocol integration;
- login transaction lifecycle;
- Aevum session lifecycle;
- session authentication guard;
- current-user transport capability.

It imports `IdentityModule` and existing database/config capabilities.

### 36.3 Controller responsibilities

`AuthController` owns only:

```text
GET  /api/auth/login
GET  /api/auth/callback
POST /api/auth/logout
```

`CurrentUserController` owns only:

```text
GET /api/users/me
```

Controllers remain transport-thin.

### 36.4 No speculative modules

Do not create Goal, Journal, Memory, Chat, Profile, Role, Permission, Organization, AI, RAG, Agent, or other future modules.

## 37. Trusted authenticated principal

Exact application-level principal:

```text
AuthenticatedPrincipal {
  userId: string;
  sessionId: string;
}
```

Both are internal Aevum UUID strings.

It must **not** contain:

- email;
- provider access token;
- refresh token;
- raw ID Token;
- raw session token;
- display name;
- role list.

### 37.1 Guard

`SessionAuthGuard`:

1. reads the `aevum.sid` cookie;
2. validates/hash-resolves the Aevum session;
3. rejects unauthenticated/invalid/expired sessions;
4. attaches an `AuthenticatedPrincipal` to the Nest request;
5. never accepts a `user_id` request parameter/body/header as identity.

### 37.2 Principal access

Use a dedicated:

```text
@CurrentPrincipal()
```

decorator for protected controllers.

Future domain services should receive:

```text
principal.userId
```

from trusted controller/application context.

The principal is not reconstructed from frontend state.

## 38. Current-user endpoint

Exact protected endpoint:

```text
GET /api/users/me
```

No request body/query parameters.

### 38.1 Authenticated response

HTTP:

```text
200 OK
```

Body:

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

Only `userId` is returned.

No email, name, picture, provider issuer/subject, session ID, timestamps, or token metadata are exposed.

### 38.2 No session / invalid session

HTTP:

```text
401 Unauthorized
```

Body:

```json
{
  "code": "AUTHENTICATION_REQUIRED"
}
```

Malformed, unknown, deleted/revoked, or otherwise invalid session tokens use this same response.

The backend clears the session cookie when an invalid presented cookie exists.

### 38.3 Expired session

HTTP:

```text
401 Unauthorized
```

Body:

```json
{
  "code": "SESSION_EXPIRED"
}
```

The matching expired row is deleted and the cookie is cleared.

### 38.4 Authentication persistence unavailable

If PostgreSQL cannot be reached while validating a session:

HTTP:

```text
503 Service Unavailable
```

Body:

```json
{
  "code": "AUTHENTICATION_UNAVAILABLE"
}
```

No database error text is exposed.

## 39. Authentication error/redirect contracts

### 39.1 Login initiation provider unavailable

`GET /api/auth/login` redirects:

```text
302 → {AEVUM_CORS_ORIGIN}/signin?error=authentication_unavailable
```

### 39.2 Callback authentication failure

Any invalid OIDC callback redirects:

```text
302 → {AEVUM_CORS_ORIGIN}/signin?error=authentication_failed
```

### 39.3 CSRF failure

`POST /api/auth/logout` returns:

```text
403
{
  "code": "CSRF_VALIDATION_FAILED"
}
```

### 39.4 Unexpected safe auth failure

For an unexpected server-side auth error on a JSON API route:

```text
500
{
  "code": "AUTHENTICATION_ERROR"
}
```

Do not return stack traces, SQL, token contents, issuer metadata, or provider error payloads to the browser.

## 40. Frontend structure and responsibilities

Add only:

```text
frontend/src/
├── app/
│   ├── signin/
│   │   └── page.tsx
│   └── me/
│       └── page.tsx
├── components/
│   └── auth/
│       ├── sign-in-view.tsx
│       └── current-user-view.tsx
└── lib/
    └── api/
        └── auth.ts
```

The existing Phase 1 `/` foundation/status page remains unchanged.

No Next.js middleware-based authorization is added in Phase 2.

Reason:

> frontend route protection is UX only; NestJS remains the authoritative auth boundary.

### 40.1 Auth API client

`frontend/src/lib/api/auth.ts` owns Phase 2 browser/API behavior:

- current-user request;
- logout request;
- auth response validation;
- safe error mapping;
- login URL construction from the existing public API base URL.

Authentication-related fetches use:

```text
credentials: "include"
cache: "no-store"
```

### 40.2 `/signin`

The public `/signin` route supports:

```text
LOADING
UNAUTHENTICATED
AUTHENTICATED
UNAVAILABLE
AUTHENTICATION_FAILED
```

Behavior:

- initially call `/api/users/me`;
- if 200, navigate to `/me`;
- if 401, show one **Sign in** action;
- if backend/auth persistence unavailable, show a safe unavailable message and Retry;
- `?error=authentication_failed` shows a generic failed-authentication message;
- `?error=authentication_unavailable` shows a generic provider/authentication-unavailable message.

The Sign in action performs top-level navigation to:

```text
{NEXT_PUBLIC_AEVUM_API_BASE_URL}/api/auth/login
```

It does not fetch provider tokens.

### 40.3 `/me`

The protected-UX `/me` route supports:

```text
LOADING
AUTHENTICATED
UNAUTHENTICATED
EXPIRED
UNAVAILABLE
SIGNING_OUT
```

Authenticated display is intentionally minimal:

```text
Signed in to Aevum
User ID: <internal Aevum UUID>
Sign out
```

If current-user returns `AUTHENTICATION_REQUIRED`, navigate to `/signin`.

If it returns `SESSION_EXPIRED`, navigate to:

```text
/signin?reason=session_expired
```

If authentication persistence is unavailable, keep the user on `/me` and show a safe unavailable state with Retry.

### 40.4 Sign-out

The frontend sends:

```text
POST /api/auth/logout
credentials: include
X-Aevum-CSRF: 1
```

On `204`, navigate to `/signin`.

No client-side cookie manipulation is used to perform logout.

## 41. CORS changes required by cookie sessions

Phase 1's exact-origin CORS model is preserved but narrowly extended.

Backend CORS becomes:

```text
origin: exact AEVUM_CORS_ORIGIN
credentials: true
methods: GET, POST, OPTIONS
allowed request headers: Content-Type, X-Aevum-CSRF
```

Wildcard origin remains prohibited.

The existing `/api/system/status` endpoint remains public and unchanged.

No authentication cookie is required for system status.

## 42. Configuration/environment variables

Retain all Phase 1 environment variables.

Add to `backend/.env.example`:

```text
AEVUM_OIDC_ISSUER=http://127.0.0.1:9090
AEVUM_OIDC_CLIENT_ID=aevum-local
AEVUM_OIDC_CLIENT_SECRET=aevum-local-secret
AEVUM_OIDC_REDIRECT_URI=http://localhost:8080/api/auth/callback
```

These example credentials are local test-provider values only.

### 42.1 Validation

`AEVUM_OIDC_ISSUER`:

- required;
- valid URL;
- in development/test, `http` is permitted only for hosts accepted by the existing loopback-host validator;
- a development/test `http` issuer on any non-loopback host is invalid;
- production requires `https` and rejects every `http` issuer;
- an `https` issuer remains valid without the insecure-request opt-in;
- no query or fragment.

After validation, OIDC configuration must derive the `localLoopbackHttp` condition from the validated runtime + URL. Only that condition may cause `allowInsecureRequests` to be passed to `openid-client`.

`AEVUM_OIDC_CLIENT_ID`:

- required non-empty string.

`AEVUM_OIDC_CLIENT_SECRET`:

- required non-empty secret;
- must never be logged or exposed to frontend.

`AEVUM_OIDC_REDIRECT_URI`:

- required absolute URL;
- path must equal `/api/auth/callback`;
- development/test local HTTP allowed only on loopback/localhost;
- no query or fragment.

`AEVUM_CORS_ORIGIN` continues to define the single frontend origin and must not be `*`.

### 42.2 Fixed Phase 2 constants

Do not add environment variables for these unless PSB later changes the SPEC:

```text
session lifetime            = 86400 seconds
OIDC transaction lifetime   = 600 seconds
session token entropy       = 256 bits
transaction-handle entropy  = 256 bits
PKCE method                 = S256
OIDC scope                  = openid
success frontend route      = /me
```

This avoids unnecessary configuration surface.

## 43. Authentication-data minimization contract

### 43.1 Persisted durable data

Aevum persists only:

- internal `users.id`;
- user `created_at`;
- external identity `issuer`;
- external identity `subject`;
- identity creation timestamp;
- hashed Aevum session token;
- session user ID;
- session timestamps.

### 43.2 Persisted temporary transaction data

The following temporary data may be persisted for an OIDC login transaction:

- hash of opaque transaction cookie handle;
- state;
- nonce;
- PKCE verifier;
- transaction timestamps including `expires_at`.

This information is required to complete and validate the OIDC redirect flow.

The hard authentication-validity boundary is:

```text
expires_at <= created_at + 600 seconds
```

An expired transaction can never successfully complete authentication, even if its row still physically exists.

Physical retention is opportunistic rather than scheduler-driven:

- successful transactions are deleted during successful callback handling;
- failed or expired transactions are deleted during callback handling when safely identifiable;
- authentication operations such as login initiation and callback opportunistically prune expired transaction rows;
- because Phase 2 has no scheduler/background cleanup worker, an expired row may remain physically stored until a later authentication operation performs cleanup;
- any stale row has no usable authentication capability after `expires_at`.

Phase 2 therefore guarantees a maximum **600-second validity period**, not guaranteed physical row deletion at exactly 600 seconds.

### 43.3 Explicitly not persisted

Phase 2 must not persist:

- provider access tokens;
- provider refresh tokens;
- raw ID Tokens;
- authorization codes;
- provider UserInfo;
- email;
- email verification state;
- display name;
- username/preferred username;
- avatar/picture;
- phone;
- address;
- locale;
- provider profile JSON;
- IP address;
- User-Agent/device fingerprint;
- MFA state;
- password/password hash;
- provider recovery data.

### 43.4 Sensitive artifacts

The only Phase 2 sensitive artifacts are:

- `AEVUM_OIDC_CLIENT_SECRET` in backend environment;
- raw opaque Aevum session cookie in browser;
- short-lived PKCE verifier/nonce/state in the login-transaction table.

Protection/lifecycle:

- client secret is environment-only and never written to PostgreSQL/logs/frontend;
- raw session token is HttpOnly cookie only; database retains only hash;
- transaction secrets are server-side and never logged; `expires_at` ends their authentication validity no later than 600 seconds after creation, while physical row cleanup is callback/opportunistic as defined above;
- provider tokens exist only ephemerally during callback processing and are discarded.

## 44. Logging and error-safety contract

Allowed security-relevant logs may include:

- event type;
- timestamp;
- internal Aevum `userId` after successful reconciliation;
- internal session row UUID if needed for server correlation;
- safe error code/category.

Do not log:

- session cookie/token;
- session token hash in full;
- OIDC client secret;
- authorization code;
- access token;
- refresh token;
- raw ID Token;
- PKCE verifier;
- nonce;
- state;
- full `DATABASE_URL`;
- provider profile claims;
- provider response bodies containing tokens.

Authentication failures should be logged generically without reflecting secrets to the client.

## 45. Rate-limiting decision

Phase 2 does **not** add an Aevum credential-attempt rate limiter.

Reason:

- Aevum does not accept passwords, OTPs, recovery codes, or MFA secrets;
- credential brute-force protections belong to the configured OIDC provider;
- production perimeter/anti-abuse infrastructure is explicitly outside Phase 2.

The login-transaction capability is short-lived: `expires_at` enforces a hard 600-second validity boundary, while expired rows are pruned opportunistically during authentication operations. No scheduler, queue, cron job, or background worker is introduced.

A later deployment/security phase may add edge/request rate limiting based on real exposure requirements.

Do not add `@nestjs/throttler`, Redis, or another rate-limit store solely for Phase 2.

## 46. Local reproducible OIDC test provider

To avoid vendor coupling in development/testing, add a **test-only** local OIDC provider fixture.

Backend development dependency:

```text
oidc-provider 9.12.2
```

It is not imported into production application code.

### 46.1 Fixture location

```text
backend/test/fixtures/oidc-test-provider.mjs
```

The `.mjs` fixture remains outside the CommonJS production build.

### 46.2 Fixture contract

The fixture runs only on loopback:

```text
issuer: http://127.0.0.1:9090
```

Configured test client:

```text
client_id:     aevum-local
client_secret: aevum-local-secret
redirect_uri:  http://localhost:8080/api/auth/callback
```

It supports Authorization Code + PKCE S256 and exactly two deterministic test subjects:

```text
test-user-a
test-user-b
```

The fixture may expose a minimal provider-owned test interaction page for choosing A or B.

For integration verification, the fixture/test harness must make token-endpoint request metadata observable **without recording the secret itself**. The test must be able to assert:

```text
Authorization header scheme = Basic
token request body contains client_secret = false
```

The successful provider token exchange remains the proof that the Basic credentials are valid. Tests must not log or persist the raw `Authorization` header or decoded client secret.

It stores no persistent provider data and is not a production identity service.

### 46.3 Script

Backend package script:

```text
auth:test-provider
```

starts the fixture with:

```text
node test/fixtures/oidc-test-provider.mjs
```

## 47. Backend dependency additions

Preserve all closed Phase 1 dependencies.

Add runtime dependencies:

```text
openid-client 6.8.8
cookie 2.0.1
```

Add development dependency:

```text
oidc-provider 9.12.2
```

No Passport package is required.

No full authentication framework is added.

The existing direct `pg`, node-pg-migrate, dotenv, Jest, ts-jest, NestJS 11, TypeScript 5.9.3, PostgreSQL 18, and pgvector 0.8.6 choices remain unchanged.

## 48. Exact repository additions

Phase 2 adds:

```text
aevum/
├── backend/
│   ├── migrations/
│   │   └── 002_identity_ownership_foundation.ts
│   ├── src/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── current-user.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── oidc.service.ts
│   │   │   ├── session.service.ts
│   │   │   ├── session-auth.guard.ts
│   │   │   ├── current-principal.decorator.ts
│   │   │   └── auth.types.ts
│   │   └── identity/
│   │       ├── identity.module.ts
│   │       ├── identity.service.ts
│   │       └── identity.types.ts
│   └── test/
│       ├── auth.integration-spec.ts
│       ├── identity.integration-spec.ts
│       └── fixtures/
│           └── oidc-test-provider.mjs
├── frontend/
│   └── src/
│       ├── app/
│       │   ├── signin/
│       │   │   └── page.tsx
│       │   └── me/
│       │       └── page.tsx
│       ├── components/
│       │   └── auth/
│       │       ├── sign-in-view.tsx
│       │       └── current-user-view.tsx
│       └── lib/
│           └── api/
│               └── auth.ts
├── e2e/
│   └── identity-ownership.spec.ts
└── playwright.config.ts
```

Small test support files are allowed only where necessary to run the specified auth tests.

No future product-domain structure is permitted.

## 49. Browser E2E tooling

Authentication involves browser redirects, HttpOnly cookies, and cross-origin credentialed requests, so Phase 2 adds one justified browser test tool at repository root:

```text
@playwright/test 1.63.0
```

Phase 2 automated E2E scope uses **Chromium only**.

Required one-time browser install:

```text
pnpm exec playwright install chromium
```

Root script:

```text
test:e2e
```

runs the Phase 2 identity/auth E2E suite.

This does not create a general cross-browser matrix for Phase 2.

## 50. Backend unit tests

Retain Phase 1 Jest/ts-jest CommonJS configuration.

Add unit coverage for:

### 50.1 Identity reconciliation

Verify service behavior for:

- first identity creates a user;
- repeated identity reuses the same user;
- identity key uses exact issuer + subject;
- email/name values are not reconciliation inputs.

### 50.2 Session service

Verify:

- 32-byte random token generation;
- SHA-256 token hashing;
- raw token is not passed to persistence write;
- 24-hour expiry calculation;
- valid lookup maps to correct principal;
- invalid token maps to authentication required;
- expired token maps to session expired and deletion.

### 50.3 Guard

Verify:

- no cookie → 401;
- valid cookie → trusted principal;
- arbitrary request `user_id` does not alter principal;
- invalid cookie → 401;
- expired session → 401 expired response.

### 50.4 CSRF/logout

Verify:

- correct Origin + header passes;
- missing/wrong Origin fails;
- missing/wrong custom header fails;
- CSRF failure does not delete session.

### 50.5 Configuration

Verify all new OIDC environment/configuration rules, including:

- development with `http://127.0.0.1:9090` is accepted and derives `localLoopbackHttp = true`;
- test with the approved loopback HTTP issuer is accepted and derives `localLoopbackHttp = true`;
- production with any HTTP issuer is rejected before discovery;
- development/test with an HTTP issuer on a non-loopback host is rejected before discovery;
- an HTTPS issuer is accepted without enabling `allowInsecureRequests`;
- the OIDC configuration builder includes `execute: [allowInsecureRequests]` only for the approved development/test loopback HTTP branch;
- `ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)` remains configured in both the loopback-HTTP and normal-HTTPS branches.

### 50.6 Error/log safety

Verify error mapping does not return token/provider/database details.

## 51. Real PostgreSQL integration tests

Use the existing Phase 1 Testcontainers PostgreSQL + pgvector environment and same migrations.

### 51.1 Schema migration

From clean database:

- migration 001 runs;
- migration 002 runs;
- vector 0.8.6 remains available;
- exactly the Phase 2 identity/auth tables exist in addition to Phase 1 migration infrastructure;
- no product-domain table exists.

### 51.2 First-login/repeat identity

Against real PostgreSQL:

1. reconcile `(issuer A, subject A)`;
2. assert one `users` row;
3. assert one `auth_identities` row;
4. reconcile the same tuple again;
5. assert same internal user ID;
6. assert no duplicate user/identity.

### 51.3 Two identities

Reconcile two different subjects under the same issuer.

Assert:

- two `users`;
- two `auth_identities`;
- distinct internal user IDs.

### 51.4 Race-safe provisioning

Execute at least two concurrent reconciliation attempts for the same previously unseen `(issuer, subject)`.

After completion assert:

```text
users created for that identity = 1
auth_identities for tuple        = 1
orphan candidate users           = 0
both callers resolve same userId = true
```

The test must exercise the real database unique constraint and transaction logic using the specified `INSERT ... ON CONFLICT (issuer, subject) DO NOTHING` reconciliation path. It must prove both the insert-winner branch and the conflict/losing-candidate cleanup branch remain transaction-safe.

### 51.5 Session persistence

Verify:

- only token hash is stored;
- valid raw token resolves;
- different raw token does not resolve;
- expired session is rejected/deleted;
- sign-out deletion makes the original cookie unusable.

### 51.6 Data minimization

Inspect schema/rows and prove there are no persisted columns/values for:

- email/name/avatar/profile payload;
- access/refresh/ID tokens;
- password hash;
- UserInfo.

## 52. Real OIDC authentication-flow integration tests

Use the local `oidc-provider` fixture and a real Testcontainers PostgreSQL database.

Do not mock `OidcService`, `IdentityService`, or `SessionService` in these cases.

### 52.1 Successful local-loopback HTTP flow

Using the configured test issuer:

```text
http://127.0.0.1:9090
```

exercise:

```text
GET /api/auth/login
→ HTTP discovery on loopback test issuer
→ provider authorization
→ callback
```

Verify:

- discovery succeeds over the approved loopback HTTP issuer because the configuration explicitly supplies `execute: [allowInsecureRequests]`;
- the resulting Authorization Code flow completes successfully against that same HTTP loopback issuer;
- PKCE S256 is used;
- state/nonce transaction is present;
- the token endpoint receives client authentication through an HTTP `Authorization: Basic ...` header;
- the token request form body does **not** contain `client_secret`;
- `client_secret_post` is not used;
- successful callback creates exactly one user/identity;
- login transaction is deleted;
- Aevum session is created;
- session cookie is issued;
- callback redirects to frontend `/me`;
- authenticated `GET /api/users/me` returns exact internal user ID.

### 52.2 Repeat flow

Authenticate the same provider subject again.

Verify:

- same internal Aevum user ID;
- no duplicate identity/user;
- a new Aevum session may be created.

### 52.3 Different subject

Authenticate the second provider test subject.

Verify a distinct Aevum user ID.

### 52.4 Invalid OIDC cases

At minimum prove that each of these creates no user/session:

- invalid/mismatched `state`;
- missing/expired transaction cookie;
- expired transaction row;
- invalid nonce/ID-token validation result;
- invalid issuer or audience assertion.

Failure uses the safe frontend redirect contract.

### 52.5 Provider unavailable

With the OIDC fixture stopped/unreachable:

- backend still starts;
- `/api/system/status` behavior remains unchanged;
- login initiation redirects to `authentication_unavailable`;
- no raw provider error reaches the browser.

### 52.6 Provider-token non-retention

After successful callback, inspect PostgreSQL and verify no provider access token, refresh token, raw ID Token, authorization code, or profile payload is retained.

### 52.7 Insecure-request boundary

Integration/configuration verification must additionally prove:

1. `development` + `http://127.0.0.1:9090`:
   - configuration succeeds;
   - `allowInsecureRequests` is supplied;
   - discovery succeeds;
   - the complete OIDC Authorization Code flow succeeds;
   - `ClientSecretBasic` remains active.

2. `production` + `http://127.0.0.1:9090`:
   - configuration validation fails;
   - discovery is never attempted;
   - `allowInsecureRequests` is never enabled.

3. `development` or `test` + an HTTP non-loopback issuer:
   - configuration validation fails;
   - discovery is never attempted;
   - `allowInsecureRequests` is never enabled.

4. any valid HTTPS issuer configuration:
   - the OIDC configuration does not include `allowInsecureRequests`;
   - normal HTTPS-only behavior remains in force.

The tests must not relax the existing explicit `ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)` requirement in any branch.

## 53. Frontend verification

Retain Phase 1:

```text
lint
typecheck
build
```

Add focused tests only if needed by the existing test setup; Phase 2's authoritative browser behavior is verified through Playwright E2E.

Frontend build must prove:

- `/` Phase 1 page still builds;
- `/signin` builds;
- `/me` builds;
- auth client uses the existing configured API base URL;
- no provider secret exists in frontend/public environment.

## 54. Automated browser E2E

With:

- PostgreSQL running/migrated;
- local OIDC test provider running;
- backend running;
- frontend running;

the Playwright Chromium test must perform:

### 54.1 Unauthenticated

1. open `/me`;
2. observe loading;
3. receive unauthenticated state;
4. reach `/signin`;
5. verify Sign in action exists.

### 54.2 Sign in identity A

1. select Sign in;
2. follow real backend → OIDC-provider redirect;
3. choose `test-user-a` in provider fixture;
4. complete callback;
5. return to frontend `/me`;
6. verify "Signed in to Aevum";
7. capture displayed internal user ID;
8. refresh browser;
9. verify same user ID/session remains authenticated.

### 54.3 Sign out

1. select Sign out;
2. verify POST logout succeeds;
3. verify browser returns to `/signin`;
4. revisit `/me`;
5. verify it does not expose protected current-user data.

### 54.4 Repeat identity A

Sign in as `test-user-a` again.

Verify the displayed internal user ID equals the first captured ID.

### 54.5 Identity B

Sign out, then sign in as `test-user-b`.

Verify the internal user ID differs from A.

### 54.6 Phase 1 regression

Verify:

```text
/
```

still renders the Phase 1 foundation experience and:

```text
GET /api/system/status
```

still returns the Phase 1 READY DTO with healthy database/pgvector.

## 55. Session-expiry browser/manual verification

Automated backend integration must prove expiry.

The BUILD review must additionally perform one controlled local browser expiry check:

1. authenticate through local test OIDC provider;
2. identify the session row by safe test setup tooling—not by exposing raw cookie in logs;
3. update its `expires_at` to the past directly in local test database;
4. refresh `/me`;
5. verify frontend reaches:

```text
/signin?reason=session_expired
```

6. verify expired session row is deleted;
7. verify session cookie is cleared.

This is local test manipulation only, not an application feature.

## 56. Clean-database migration verification

Use the Phase 1 clean-database workflow.

From repository root:

```text
docker compose --env-file infra/.env -f infra/compose.yaml down -v
docker compose --env-file infra/.env -f infra/compose.yaml up -d
pnpm --filter @aevum/backend db:migrate
pnpm --filter @aevum/backend db:migrate
```

Requirements:

- first migration run applies 001 + 002 from empty database;
- second run is a successful no-op;
- vector extension is still version 0.8.6;
- `users`, `auth_identities`, `auth_sessions`, and `auth_login_transactions` exist;
- no product-domain table exists.

Run:

```text
pnpm --filter @aevum/backend db:rollback
```

from Phase 2 head.

It must roll back only migration 002 and leave:

- Phase 1 migration 001 active;
- pgvector installed;
- Phase 2 identity/auth tables removed.

Then run `db:migrate` again and verify Phase 2 schema is recreated successfully.

## 57. Exact verification commands

### 57.1 Install/toolchain

```text
pnpm install --frozen-lockfile
pnpm --version
pnpm --filter @aevum/frontend exec tsc --version
pnpm --filter @aevum/backend exec tsc --version
pnpm --filter @aevum/backend exec node -e "const oidc=require('openid-client'); if (typeof oidc.discovery !== 'function') process.exit(1)"
```

Expected preserved versions:

```text
pnpm 12.3.4
TypeScript frontend 5.9.3
TypeScript backend 5.9.3
```

### 57.2 Frontend

```text
pnpm --filter @aevum/frontend lint
pnpm --filter @aevum/frontend typecheck
pnpm --filter @aevum/frontend build
```

### 57.3 Backend

```text
pnpm --filter @aevum/backend lint
pnpm --filter @aevum/backend typecheck
pnpm --filter @aevum/backend build
pnpm --filter @aevum/backend test
pnpm --filter @aevum/backend test:integration
```

### 57.4 Browser test setup

```text
pnpm exec playwright install chromium
```

### 57.5 E2E

With required local services configured, run:

```text
pnpm test:e2e
```

### 57.6 Root verification

Update root:

```text
pnpm verify
```

so it includes:

- all preserved Phase 1 non-manual verification;
- Phase 2 backend unit/integration verification;
- frontend lint/typecheck/build.

`pnpm verify` does **not** need to install browsers or run the Playwright E2E suite.

E2E remains a separate explicit verification command because browser installation is an environment prerequisite.

## 58. Local manual smoke-test procedure

### 58.1 Prepare environment

Copy/prepare:

```text
infra/.env
backend/.env
frontend/.env.local
```

Backend `.env` uses the committed local OIDC test-provider values.

Verify real `.env` files remain ignored.

### 58.2 Start database and migrate

```text
docker compose --env-file infra/.env -f infra/compose.yaml up -d
pnpm --filter @aevum/backend db:migrate
```

### 58.3 Start local OIDC test provider

```text
pnpm --filter @aevum/backend auth:test-provider
```

Expected issuer:

```text
http://127.0.0.1:9090
```

The development/test backend must accept this validated loopback HTTP issuer and construct `openid-client` discovery with the conditional `execute: [allowInsecureRequests]` option. No equivalent insecure-request opt-in is permitted for production or HTTPS issuers.

### 58.4 Start backend

```text
pnpm --filter @aevum/backend dev
```

Expected:

```text
http://localhost:8080
```

Verify Phase 1:

```text
GET /api/system/status → 200 READY
```

### 58.5 Start frontend

```text
pnpm --filter @aevum/frontend dev
```

Open:

```text
http://localhost:3000/signin
```

### 58.6 Identity A

Sign in through the local provider as `test-user-a`.

Verify:

- callback returns to `/me`;
- page shows signed-in state;
- page shows one internal Aevum UUID;
- refresh remains signed in.

Record the UUID as test evidence.

### 58.7 Sign out and repeat

Sign out.

Verify `/me` no longer returns protected current-user data.

Sign in again as `test-user-a`.

Verify internal Aevum UUID is unchanged.

### 58.8 Identity B

Sign out.

Sign in as `test-user-b`.

Verify internal Aevum UUID differs from A.

### 58.9 OIDC provider unavailable

Stop the test provider but leave Nest/PostgreSQL/frontend running.

Verify:

- existing authenticated Aevum session can still call `/api/users/me`;
- `/api/system/status` remains healthy;
- initiating a new sign-in safely returns to `/signin?error=authentication_unavailable`.

This confirms provider availability is required for new authentication, not for validating already-issued Aevum sessions.

## 59. Phase 1 regression requirements

Implementation Phase 2 must not break the accepted Phase 1 foundation.

At minimum:

- `/api/system/status` contract and all three DTOs remain unchanged;
- pgvector 0.8.6 remains enabled;
- PostgreSQL 18 development/test baseline remains;
- direct `pg` database access remains;
- node-pg-migrate/.env behavior remains;
- Next.js `/` foundation experience remains;
- NestJS CommonJS production output remains;
- Phase 1 frontend/backend lint/typecheck/build tests remain passing;
- Phase 1 real PostgreSQL/pgvector integration tests remain passing.

CORS is the only expected Phase 1 transport configuration change: it is narrowly extended to support credentialed cookie requests and POST logout for the same configured frontend origin.

## 60. Documentation affected by successful implementation

After BUILD/review, update only as facts become true:

- `docs/implementation/PHASE-02.md`;
- `docs/implementation/README.md`;
- `docs/PROGRESS.md`;
- root `README.md` for local OIDC/test-provider setup;
- `docs/DECISIONS.md` to resolve D-103 only after the approved authentication design is actually adopted;
- `docs/architecture/SECURITY-PRIVACY.md` for durable OIDC/session/ownership boundaries if approved;
- `docs/architecture/DATA.md` if the stable user/identity ownership schema becomes durable architecture guidance.

Do not modify the closed Phase 1 implementation contract.

Do not rewrite historical phase documents merely to mirror implementation detail.

## 61. Preserved non-goals

This SPEC does not authorize:

- Goals;
- Pursuits;
- Activities;
- Projects;
- Journal;
- Memories / Memory Engine;
- Chat / Conversations / Messages;
- Today;
- Timeline;
- Search;
- StoryOfMe;
- rich user profile management;
- email/profile synchronization;
- organizations;
- teams;
- tenants/workspaces;
- role matrices/RBAC frameworks;
- admin user management;
- MFA/passkeys;
- password authentication;
- password reset/recovery;
- multiple OIDC providers;
- identity linking;
- account deletion/export;
- provider access-token use;
- UserInfo/profile APIs;
- AI providers;
- embeddings;
- RAG;
- agents/tools;
- queues;
- caches;
- background auth workers;
- production deployment;
- production edge/rate-limit infrastructure.

## 62. Acceptance criteria

Implementation Phase 2 passes only when all criteria below are satisfied.

1. Implementation Phase 1 remains `CLOSED` and its implementation contract is unmodified.
2. Phase 2 implements exactly one authentication path: standards-based OIDC Authorization Code with PKCE against one configured issuer.
3. NestJS remains the authoritative authentication/authorization boundary for protected Aevum APIs.
4. `openid-client@6.8.8` is used for OIDC discovery/code flow/token validation; its configuration explicitly supplies `ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)`, and supplies `execute: [allowInsecureRequests]` only for a validated development/test loopback HTTP issuer while production HTTP and development/test non-loopback HTTP issuers are rejected before discovery.
5. Phase 1 CommonJS backend semantics remain unchanged and Node 24 runtime interoperability with `openid-client` is verified.
6. Aevum requests only OIDC `openid` scope and does not request profile/email/offline-access scopes.
7. Aevum exposes no first-party registration/password endpoint.
8. First successful valid OIDC authentication auto-provisions the minimum internal Aevum user.
9. Internal Aevum user IDs are server-generated UUID v4 values.
10. The durable external authentication key is exact validated `(issuer, subject)`.
11. Email, display name, username, or avatar is not used for identity reconciliation.
12. Repeat authentication of the same `(issuer, subject)` returns the same internal user ID.
13. Two different validated external identities resolve to two different internal user IDs.
14. Concurrent first-login attempts use transaction-safe `INSERT ... ON CONFLICT (issuer, subject) DO NOTHING` semantics, both resolve to the same internal user, create exactly one durable identity/user mapping, and leave no orphan candidate users.
15. No client-supplied `user_id` can influence authenticated principal selection.
16. The trusted NestJS principal contains only internal `userId` and `sessionId`.
17. `GET /api/users/me` returns only the internal `userId` for a valid session.
18. Unauthenticated/invalid session access to `/api/users/me` returns exact 401 `AUTHENTICATION_REQUIRED`.
19. Expired session access returns exact 401 `SESSION_EXPIRED`, deletes the expired row, and clears the cookie.
20. Database unavailability during session validation returns exact 503 `AUTHENTICATION_UNAVAILABLE`.
21. Successful OIDC login creates an Aevum-owned 256-bit opaque session token.
22. PostgreSQL stores only the SHA-256 hash of the raw Aevum session token.
23. Aevum sessions have a fixed 24-hour absolute lifetime with no sliding refresh or refresh token.
24. Logout deletes the current valid Aevum session, clears the cookie, and returns 204.
25. Logout remains idempotent when the session is absent/invalid after passing CSRF validation.
26. The Aevum session cookie is HttpOnly, SameSite=Lax, host-only, Path=/, and uses the specified Secure behavior.
27. The OIDC transaction cookie is HttpOnly, SameSite=Lax, callback-path-scoped, has a 600-second maximum lifetime, and contains only an opaque handle; transaction `expires_at` is the hard 600-second server-side authentication-validity boundary.
28. Authentication/session tokens are never placed in localStorage/sessionStorage.
29. OIDC login/callback uses PKCE S256, state, nonce, and a one-time server-side transaction.
30. Invalid state/nonce/issuer/audience/signature/transaction/code flow creates no user or Aevum session.
31. Successful transactions and safely identifiable failed/expired transactions are deleted during callback handling, expired rows are opportunistically pruned during authentication operations, and no expired transaction can authenticate after `expires_at` even if its row remains physically stored until later cleanup.
32. Provider access tokens, refresh tokens, raw ID Tokens, authorization codes, UserInfo payloads, and broad profile claims are not persisted.
33. `users` contains only internal ID and creation timestamp.
34. `auth_identities`, `auth_sessions`, and `auth_login_transactions` match the exact approved schema/constraints.
35. Migration `002_identity_ownership_foundation.ts` creates only the approved identity/authentication schema.
36. Rolling back migration 002 removes only Phase 2 tables and leaves Phase 1 pgvector foundation intact.
37. Clean migrations 001 + 002 succeed and a second migration run is a no-op.
38. No Goal/Journal/Memory/Chat/other product-domain table is introduced.
39. `SessionAuthGuard` derives owner context only from a validated Aevum session.
40. Logout rejects missing/wrong Origin or `X-Aevum-CSRF` with exact 403 and does not delete the valid session.
41. CORS permits credentials only for exact configured frontend origin and GET/POST/OPTIONS; wildcard origin remains prohibited.
42. `/api/system/status` remains public and its Phase 1 contract is unchanged.
43. Frontend `/signin` implements the specified loading/unauthenticated/authenticated/unavailable/failure states.
44. Frontend `/me` implements loading/authenticated/unauthenticated/expired/unavailable/signing-out states.
45. Frontend auth API calls use the existing configured API base, `credentials: include`, and safe response validation.
46. The local test-only OIDC provider runs at the approved loopback HTTP issuer, supports deterministic test identities A and B, and completes discovery plus the full OIDC flow only through the explicitly conditional local `allowInsecureRequests` configuration.
47. Provider unavailability does not prevent backend startup or invalidate an already-valid Aevum session.
48. Real PostgreSQL tests prove first-login, repeat-login, two-identity, race-safe reconciliation, session persistence, expiry, and data minimization.
49. Real OIDC integration tests prove the complete flow against `http://127.0.0.1:9090`, the environment/loopback boundary for `allowInsecureRequests`, production/non-loopback HTTP rejection, required OIDC failure cases, and HTTP Basic `client_secret_basic` token-endpoint authentication without `client_secret` in the request body, without mocking the core auth/identity/session services.
50. Playwright Chromium E2E proves sign-in A, refresh continuity, sign-out, repeat A same user ID, B different user ID, and Phase 1 regression.
51. Frontend lint/typecheck/build and backend lint/typecheck/build/unit/integration suites all pass.
52. `pnpm verify`, clean-database migration/rollback/remigration verification, and required manual smoke/expiry checks pass.
53. Logs and browser errors contain no provider/session secrets, authorization codes, raw ID Tokens, PKCE verifier, or full database URL.
54. No Aevum rate-limiting infrastructure is added for Phase 2, and no local credential-verification endpoint exists.
55. No authentication provider vendor SDK or full auth framework is introduced.
56. No approved Phase 2 non-goal is implemented.

## 63. Definition of Done

Implementation Phase 2 is Done only when:

- all 56 acceptance criteria pass;
- Implementation Phase 1 remains closed and all required Phase 1 regression verification passes;
- the application supports exactly one configured OIDC issuer using Authorization Code + PKCE;
- NestJS remains authoritative for authentication and owner context;
- `(issuer, subject)` is the only external identity reconciliation key;
- internal Aevum UUID remains distinct from external identity attributes;
- first/repeat/racing reconciliation behavior passes against real PostgreSQL using the specified `ON CONFLICT (issuer, subject) DO NOTHING` transaction-safe strategy;
- two separate OIDC identities demonstrably produce separate internal users;
- no duplicate/orphan user is left by racing first-login and neither conflict branch relies on continuing a failed transaction;
- only the approved four Phase 2 identity/auth tables are added;
- migration 002 cleanly migrates, rolls back, and re-migrates without altering Phase 1 pgvector;
- raw Aevum session token exists only in the HttpOnly browser cookie and only its SHA-256 hash is persisted;
- provider access/refresh/ID tokens and profile data are not retained;
- `openid-client` explicitly uses `ClientSecretBasic`, real OIDC verification proves HTTP Basic token-endpoint authentication, and `client_secret` is absent from the token request body;
- the local development/test OIDC flow succeeds against `http://127.0.0.1:9090` only through conditional `execute: [allowInsecureRequests]`, while production HTTP and development/test non-loopback HTTP issuers are rejected and HTTPS issuers never receive the insecure-request opt-in;
- login transactions have a hard 600-second authentication-validity boundary, with callback/opportunistic physical cleanup and no background cleanup worker;
- session expiry/logout/invalidation semantics pass;
- CSRF requirements pass;
- exact current-user/error contracts pass;
- OIDC provider failure behavior is safe;
- frontend sign-in/current-user states pass;
- real OIDC integration tests pass;
- real PostgreSQL integration tests pass;
- Playwright Chromium E2E passes;
- clean database verification passes;
- manual sign-in/sign-out/repeat/different-user/provider-down/expiry smoke checks are recorded as passing;
- all Phase 1 lint/typecheck/build/integration regressions pass;
- no protected API accepts client-selected ownership IDs;
- no product domain, profile platform, multi-provider support, AI, queue/cache, or production deployment enters scope;
- documentation is updated only for implementation facts actually built;
- Phase 2 is not marked `VERIFIED` or `CLOSED` until the PSB review explicitly reaches those gates.

## 64. SPEC approval and BUILD-readiness state

The Aevum PSB Guide has approved this SPEC.

Current lifecycle:

- Implementation Phase 1: `CLOSED`
- Phase 2 PLAN: `PLAN_APPROVED`
- Phase 2 SPEC: `SPEC_APPROVED`
- Phase 2 build eligibility: `READY_FOR_BUILD`
- Phase 2 BUILD: `NOT_STARTED`

The 56 acceptance criteria in Section 62 are **approved requirements** and are not recorded as passed at this checkpoint. The Definition of Done in Section 63 is **approved** and is not yet satisfied.

`READY_FOR_BUILD` means the approved contract is eligible to enter implementation. It does **not** mean BUILD has begun. Phase 2 becomes `BUILDING` only after Codex receives a later explicit BUILD instruction.

## 65. SPEC Approval Record — Aevum PSB Guide

The following checklist was satisfied when the Aevum PSB Guide approved the SPEC:

- [x] The selected Phase 2 path—one configurable standards-compliant OIDC issuer—is the smallest appropriate authentication mechanism.
- [x] Authorization Code + PKCE S256 + state + nonce is the correct flow.
- [x] `openid-client@6.8.8` is an acceptable OIDC client library.
- [x] `ClientSecretBasic(AEVUM_OIDC_CLIENT_SECRET)` is explicitly supplied to the `openid-client` configuration so `client_secret_basic` cannot fall back to the default secret-post behavior.
- [x] Real OIDC integration verification sufficiently proves HTTP Basic client authentication and absence of `client_secret` from the token request body.
- [x] `allowInsecureRequests` is supplied through discovery `execute` only for validated development/test loopback HTTP issuers.
- [x] Production HTTP issuers and development/test non-loopback HTTP issuers are rejected before OIDC discovery rather than weakening transport security.
- [x] HTTPS issuers never receive the insecure-request opt-in.
- [x] Local integration tests prove discovery and the full Authorization Code flow against `http://127.0.0.1:9090` while preserving explicit `ClientSecretBasic`.
- [x] Node 24/CommonJS interoperability with the ESM `openid-client` package is explicitly verified without changing the Phase 1 module system.
- [x] Deferring first-party passwords avoids unnecessary credential/security scope.
- [x] Deferring hosted vendor-specific auth avoids unnecessary provider coupling.
- [x] Deferring full framework-managed auth keeps NestJS and Aevum's schema/ownership boundary authoritative.
- [x] Exactly one OIDC issuer/client is supported by a running Phase 2 backend.
- [x] OIDC scope is deliberately limited to `openid`.
- [x] Aevum registration is correctly modeled as first-successful-auth internal provisioning rather than a separate registration feature.
- [x] The exact external identity key `(issuer, subject)` is correct and compliant with the ownership requirement.
- [x] Email/display name/profile attributes are correctly excluded from reconciliation and persistence.
- [x] UUID v4 is appropriate for stable internal Aevum user IDs.
- [x] The race-safe first-login flow is sufficiently deterministic: candidate user + `INSERT ... ON CONFLICT (issuer, subject) DO NOTHING`, explicit winner/loser branches, same resolved user, and no orphan candidate.
- [x] Different external identities never auto-link based on matching email/name.
- [x] The four-table identity/auth schema is minimal and sufficient.
- [x] `unique(user_id)` on `auth_identities` correctly enforces Phase 2's one-identity-per-user boundary.
- [x] One node-pg-migrate migration for the Phase 2 identity foundation is appropriate.
- [x] Rollback preserves Phase 1 pgvector foundation.
- [x] The opaque 256-bit Aevum session + SHA-256 database hash design is acceptable.
- [x] A fixed 24-hour non-sliding session lifetime is appropriate for this foundation.
- [x] Local logout-only provider behavior is acceptable; RP-initiated OIDC logout remains deferred.
- [x] HttpOnly/SameSite=Lax cookie attributes are appropriate for the redirect-based OIDC flow.
- [x] Authentication tokens are correctly excluded from localStorage/sessionStorage.
- [x] The login-transaction cookie/table design sufficiently protects state/nonce/PKCE flow state.
- [x] `expires_at` correctly enforces a hard 600-second authentication-validity boundary while physical expired-row deletion is callback/opportunistic rather than falsely guaranteed at exactly ten minutes.
- [x] No scheduler, queue, cron job, or background worker is introduced solely to clean expired login transactions.
- [x] Provider access tokens, refresh tokens, raw ID tokens, UserInfo, email, names, and avatars are correctly not persisted.
- [x] The trusted `AuthenticatedPrincipal { userId, sessionId }` is sufficient for future domain ownership.
- [x] `SessionAuthGuard` correctly makes server session context—not client `user_id`—the owner source.
- [x] `GET /api/users/me` returning only `userId` is sufficient for Phase 2.
- [x] The exact 401/403/503 authentication contracts are appropriate.
- [x] Logout CSRF protection using exact Origin + non-simple `X-Aevum-CSRF` header is sufficient for the only Phase 2 authenticated mutation.
- [x] CORS may be narrowly changed to `credentials: true` for the exact configured frontend origin.
- [x] The existing `/api/system/status` remains unchanged/public.
- [x] OIDC configuration variables and validation are sufficiently explicit.
- [x] The local test-only `oidc-provider@9.12.2` fixture is justified for vendor-neutral reproducibility.
- [x] The test OIDC provider is correctly excluded from production application code.
- [x] No Phase 2 application-level rate limiter is required because Aevum does not accept credentials directly; production anti-abuse remains deferred.
- [x] The exact NestJS AuthModule/IdentityModule structure is small enough and non-speculative.
- [x] The frontend `/signin` and `/me` routes are sufficient without building a dashboard/profile system.
- [x] No Next.js middleware is relied upon as the security boundary.
- [x] Real PostgreSQL integration tests sufficiently prove ownership/reconciliation/race behavior.
- [x] Real OIDC integration tests sufficiently prove protocol success/failure behavior.
- [x] Playwright Chromium is justified for redirect/cookie browser E2E.
- [x] The clean migration/rollback/remigration procedure is sufficient.
- [x] Phase 1 regressions are explicitly required.
- [x] All 56 acceptance criteria are testable.
- [x] The Definition of Done is complete and reviewable.
- [x] Goals, Journal, Memory, Chat, profiles, roles, MFA, multiple providers, AI, queues/caches, and production deployment remain outside scope.
- [x] The READY_FOR_BUILD checkpoint correctly records `SPEC_APPROVED`, `READY_FOR_BUILD`, and BUILD `NOT_STARTED`; implementation begins only after a later explicit Codex BUILD instruction.

**SPEC review result:** `APPROVED`

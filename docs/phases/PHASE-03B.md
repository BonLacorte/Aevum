# Phase 3B — Aevum Core System Design

Status: `HISTORICAL_PLAN_COMPLETE`  
Migration: `RECOVERED`  
Build eligibility: `NOT_READY_FOR_BUILD`  
Parent: `Phase 3 — AI Fundamentals`

## Purpose

Phase 3B converted the AI concepts learned in Phase 3A into Aevum-specific system architecture. It defined the major domain models, memory lifecycle, retrieval design, AI subsystem boundaries, service/API boundaries, privacy principles, and evaluation strategy that later implementation should inherit.

The eight historical sub-phases remain conceptually separate below even though they are consolidated into this single repository file.

This document records **historical planning**, not implementation-ready specifications. Concrete endpoints, framework classes, database migrations, provider SDK calls, thresholds, evaluation fixtures, secrets handling, and deployment details must still pass through PSB SPEC before BUILD.

## Historical-versus-current architecture rule

Some historical Phase 3 planning examples were written against the architecture that existed at that point in the original planning conversation. If a technology-specific historical example conflicts with a later active repository decision, the current source-of-truth hierarchy applies:

1. active decisions/ADRs;
2. active phase SPEC;
3. current architecture/product documents;
4. this historical planning reference.

The durable domain and AI-design decisions below remain useful even when an implementation mechanism is later superseded.

---

## 3B.1 — Aevum Memory Architecture

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** Phase 3A, especially 3A.10 Structured Outputs and 3A.11 AI Memory

### Objective

Turn the conceptual idea of AI memory into the first concrete Aevum Memory Engine architecture: what becomes a Memory, what must not be remembered, how sources and interpretations differ, how duplicates/changes/corrections are handled, and how memories become retrievable.

### Core domain distinction

Aevum established **Source before interpretation**:

- **Source** — what the user actually provided;
- **Memory** — Aevum's durable structured interpretation of useful personal information;
- **Goal** — what the user wants;
- **Pursuit** — what the user is doing;
- **Insight** — a model-generated interpretation across evidence, not automatically durable personal truth.

Primary V1 source classes were chat messages, journal entries, and manual memory entry. Future sources such as email, calendar, files, photos, voice, or GitHub were deferred.

### Locked historical decisions

1. **Memory is a distinct domain object**, separate from Sources, Goals, Pursuits, and future Insights.
2. V1 Memory types are:
   - `PROFILE`
   - `STATE`
   - `PREFERENCE`
   - `DECISION`
   - `EVENT`
   - `LEARNING`
3. Goals and Pursuits are first-class entities, not Memory types.
4. AI-generated Insights are not durable user facts unless the user later confirms them.
5. Memories are **atomic**, **self-contained**, and stored in canonical wording suitable for later retrieval.
6. Every AI-extracted Memory requires source provenance; one Memory may have multiple sources and one source may yield multiple domain interpretations.
7. V1 authority levels are:
   - `USER_CREATED`
   - `USER_CONFIRMED`
   - `AI_EXTRACTED`
8. V1 stability levels are:
   - `DURABLE`
   - `MUTABLE`
   - `TEMPORARY`
9. Memory lifecycle states are:
   - `ACTIVE`
   - `SUPERSEDED`
   - `ARCHIVED`
   Deletion is an actual removal operation rather than another ordinary lifecycle state.
10. **Change and correction are different**:
    - change preserves a previously true state as history;
    - correction repairs/removes an interpretation that was never true.
11. Equivalent repeated statements reinforce an existing Memory instead of creating duplicate rows.
12. The extractor receives the current source plus only enough nearby context to resolve references; it does not ingest the user's entire history.
13. Assistant messages may provide conversational context but are not primary evidence of user truth.
14. The model produces **MemoryCandidates**; deterministic Aevum services decide what becomes persisted Memory.
15. Explicit commands such as "remember this", "don't remember this", "forget X", and "update that" receive deterministic special handling.
16. Embeddings are rebuildable retrieval infrastructure, not source-of-truth data.
17. V1 favors **conservative memory formation** over aggressive uncertain inference.
18. Memory quality should be evaluated separately from retrieval quality and final generation quality.

### Memory formation rules

The extractor should generally reject greetings, filler, generic questions, uncommitted hypotheticals, roleplay, fictional scenarios, assistant suggestions, copied material that is not autobiographical, and incidental details with little likely future value.

Third-party information may be relevant, but subject/relationship identity must be preserved. A statement about another person must never be transformed into a claim about the user.

MemoryCandidates should express a coherent durable semantic claim. Pronouns or context-dependent phrases such as "use it" are unsuitable as standalone long-term memories unless normalized into a self-contained claim.

### Comparison/lifecycle outcomes

Historical comparison outcomes included:

- `NEW`
- `REINFORCES`
- `UPDATES`
- `SUPERSEDES`
- `RELATED`
- `IGNORE`

Explicit user correction is handled separately because user authority is stronger than ordinary semantic comparison.

### Automatic-memory pipeline

The historical architecture defined this flow:

```text
user message / journal
→ save raw source
→ check deterministic memory policy
→ background extraction job when enabled
→ build small extraction context
→ LLM structured MemoryCandidate[]
→ schema validation
→ semantic/domain validation
→ normalize / atomicize
→ compare with existing memories
→ create / reinforce / update / supersede
→ attach provenance
→ generate embedding
→ ready long-term memory
```

If embedding generation fails, the durable source must not disappear. The system may keep a valid Memory pending semantic indexing while background processing retries.

### User-control principles

- "Don't remember this" can disable durable extraction without preventing immediate conversational understanding.
- "Forget X" should remove relevant structured long-term memories from future memory use; it should not silently delete original chat/journal sources unless the user also requests source deletion.
- Memory extraction and memory retrieval are separate controls.
- Deterministic settings should prevent unnecessary AI calls rather than calling a model and discarding the result.
- `userId`/ownership is always derived from authenticated application context, never generated by AI.

### Service responsibilities identified

The first conceptual Memory Engine included responsibilities equivalent to:

- source capture;
- memory extraction;
- memory validation;
- memory comparison;
- lifecycle handling;
- memory persistence;
- evidence/provenance;
- embeddings;
- later retrieval.

### Explicitly deferred

V1 does not require:

- a graph database;
- a multi-agent memory curator;
- automatic personality models;
- complicated ontologies;
- reinforcement-learning memory policy;
- dozens of memory types;
- automatic psychological profiling;
- autonomous memory rewriting.

The priority is **good extraction, provenance, lifecycle, correction, and semantic retrieval**.

### Expected outcome

Aevum has a concrete, conservative, source-backed Memory Engine model that can maintain changing personal truth without turning every message into permanent memory.

### Historical completion criterion

The phase was complete once memory formation, authority, provenance, lifecycle, correction, deduplication, embedding, and user-control rules were explicitly defined.

---

## 3B.2 — Goals & Pursuits Model

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1

### Objective

Define first-class structures for **what the user wants** and **what the user is doing**, while avoiding the earlier developer-centric assumption that every meaningful life activity is a "Project".

### Core definitions

**Goal**  
A desired future outcome, state, achievement, or direction the user intentionally wants to pursue.

**Pursuit**  
Something the user actively does, practices, builds, studies, maintains, or works on over time.

The central model became:

```text
GOAL
what I want

PURSUIT
what I am doing

MEMORY
what happened / what Aevum learned
```

### Product decisions

Aevum is not a rigid SMART-goal, todo, habit-streak, or project-management application.

Goals may be measurable or directional. A Goal is not a task. Tasks, subtasks, checklists, kanban, task dependencies, and full todo behavior were explicitly excluded from the V1 core.

Goals and Pursuits are independently valid:

- a Goal may have zero Pursuits;
- a Pursuit may exist without any Goal;
- one Goal may have many Pursuits;
- one Pursuit may support several Goals.

The Goal ↔ Pursuit relationship is therefore many-to-many.

The existence of a link does **not** imply a numerical progress percentage. Progress should be described using real evidence such as relevant memories, events, user reflections, Pursuit activity, and status changes. Aevum V1 should not fabricate "83% complete" for qualitative goals.

### Pursuit taxonomy

The historical V1 taxonomy was:

- `PROJECT`
- `ACTIVITY`
- `HABIT`
- `ROUTINE`
- `LEARNING`
- `PRACTICE`
- `OTHER`

These are types of the same core Pursuit entity rather than separate tables/domain systems.

"Pursuit" is useful internal architecture terminology, but the UI should normally use natural labels such as Project, Learning, Practice, Routine, or "Ways I'm working on this". A dedicated Pursuits primary-navigation item was intentionally not required for V1.

### Conceptual status model

Historical Pursuit states included:

- `ACTIVE`
- `PAUSED`
- `COMPLETED`
- `STOPPED`

The model stays flexible across Pursuit types instead of enforcing artificial type/status combinations.

Goal status details were defined at the domain-design level, including the distinction between preserving an abandoned historical Goal and deleting a Goal that should never have existed.

### Creation authority

Formal entities should be created conservatively.

Strong creation signals:

- manual UI creation;
- explicit conversational commands;
- explicit statements such as "My goal is...".

General desires such as "I'd like to..." should not silently become formal Goals. AI may suggest that something be tracked as a Goal or Pursuit, but user confirmation is preferred when the relationship/entity is only inferred.

Similarly:

- an explicit Goal ↔ Pursuit relationship stated by the user may be persisted;
- a merely semantically plausible relationship should be suggested rather than silently made authoritative.

The historical relationship authority model mirrored Memory authority with concepts such as user-created, user-confirmed, and AI-extracted.

### Goal–Pursuit–Memory triangle

The planning established three first-class relationships:

- Goal ↔ Pursuit;
- Goal ↔ Memory;
- Pursuit ↔ Memory.

Explicit relationships should provide grounded evidence of progress. Memories continue to exist even if a Goal or Pursuit is removed; deleting a relationship/entity must not erase unrelated historical truth.

### Data/UX principles

Conceptual Goal data included title, optional description, `why`, status, optional target date, timestamps, and optional completion timing.

The `why` field was considered especially valuable because Aevum should preserve why a goal mattered, not merely the label.

Conceptual Pursuit data included type, title, optional description, status, start/end timing, and timestamps. Creation time and real-world start time are separate.

Goal/Pursuit labels should preserve the user's natural wording instead of rewriting them into corporate language.

Duplicate Goals/Pursuits should be handled semantically in application logic; exact string uniqueness cannot solve semantic duplication.

Domain changes triggered from Chat/AI tools and from normal UI should call the **same deterministic domain services**, avoiding separate chat-specific persistence logic.

### Explicitly deferred

- nested Goals;
- nested Pursuits;
- full task management;
- streak tracking;
- timesheets;
- kanban/project-management suite;
- mandatory schedules;
- OKRs/KPI dashboards;
- fake automatic success scores;
- automatic restructuring of the user's life;
- silently creating entities from vague wishes;
- silently linking everything based only on embeddings.

### Expected outcome

Aevum gains a general-purpose life model that can express intention, ongoing effort, and evidence without forcing all users into project-management terminology.

### Historical completion criterion

The phase was complete once Goal, Pursuit, Memory, their relationships, creation authority, lifecycle/deletion principles, and non-goals were clearly separated.

---

## 3B.3 — Database & ERD Design

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1, 3B.2

### Objective

Translate the Memory, Goal, Pursuit, conversation, journal, provenance, and embedding concepts into a coherent relational PostgreSQL data model with strong per-user isolation.

### Core V1 domain structure established

The historical ERD included the following conceptual areas:

```text
User / application settings

Conversation
└── Message

JournalEntry

Memory
├── MemorySource
└── MemoryEmbedding

Goal
Pursuit
└── GoalPursuit

MemoryGoal
MemoryPursuit
```

Authentication-provider-specific tables existed in the historical working architecture, but authentication implementation is governed by the current repository architecture/decisions and must be re-specified before BUILD.

### Durable data-model decisions

**PostgreSQL is the primary system of record.** pgvector participates in the same data architecture rather than requiring a separate vector database by default.

Major user-owned domain records should be directly scoped with `user_id`, even where ownership could theoretically be inferred through a parent. This deliberate redundancy enables:

- safer/simple authorization queries;
- strong indexing;
- future policy enforcement;
- database constraints that prevent cross-user parent/child or relationship links.

Cross-user provenance or Goal/Pursuit/Memory relationships should be structurally impossible, not merely prevented by UI code.

Domain object IDs were planned as UUIDs.

Application settings include privacy/behavior settings such as separate controls for:

- memory extraction/storage;
- using saved memories in chat;
- user timezone.

Timezone is part of temporal correctness because relative language such as "yesterday" or "last Friday" depends on it.

A giant user `profile` row was rejected as the place for arbitrary personal facts. Account identity belongs to the account/user domain; evolving personal understanding belongs primarily in Memories and related first-class domain objects.

### Provenance model

`MemorySource` was designed as a many-to-many evidence layer:

- one Memory may have multiple source records;
- one source may support multiple Memories;
- duplicate attachment of the same source to the same Memory should be prevented;
- source links must preserve `user_id` ownership consistency.

The historical plan favored relational integrity rather than a loose generic source pointer that cannot enforce ownership/FKs.

### Embedding model

Embeddings were separated from Memory domain content because embeddings are **derived technical search data**.

This allows:

- re-embedding with a new model;
- temporary coexistence of old/new vectors during migrations;
- explicit model/dimension metadata;
- an "active" embedding concept;
- semantic infrastructure to be rebuilt from canonical Memory content.

At most one embedding should normally be active for a Memory at a time, while migration can temporarily hold multiple versions.

### Temporal data principles

Aevum must not invent temporal precision.

Historical planning included a concept such as:

- `occurred_on`;
- an occurrence precision (`DAY`, `MONTH`, `YEAR`, `APPROXIMATE`).

The V1 plan intentionally avoided a complex full temporal-validity interval model. Lifecycle timestamps, occurrence date/precision, source timestamps, and supersession metadata were considered sufficient for the first version.

### Deletion and independence rules

- deleting a Memory removes dependent provenance/vector/relationship rows but does not delete source Messages, Journal entries, Goals, or Pursuits;
- deleting a Goal removes Goal relationships but not independent Pursuits or Memories;
- deleting a Pursuit removes relationship rows but not Goals/Memories;
- deleting a source can trigger lifecycle logic for AI-extracted Memories that no longer have evidence;
- user-created/user-confirmed memories may have different survival rules because their authority is not identical to pure extraction.

Deleting a Goal/Pursuit source pointer should not automatically delete the formal user-facing entity.

### Semantic duplicates are not SQL uniqueness

A database unique constraint cannot reliably identify that "backend developer" and "backend engineer" are the same semantic concept. Semantic duplicate detection remains application/AI/domain logic.

Database uniqueness is still appropriate for structural duplicates such as repeated relationship/source rows.

### Historical implementation-note supersession

The original Phase 3B.3 discussion referenced contemporaneous ORM/authentication tooling. Those specific mechanisms do **not** override the current accepted repository architecture. The durable decisions migrated here are the relational model, ownership, provenance, temporal, embedding, integrity, and deletion principles.

### Explicitly deferred

- dedicated Timeline table until its need is demonstrated;
- graph database;
- premature denormalized personal-profile schema;
- semantic uniqueness enforced by text constraints;
- advanced temporal interval modeling;
- vector indexing complexity before scale requires it.

### Expected outcome

Aevum has a relational ERD foundation capable of storing source-backed, user-isolated, temporally meaningful personal context and semantic-search infrastructure without erasing domain boundaries.

### Historical completion criterion

The phase was complete once core entities, ownership/integrity rules, provenance, embeddings, temporal precision, relationships, and deletion semantics were defined clearly enough to inform later database SPEC work.

---

## 3B.4 — Retrieval / RAG Architecture

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1–3B.3

### Objective

Define exactly how Aevum should decide **which parts of a person's stored context the AI should receive for a request**, and separate retrieval quality from memory quality and generation quality.

### Central architectural distinction

The Memory Engine answers:

> **What does Aevum know?**

The Retrieval Engine answers:

> **What should the AI know right now?**

Retrieval operates over **Personal Context**, not only the Memory table.

Personal Context includes at least:

- recent conversation;
- Memories;
- Goals;
- Pursuits;
- source evidence;
- Journal information when specifically needed.

### Core retrieval pipeline

```text
user request
→ recent conversation context
→ context-need analysis
→ no personal retrieval OR retrieval intent
→ domain retrieval (Memories / Goals / Pursuits / sources)
→ candidate context
→ lifecycle/time rules
→ Aevum-aware ranking
→ optional source expansion
→ token/context budget
→ Prompt Builder
→ LLM
```

### Locked historical decisions

1. General Chat uses a **Context Need Analyzer** to decide whether personal retrieval is useful.
2. Product surfaces that already know the required object/context should skip unnecessary AI routing and retrieve deterministically.
3. Initial retrieval intents include:
   - `GENERAL`
   - `PERSONAL_CURRENT`
   - `PERSONAL_RECALL`
   - `PERSONAL_HISTORICAL`
   - `PERSONAL_REFLECTION`
4. The analyzer returns semantic retrieval intent, never raw SQL.
5. A high-level Personal Context Retrieval service orchestrates domain-specific retrieval.
6. `user_id` ownership filtering is mandatory **before** personal semantic retrieval.
7. Current-state retrieval uses `ACTIVE` Memories by default.
8. `SUPERSEDED` Memories are included for historical/change-over-time requests.
9. `ARCHIVED` Memories should not influence ordinary chat retrieval.
10. Initial Memory semantic search uses **exact pgvector**, not ANN.
11. Vector search returns candidates, not final model context.
12. Top-K/final counts are centralized configurable parameters rather than scattered constants.
13. Initial planning expected roughly a small candidate set and a smaller final context set, but exact values must be tuned by evaluation rather than frozen historically.
14. A minimum relevance mechanism is required; the numeric value is empirical.
15. If evidence is insufficient, Aevum should say so rather than fabricate history.
16. Metadata can be hard filters or soft ranking signals.
17. Current versus historical behavior is intent-aware.
18. Recency is a signal, not a universal rule that old information is irrelevant.
19. V1 does not initially require Goal or Pursuit embeddings.
20. Goals/Pursuits are first retrieved through status, text, and explicit relationships.
21. **Explicit domain relationships outrank inferred semantic similarity.**
22. Explicitly linked Memories are first-class candidates for Goal/Pursuit queries.
23. V1 begins with vector + metadata retrieval; PostgreSQL lexical/full-text retrieval may follow after a baseline.
24. No LLM reranker is required initially; deterministic Aevum-aware ranking comes first.
25. Ranking may consider semantic relevance, lifecycle status, authority, explicit relationships, recency, type, and importance.
26. Source expansion is conditional rather than automatic.
27. Normal retrieval prefers concise Memories; sources are expanded when exact wording, detail, or stronger evidence is needed.
28. Chat source expansion uses a small surrounding-message window rather than an entire conversation when possible.
29. Journal retrieval initially uses the Journal entry rather than requiring immediate chunk-level embedding.
30. Messages and Journals are not individually embedded in the first RAG version.
31. Aevum should not collapse every personal object into one giant undifferentiated vector table.
32. Query rewriting is used only when the request is ambiguous/conversation-dependent.
33. Query rewriting may be incorporated into the same Context Need operation rather than forcing another model call.
34. Multi-query retrieval is deferred until evaluation shows a real compound-query recall problem.
35. Historical/reflection retrieval may need temporal and semantic diversity instead of near-duplicate evidence.
36. Retrieval Service, Context Builder, and Prompt Builder remain separate responsibilities.
37. Context is labeled semantically (for example current memories, historical memories, goals, pursuits, sources).
38. Current versus historical information must be distinguishable to the LLM.
39. Context construction is token-budget/priority driven and removes low-value evidence semantically rather than blind text truncation.
40. Some personal requests use deterministic domain queries without an LLM.
41. Chat, Search, Timeline, Today, and StoryOfMe may share infrastructure but use different retrieval profiles.
42. Chat prioritizes precision; Search may favor recall; narrative/historical experiences require greater coverage/diversity.
43. Retrieval should minimize unnecessary personal information sent to an external model.
44. Retrieval is observable through safe metadata such as intent, candidate/selected counts, latency, and context-token usage without logging unnecessary sensitive text.
45. V1 prioritizes **simple, measurable RAG before advanced RAG**.

### Product-specific retrieval observations

- Goal progress should begin with explicit Goal ↔ Pursuit/Memory relationships, then use semantic search to fill gaps.
- Timeline is primarily a structured chronological view, not automatically a free-form RAG task.
- Today can use deterministic active Goals/Pursuits plus selected recent context.
- Search can share retrieval infrastructure with Chat while using a higher-recall profile.
- StoryOfMe/reflection can later use broader temporal coverage and diversity.

### Explicitly deferred

- separate vector database;
- HNSW/IVFFlat by default;
- graph-database traversal;
- Goal/Pursuit embeddings in the first version;
- message/journal chunk embeddings in the first version;
- neural/LLM reranker;
- multi-query retrieval;
- agent-based retrieval planner;
- automatic knowledge-graph expansion;
- advanced RAG complexity before evaluation proves need.

### Expected outcome

Aevum gains a retrieval architecture that can choose a small, high-quality, time-aware set of personal evidence instead of treating "retrieve everything" as personalization.

### Historical completion criterion

The phase was complete once routing, lifecycle filtering, candidate generation, ranking, source expansion, context budgeting, observability, and deferment of advanced RAG were explicitly decided.

---

## 3B.5 — AI System Design

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED_SUMMARY`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.4

### Objective

Define Aevum's AI subsystem as a set of explicit, specialized operations and infrastructure boundaries rather than one giant generic model call.

### V1 AI operations established

The completed historical plan converged on **five primary V1 AI operations**:

1. **Context Need Analysis** — interpret a request and determine whether/what personal retrieval is appropriate.
2. **Chat Generation** — produce the human-facing grounded conversational response from approved context.
3. **Memory Extraction** — convert source language into structured MemoryCandidates.
4. **Memory Comparison** — classify how a candidate relates to existing Memories (for example new/reinforcing/updating/superseding/related).
5. **Embedding Generation** — create semantic vectors for approved retrieval content.

Conversation summarization and richer Reflection/Insights were discussed as later operations rather than mandatory members of the first implementation core.

### Architectural decisions and principles

AI operations should have **specialized boundaries** and contracts. The application should not expose one unrestricted `AIService.askAnything()` that hides different security, latency, output, retry, and evaluation requirements.

The historical design called for:

- thin AI-provider abstractions so domain/application code does not depend directly on provider response objects;
- operation-specific prompt contracts;
- structured-output schemas for machine-facing operations;
- independently versioned **prompt, schema, and model** metadata for evaluation/debugging;
- clear distinction between **streaming interactive work** and non-streaming machine-facing operations;
- separation of **web/request responsibilities** from **background worker responsibilities**;
- retry/failure policies appropriate to the operation;
- idempotency where retried background work could otherwise create duplicate effects;
- token, latency, failure, and cost observability without unnecessary sensitive-prompt logging.

Interactive chat belongs on a user-facing request path; memory extraction, embedding generation, summarization, and similar durable post-processing are natural worker/background responsibilities when they do not need to block the response.

### Deterministic boundary

The phase reaffirmed that LLMs must **never** be the authority for:

- authentication;
- authorization;
- user ownership;
- database invariants;
- persistence integrity;
- explicit user settings;
- deterministic validation/business rules;
- destructive side-effect guarantees.

Where the application already knows the correct rule, it should not ask AI to decide it.

### Provider/model strategy

A provider abstraction exists to isolate provider-specific APIs, not to pretend all models are identical. Model choice may vary by operation later, but early implementation should favor debuggability over excessive routing complexity.

Exact provider/model choices remain a later SPEC concern under current repository authority.

### Expected outcome

Aevum has an intelligible intelligence layer between domain services and external models, with explicit AI operations, structured machine-facing contracts, versioning, worker/web separation, and measurable failure/cost behavior.

### Deferred / unresolved for later SPEC

- exact provider/model;
- provider SDK/API syntax;
- exact prompt/schema files;
- model routing/fallback strategy;
- streaming transport;
- retry counts/backoff;
- conversation-summarization policy;
- Reflection/Insight implementation.

### Historical completion criterion

The phase was complete once the AI subsystem could be decomposed into named operations with explicit responsibilities and deterministic boundaries rather than a generic model-call utility.

---

## 3B.6 — API & Service Design

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED_SUMMARY`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1–3B.5

### Objective

Define how Aevum's product domains, AI subsystem, web/API layer, persistence, and background work communicate while keeping business rules centralized and avoiding premature distributed-system complexity.

### Historical architecture direction

The completed plan favored a **modular-monolith service architecture** for the initial Aevum system rather than prematurely splitting the product into microservices.

The important boundary is logical responsibility:

```text
UI / conversational tool / API
→ application/domain service
→ repositories / AI operations / jobs
→ PostgreSQL or external provider
```

The API/controller layer should remain thin. It translates transport input/output and authenticated context; it should not become a second location for domain rules.

### Service principles established

- Domain behavior is owned by reusable application/domain services.
- The normal UI and AI/tool-triggered actions use the **same services**.
- Chat must not implement a separate database-update path for Goals, Pursuits, Memories, or settings.
- Repositories/persistence adapters encapsulate data access; callers should not receive raw database authority.
- AI-provider-specific objects stay behind the AI integration boundary.
- Ownership and authorization are derived/validated server-side before domain data is read or mutated.
- Structured input validation occurs at trusted application boundaries.
- Background workers execute retryable asynchronous operations such as extraction/embedding where appropriate; interactive web paths should not block unnecessarily on durable post-processing.
- Jobs that can be retried must be designed to avoid duplicate domain effects.
- Service contracts should make dependencies explicit enough to unit/integration test without invoking unrelated infrastructure.

### API philosophy

The historical plan focused on domain-oriented capabilities rather than exposing infrastructure primitives. External/client contracts should represent Aevum concepts and use cases.

Raw operations such as arbitrary SQL execution or unrestricted provider calls do not belong in the public/service API surface.

No commitment was made here to expose every domain operation publicly. Internal application services and external HTTP/API contracts are related but not identical concepts.

### Explicitly deferred / unresolved for later SPEC

The historical phase did **not** require freezing every concrete endpoint before implementation. Later SPEC must establish:

- concrete route names and HTTP methods;
- request/response DTOs;
- pagination conventions;
- error envelope;
- API versioning policy if needed;
- framework package/module layout;
- authentication mechanism;
- transaction boundaries per use case;
- worker/job contract details.

### Expected outcome

Aevum has a modular, testable service topology where deterministic domain logic is reused by UI, AI tools, and background jobs without duplicating business rules or requiring microservices.

### Historical completion criterion

The phase was complete once service ownership, transport/domain separation, shared service use, asynchronous responsibility, and modular-monolith boundaries were established.

---

## 3B.7 — Security & Privacy Architecture

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED_SUMMARY`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1–3B.6

### Objective

Treat personal-data safety as a first-class Aevum architecture concern, especially because the product may store intimate long-term context and selectively send some of it to external AI systems.

### Historical privacy principle

The completed planning summarized the Aevum privacy posture as:

> **Store intentionally. Access narrowly. Retrieve selectively. Send minimally. Explain provenance. Allow correction. Honor deletion.**

This is an architectural constraint, not merely a privacy-policy statement.

### Security/privacy decisions and principles

**Store intentionally**
- Conservative Memory formation is preferred to indiscriminate extraction.
- Explicit "do not remember" and memory settings can prevent durable processing.
- The product should avoid accumulating personal data simply because storage is technically possible.

**Access narrowly**
- Every personal operation is scoped to the authenticated user.
- Ownership is enforced in application/database boundaries, not by model instructions.
- Cross-user relationships/provenance must be prevented structurally where possible.
- AI does not receive arbitrary infrastructure or database access.

**Retrieve selectively**
- Retrieval uses the smallest relevant set of personal evidence.
- Lifecycle status, intent, and explicit domain relationships constrain what can influence a response.
- Archived/irrelevant history should not leak into normal chat simply because it exists.

**Send minimally**
- External-model calls receive only the personal context required for the operation.
- General questions should not carry unrelated private history.
- Provider/model boundaries, retention behavior, and data handling must be explicit when a concrete provider is selected.

**Explain provenance**
- AI-extracted Memories remain linked to source evidence.
- Aevum should preserve the distinction between user-provided source, stored interpretation, and AI-generated response/Insight.
- Grounded personal answers should retain enough provenance to be inspectable where the product requires it.

**Allow correction**
- User authority overrides model confidence.
- Incorrect Memory interpretation can be corrected or removed.
- Change and correction remain distinct to prevent false history.

**Honor deletion**
- Structured Memory deletion, source deletion, and entity/history deletion are distinct operations.
- The system must not silently keep deleted personal information active through vectors, indexes, caches, or retrieval paths.
- Broader deletion behavior must be explicit rather than guessed.

### Additional AI security principles

Retrieved/pasted content is untrusted data, not privileged instructions. Prompt injection defenses require deterministic permission boundaries, tool restrictions, validation, and isolation in addition to prompt design.

Secrets such as AI-provider credentials, database credentials, or other infrastructure credentials remain server-side and outside model-visible context.

Logs/traces should record enough metadata to debug AI/retrieval behavior without unnecessarily retaining sensitive source or prompt content.

### Explicitly unresolved for later SPEC

- concrete authentication implementation;
- local-versus-cloud deployment boundary;
- provider data-retention configuration;
- encryption/key-management implementation;
- exact retention periods;
- backup/deletion propagation details;
- regulatory/compliance requirements if Aevum becomes a public hosted product;
- consent UX for future external integrations.

### Expected outcome

Aevum has a privacy-by-architecture posture in which personal information is intentionally stored, strongly scoped, selectively retrieved, minimally exposed to models, explainable, correctable, and deletable.

### Historical completion criterion

The phase was complete once security/privacy was represented as enforceable system boundaries across storage, retrieval, model calls, provenance, correction, deletion, and observability.

---

## 3B.8 — AI Evaluation Architecture

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED_SUMMARY`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3B.1–3B.7

### Objective

Define how Aevum will measure AI-system quality component by component rather than judging the product only by whether a final answer "sounds good".

### Layered evaluation model established

The completed historical plan defined evaluations at multiple layers:

1. **Memory Extraction**
2. **Memory Comparison / lifecycle classification**
3. **Retrieval**
4. **Context construction**
5. **Generation / grounded answer**
6. **End-to-end Aevum scenarios**

This separation is essential because a bad answer can originate from a missing Memory, failed retrieval, poor context selection, or generation error. Evaluation should localize the failure.

### Memory/extraction evaluation principle

Aevum should be **precision-first where false personal memories are dangerous**.

Negative examples are as important as positive ones. The evaluation corpus should include cases that must **not** become durable user truth, such as:

- hypotheticals;
- questions;
- third-party facts misattributed to the user;
- roleplay/quoted content;
- vague wishes that are not formal Goals;
- assistant suggestions without user confirmation.

Evaluation should distinguish structure validity from semantic correctness. Exact enums/relationships may use exact-match evaluation while normalized natural-language content may require semantic judgment.

### Comparison/lifecycle evaluation

Tests should assess whether new evidence is correctly classified as:

- new;
- reinforcement;
- update;
- supersession;
- related;
- ignore;
- explicit correction when applicable.

The system must especially avoid treating a correction as historical change or creating duplicate memories from reinforcement.

### Retrieval evaluation

Historical retrieval metrics included concepts such as:

- **Recall@K**;
- **MRR / rank quality**;
- Top-K success;
- precision/relevance;
- correct inclusion/exclusion by lifecycle/time intent;
- no-answer/insufficient-evidence behavior.

Retrieval tests should verify ownership filtering and that explicit domain relationships/lifecycle rules affect candidate selection as designed.

### Generation / grounding evaluation

The final answer should be assessed for:

- groundedness in supplied Aevum evidence;
- factual answer correctness;
- correct use/representation of sources;
- hallucination/unsupported personal claims;
- appropriate "insufficient information" behavior;
- temporal correctness;
- respect for current versus superseded information.

### System/operational metrics

Quality must be balanced with practical engineering metrics including:

- latency;
- token usage;
- model/API cost;
- number of AI/tool steps where relevant;
- failure/retry rates.

For agentic workflows later, evaluation should also consider unnecessary actions, permissions, stopping behavior, and tool efficiency.

### Version-aware evaluation

Prompt, schema, model, retrieval configuration, and other AI-system changes should be observable/versioned so regressions can be attributed rather than guessed.

A baseline should be established before advanced RAG/model complexity is added. Improvements should target measured failure modes.

### Expected outcome

Aevum gains an evaluation architecture capable of answering **which layer failed, whether quality improved, and what the improvement cost in latency/tokens/money**, rather than relying on subjective demonstrations.

### Deferred / unresolved for later SPEC

- concrete golden datasets;
- test/eval framework and storage format;
- threshold/pass criteria;
- exact Recall@K/MRR targets;
- model-graded versus deterministic evaluation mix;
- CI gating policy;
- production feedback/eval sampling;
- privacy rules for retained evaluation examples.

### Historical completion criterion

The phase was complete once extraction, comparison, retrieval, context, generation, and end-to-end quality had explicit evaluation layers and measurable quality/operational metrics.

---

## Phase 3B historical outcome

Phase 3B completed the first cohesive Aevum Core System Design:

```text
source-backed Memory Engine
+ Goal / Pursuit domain model
+ PostgreSQL / pgvector relational data architecture
+ Personal Context retrieval / RAG
+ specialized AI subsystem
+ modular-monolith service/API boundaries
+ privacy/security architecture
+ layered AI evaluation architecture
```

Historical planning expansion intentionally stops at **Phase 3B.8** for Repository Baseline v1. No Phase 3B.9 is introduced here.

The track is **historically planned but not BUILD-ready**. Future implementation must convert the relevant slice into PSB SPEC with concrete APIs, schemas, versions, tests, acceptance criteria, and Definition of Done.

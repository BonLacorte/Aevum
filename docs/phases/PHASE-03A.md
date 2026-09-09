# Phase 3A — AI Fundamentals

Status: `HISTORICAL_PLAN_COMPLETE`  
Migration: `RECOVERED`  
Build eligibility: `NOT_READY_FOR_BUILD`  
Parent: `Phase 3 — AI Fundamentals`

## Purpose

Phase 3A established the AI-engineering concepts and product principles that later Aevum architecture depends on. It was a planning and learning track rather than an implementation release.

The eleven historical sub-phases remain distinct below. Their planning content is preserved here so future contributors can understand why later Aevum architecture uses concepts such as retrieval, structured outputs, provenance, memory lifecycles, tool boundaries, and controlled AI autonomy without reopening the historical planning conversation.

These sections are **historical planning references, not BUILD specifications**. Concrete provider choices, API schemas, class names, thresholds, model names, tests, and implementation details must still be defined through PSB SPEC when a corresponding implementation slice becomes active.

## Track-level principles established by Phase 3A

- Durable Aevum memory belongs in application storage, not inside an LLM.
- Personalization should be achieved primarily through stored context and retrieval rather than personalized model training.
- The application must distinguish source evidence, stored interpretation, retrieved context, and model-generated output.
- Send only the personal context needed for the current task.
- AI interprets ambiguous human language; deterministic application code owns authorization, validation, persistence, lifecycle rules, and side effects.
- Model-generated structure does not make an interpretation automatically true.
- Aevum should prefer simple, measurable AI architecture before adopting advanced techniques whose value has not been demonstrated.
- When evidence is insufficient, Aevum should communicate that limitation instead of fabricating personal history.

---

## 3A.1 — LLMs

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** Phase 2 architecture context

### Objective

Establish what a large language model is, what it can and cannot do for Aevum, and where the model belongs in the product architecture.

### Concepts covered

- model training versus inference;
- model parameters and pretrained knowledge;
- token-by-token generation;
- context supplied at inference time;
- reasoning and language generation;
- hallucination and uncertainty;
- external application memory versus model knowledge;
- retrieval-augmented generation versus fine-tuning.

### Historical Aevum decisions and principles

Aevum does not treat the LLM as its persistent personal database. The LLM supplies language understanding, extraction, reasoning, and generation over context provided by the application.

A user's durable history should remain in Aevum-controlled storage. Relevant information is retrieved and supplied to a model when needed. The historical plan therefore favored **RAG/application memory over fine-tuning a personalized model** for the user's changing life data.

The architecture must distinguish:

- **model knowledge** — what the pretrained model already knows;
- **current context** — information supplied in the present request;
- **external memory** — durable Aevum data that can be retrieved, corrected, updated, or deleted.

Hallucination was treated as an architectural concern rather than something solved by better wording alone. Personal claims should be grounded in Aevum evidence, and the model should be allowed to say that recorded information is insufficient.

### Expected outcome

Future Aevum work can use an LLM as a replaceable intelligence component without confusing the model itself with the system's long-term memory or source of truth.

### Deferred / unresolved for later SPEC

- concrete model/provider;
- model routing/fallback behavior;
- exact inference configuration;
- fine-tuning, unless a future measured need justifies it.

### Historical completion criterion

The phase was complete once Aevum's architecture could clearly answer **what the LLM is responsible for and what remains application responsibility**.

---

## 3A.2 — Prompts

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.1

### Objective

Understand prompting as a software-engineering interface between Aevum's deterministic application context and an LLM, rather than as ad-hoc conversational wording.

### Concepts covered

- instruction hierarchy;
- system/application instructions versus task instructions;
- dynamic context construction;
- context engineering;
- grounding;
- prompt injection;
- specialized prompts for different AI operations;
- prompt versioning and evaluation.

### Historical Aevum decisions and principles

Aevum prompts should be assembled from clearly separated inputs such as:

- stable application instructions;
- the current task;
- current user input;
- recent conversation where necessary;
- retrieved memories, goals, pursuits, or source evidence.

The historical design separated two responsibilities:

- **Context Manager / Context Builder** — decides **what information** should be included;
- **Prompt Builder** — decides **how that information and the instructions are presented** to the model.

Aevum should not dump the user's entire history into every request. Prompt quality depends on selecting high-value context, not maximizing text volume.

Retrieved or pasted external content must be treated as **data**, not trusted instructions. Prompt injection is a security problem that also requires authorization, isolation, tool restrictions, validation, and least privilege; a single instruction such as "ignore malicious instructions" is not an adequate security boundary.

Hard product/security invariants do not belong only in prompts. Authentication, ownership, validation, and authorization remain deterministic application rules.

Different operations should use specialized prompt contracts rather than one universal Aevum prompt. Prompts should be versionable and testable.

### Expected outcome

Aevum can construct grounded, task-specific model requests whose behavior is debuggable and whose security does not depend solely on prompt wording.

### Deferred / unresolved for later SPEC

- exact prompt templates;
- prompt persistence format;
- prompt version identifiers;
- provider-specific instruction syntax.

### Historical completion criterion

The phase was complete once prompts were understood as versioned application artifacts built over deliberately selected context.

---

## 3A.3 — Tokens

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.2

### Objective

Understand tokens as the units consumed and generated by language models and use that understanding to shape Aevum's context, cost, latency, and retrieval design.

### Concepts covered

- tokens versus words;
- tokenizers, token IDs, encode/decode behavior;
- input and output tokens;
- autoregressive generation;
- token budgets;
- response streaming;
- context limits;
- cost and latency implications;
- compression/summarization;
- token-aware retrieval and context selection.

### Historical Aevum decisions and principles

Aevum's database is its **long-term memory**; the model context is **temporary working memory**. The application should retrieve only relevant personal context rather than sending all conversations or memories.

Memories intended for retrieval should be concise and self-contained enough to be useful without carrying full raw sources every time. Original sources remain available separately when exact evidence is needed.

A future Context Builder should be token-aware. It should:

- budget space for instructions and selected evidence;
- reserve enough capacity for the model's response;
- remove lower-priority evidence before important context;
- avoid duplicate/redundant memories;
- measure token usage rather than assuming word counts.

Token counts, latency, and cost are useful operational telemetry, but logging should avoid unnecessary private content.

### Expected outcome

Token limits become an explicit engineering constraint that influences retrieval and context construction instead of a production surprise.

### Deferred / unresolved for later SPEC

- exact token budgets;
- provider/model-specific token limits;
- compression thresholds;
- concrete streaming policy.

### Historical completion criterion

The phase was complete once context size, cost, latency, and output capacity were treated as measurable system constraints.

---

## 3A.4 — Context Windows

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.3

### Objective

Define the LLM context window as temporary working memory and establish how Aevum should construct useful context without confusing a large context window with durable personal memory.

### Concepts covered

- input/output context limits;
- context overflow;
- long-context models;
- summarization and compression;
- "lost in the middle";
- context priority;
- short-term conversation continuity;
- long-term retrieval.

### Historical Aevum decisions and principles

The future Context Builder was envisioned as an adaptive component that:

1. determines what the request needs;
2. retrieves relevant memories, goals, pursuits, and supporting sources;
3. includes an appropriate amount of recent conversation;
4. ranks context;
5. fits it into a token budget;
6. passes the selected material to the Prompt Builder.

Historical context tiers were established conceptually:

1. **Always** — core instructions and current request.
2. **Usually** — enough recent conversation for continuity.
3. **Task-dependent** — relevant memories, goals, and pursuits.
4. **Supporting evidence** — source excerpts when detail/provenance is necessary.
5. **Optional** — summaries or lower-ranked related information.

Aevum should not blindly truncate text when the context budget is exceeded. It should remove lower-ranked evidence, reduce conversation history, use summaries, or shorten source excerpts while preserving the most important semantic information.

The system should predict overflow before the model request and reserve output capacity appropriate to the task.

A large context window is **not** equivalent to long-term memory. Durable memory requires storage, retrieval, lifecycle management, deletion, conflict handling, and provenance.

Current and historical information should be labeled so temporal change is not mistaken for contradiction.

### Expected outcome

Aevum has a conceptual Context Builder that bridges short-term conversation and retrieved long-term personal context within a controlled working-memory budget.

### Deferred / unresolved for later SPEC

- exact context priority weights;
- concrete compression algorithms;
- context size thresholds;
- provider-specific maximums.

### Historical completion criterion

The phase was complete once Aevum had a deliberate context-selection strategy rather than an "include everything" strategy.

---

## 3A.5 — Embeddings

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.4

### Objective

Understand embeddings as numerical semantic representations and establish how Aevum can make personal information searchable by meaning rather than exact wording.

### Concepts covered

- vectors and dimensions;
- embedding models;
- semantic similarity;
- cosine similarity/distance;
- query embeddings;
- document/memory embeddings;
- metadata plus semantic representations;
- re-embedding when models change.

### Historical Aevum decisions and principles

Aevum V1 uses **PostgreSQL + pgvector** as the foundation for semantic/vector retrieval.

Embeddings do not replace the relational database. Structured properties such as ownership, dates, lifecycle state, importance, and source authority remain normal data/metadata. Semantic similarity is one signal.

The historical plan allowed a distinction between:

- display/canonical memory content;
- text optimized for semantic embedding, where useful;
- structured metadata that should not be encoded only in prose.

Accepted memories can be embedded once and reused. A query receives its own embedding at retrieval time. If a memory's semantic content changes, its embedding must be regenerated. Deleted content must not retain a usable vector. Superseded historical memories may remain embedded but should be controlled by lifecycle filters.

Embedding generation was intended to be asynchronous where appropriate. A durable memory should not be lost merely because embedding generation temporarily fails; the item can remain pending and be retried by background work.

Embedding telemetry should make model/version, dimensions, status, latency, and failures observable without storing unnecessary sensitive text.

### Expected outcome

Aevum can represent long-term memories in a form suitable for semantic retrieval while keeping relational data and semantic vectors as complementary layers.

### Deferred / unresolved for later SPEC

- embedding provider/model;
- dimensionality;
- embedding-text format;
- migration/re-embedding procedure;
- indexing strategy beyond the simple V1 baseline.

### Historical completion criterion

The phase was complete once Aevum had a clear role for embeddings, pgvector, embedding lifecycle, and the distinction between semantic similarity and factual truth.

---

## 3A.6 — Vector Search

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.5

### Objective

Understand how stored/query embeddings are searched and establish the principles for selecting semantically relevant Aevum memories.

### Concepts covered

- nearest-neighbor search;
- exact vector search;
- approximate nearest-neighbor (ANN) search;
- cosine distance/similarity;
- dot product and L2 distance;
- Top-K;
- relevance thresholds;
- metadata filtering;
- hybrid retrieval;
- reranking;
- HNSW and IVFFlat;
- recall and ranking diversity.

### Historical Aevum decisions and principles

Vector search returns a **candidate set**, not an answer and not automatically the final model context.

Aevum must combine semantic search with deterministic metadata/ownership constraints such as:

- `user_id`;
- lifecycle state;
- relevant dates;
- object type;
- other domain filters where available.

The nearest vector may still be irrelevant. Retrieval therefore needs a relevance mechanism rather than accepting the closest result unconditionally.

Semantic similarity also does not imply agreement or truth. Contradictory statements can be semantically close.

For the expected V1 scale, **exact pgvector search** was preferred as the simple baseline. HNSW/IVFFlat and other ANN techniques should be introduced only when measured scale/performance needs justify their complexity.

Hybrid keyword + semantic retrieval and more advanced rank fusion/reranking were recognized as useful future techniques, but not mandatory before a measurable baseline exists.

### Expected outcome

Aevum can retrieve relevant semantic candidates safely and understand where vector search ends and later ranking/context-selection work begins.

### Deferred / unresolved for later SPEC

- exact distance operator;
- Top-K values;
- threshold values;
- ANN index choice;
- hybrid-ranking algorithm.

### Historical completion criterion

The phase was complete once vector search was treated as controlled candidate retrieval rather than a substitute for SQL, truth, or final answer generation.

---

## 3A.7 — RAG

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.6

### Objective

Connect embeddings, vector retrieval, context construction, prompting, and generation into a grounded Aevum retrieval-augmented generation (RAG) flow.

### Concepts covered

The historical end-to-end model was:

```text
question
→ query embedding
→ retrieval
→ ranking
→ context construction
→ prompt
→ LLM
→ grounded answer
→ provenance
```

The phase also covered indexing versus retrieval, naive versus advanced RAG, chunking, query rewriting, source evidence, hallucination prevention, and evaluation.

### Historical Aevum decisions and principles

Aevum is fundamentally a form of **personal/temporal RAG system**: durable personal context lives outside the model and is selectively retrieved when relevant.

The initial progression was intentionally simple:

- baseline: query → embedding → top relevant active memories → LLM;
- then add metadata filters and relevance thresholds;
- then consider hybrid search/reranking;
- later consider query rewriting, temporal reasoning, richer source retrieval, and broader personal-context retrieval.

Advanced RAG should not be built simply because the techniques exist. Establish a baseline, evaluate failure cases, and add complexity deliberately.

RAG should minimize unnecessary privacy exposure. A general knowledge question should not cause unrelated personal history to be sent to a model provider.

Retrieved content is evidence/data and must not automatically become trusted instructions.

RAG infrastructure was intended to serve more than chat. Search, Goals, Today, reflection, Timeline, and StoryOfMe can reuse retrieval capabilities with different retrieval profiles.

The phase established a useful debugging decomposition:

- missing/incorrect stored memory → memory/extraction problem;
- correct memory not retrieved → retrieval problem;
- correct memory retrieved but omitted → context-selection problem;
- correct evidence included but answer wrong → prompt/generation problem.

### Evaluation concepts established

Future RAG evaluation should consider retrieval recall/precision, Top-K success, groundedness, answer correctness, source correctness, hallucination rate, token usage, and retrieval/generation latency.

### Expected outcome

Aevum can explain how a personal question travels from user input to retrieved evidence and a source-grounded response, with failure points that are observable independently.

### Deferred / unresolved for later SPEC

- exact candidate/final context counts;
- threshold values;
- hybrid/reranking method;
- query-rewrite implementation;
- source chunking strategy.

### Historical completion criterion

The phase was complete once the complete retrieval-to-grounded-generation pipeline and its evaluation/debugging boundaries were understood.

---

## 3A.8 — Tool / Function Calling

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.7

### Objective

Define how an LLM may request controlled Aevum capabilities without receiving direct access to application infrastructure.

### Concepts covered

- tool/function declarations;
- model tool selection;
- structured tool arguments;
- tool execution by the application;
- read versus write tools;
- confirmation/risk policy;
- idempotency;
- tracing and evaluation;
- provenance from tool results.

### Historical Aevum decisions and principles

The LLM **requests** a tool call; it does not execute database or external operations itself.

Preferred tool boundary:

```text
LLM
→ domain tool request
→ authenticated Aevum backend
→ domain service
→ database/external system
```

Tools should represent Aevum product capabilities such as memory, goal, journal, timeline, or search operations. Raw infrastructure capabilities such as arbitrary SQL or shell execution should not be exposed to the model.

Authorization, user ownership, validation, and side-effect rules belong to backend code. A prompt telling the model not to access another user's data is not an authorization mechanism.

Risk-aware behavior was established conceptually:

- ordinary reads generally require no confirmation;
- explicitly requested low-risk/reversible writes may execute directly;
- significant or broad modifications may require confirmation;
- destructive actions require stronger confirmation;
- external communications require explicit safeguards appropriate to the workflow.

Retryable write operations may need idempotency to prevent duplicate effects.

Tool tracing should capture operational metadata such as tool name, request ID, duration, success/failure, and result counts where safe, while avoiding unnecessary sensitive-content logging.

Tool selection and arguments should be evaluable independently of final answer quality.

Future integrations such as calendar, email, GitHub, files, health, or finance were recognized as powerful but **post-MVP unless deliberately brought into scope**.

### Expected outcome

Aevum has a safe boundary through which AI reasoning can use real application capabilities without bypassing domain services or security controls.

### Deferred / unresolved for later SPEC

- exact V1 tool catalog;
- concrete confirmation matrix;
- provider-specific tool schema;
- external integrations;
- tool persistence/tracing implementation.

### Historical completion criterion

The phase was complete once tool calling was understood as a controlled request/execute/result loop owned by the application.

---

## 3A.9 — Agents

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.8

### Objective

Understand agentic AI, distinguish agents from deterministic workflows and single tool calls, and establish how much autonomy Aevum should grant.

### Concepts covered

- agent loops;
- goals, observations, actions, and stopping;
- workflows versus agents;
- multi-step tool use;
- worker/queue execution for long jobs;
- model routing;
- multi-agent delegation;
- agent evaluation;
- cost/latency/step efficiency.

### Historical Aevum decisions and principles

The decision guide established was:

- predictable process → **workflow**;
- need semantic personal information → **RAG**;
- need one dynamic application capability → **tool calling**;
- need adaptive multi-step investigation → **consider an agent**.

Aevum should not maximize autonomy. Reliability, memory quality, privacy, explainability, and user control are more important.

Agents must operate over domain services/tools rather than raw infrastructure. Authentication, authorization, database constraints, ownership, and deletion guarantees stay deterministic.

Long-running agentic work can execute through background jobs rather than keeping a web request open.

A single capable model and simple workflow are preferable to early multi-agent complexity. Delegation/multi-agent architecture was explicitly unnecessary for early Aevum versions.

Agents need stopping behavior. If sufficient evidence cannot be found, the system should terminate with an honest insufficiency result instead of searching indefinitely.

Agent evaluation should assess not only the final prose but also:

- appropriate tool choice;
- number of steps/tool calls;
- evidence retrieved;
- unnecessary actions avoided;
- permission adherence;
- argument correctness;
- stopping behavior;
- groundedness;
- cost and latency.

The product principle **AI assists; user decides** carries into agent behavior, especially for consequential personal decisions.

### Expected outcome

Aevum has a restrained autonomy model in which agents are an optional architecture for genuine adaptive multi-step tasks rather than the default implementation pattern.

### Deferred / unresolved for later SPEC

- whether V1 needs any agent at all;
- agent orchestration framework;
- multi-agent architecture;
- model routing;
- long-running agent job design.

### Historical completion criterion

The phase was complete once Aevum could clearly distinguish when an agent adds value and when deterministic workflows/RAG/tools are safer and simpler.

---

## 3A.10 — Structured Outputs

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.9

### Objective

Define a reliable machine-readable boundary between probabilistic LLM interpretation and deterministic Aevum application logic.

### Concepts covered

- schema-constrained model output;
- runtime validation;
- compile-time types versus runtime schemas;
- structured extraction;
- intent classification;
- relationship classification;
- agent/tool decision structures;
- schema and prompt versioning;
- structured evaluation.

### Historical Aevum decisions and principles

When AI output is consumed by application code rather than directly by a person, Aevum should prefer a **well-defined structured contract**.

Examples include:

- memory candidates;
- query/context intent;
- duplicate/relationship classification;
- tool arguments;
- structured reflection data used by UI.

Human-facing conversation normally remains natural language.

Structured output guarantees **shape**, not factual correctness. Runtime validation and semantic/domain validation are still required before data becomes trusted application state.

The historical boundary was explicit:

**The model may propose**
- interpreted type;
- normalized content;
- relationship/classification;
- confidence or rationale where justified.

**Aevum controls**
- authenticated user/ownership;
- IDs;
- source linkage;
- timestamps;
- lifecycle state;
- persistence;
- embeddings;
- authorization;
- transactions and side effects.

The model must not generate arbitrary database rows or write directly to persistence.

A distinction was established between **MemoryCandidate** (AI interpretation) and **Memory** (accepted domain object).

Schemas should be small and purposeful. More fields mean more ambiguous model decisions and more evaluation burden. Model self-reported confidence is a heuristic, not a calibrated probability unless evaluation proves otherwise.

Prompt version, schema version, and model version should be independently observable because any can change quality.

Structured output failures/refusals/timeouts must not corrupt the database. Background extraction failure must not cause a successfully saved user message/conversation to be lost.

### Expected outcome

Aevum has a clean boundary:

```text
human language
→ LLM interpretation
→ structured result
→ validation/domain rules
→ trusted application state
```

### Deferred / unresolved for later SPEC

- concrete schemas;
- runtime validation library appropriate to the accepted backend stack;
- retry policy;
- provider SDK syntax;
- exact confidence representation.

### Historical completion criterion

The phase was complete once structured AI results were treated as validated proposals consumed by deterministic domain logic rather than authoritative database commands.

---

## 3A.11 — AI Memory

**Status:** `HISTORICAL_PLAN_COMPLETE`  
**Migration:** `RECOVERED`  
**Build eligibility:** `NOT_READY_FOR_BUILD`  
**Depends on:** 3A.10

### Objective

Combine the preceding AI fundamentals into a precise conceptual model for Aevum's long-term personal memory system.

### Definition established

For Aevum, **AI memory is an application-level system that captures useful information from interactions, stores it persistently, maintains it over time, retrieves relevant parts when needed, and supplies that information to AI models in a controlled way.**

It is not merely conversation history or a large context window.

### Memory layers distinguished

At least four layers were separated:

1. current model context;
2. conversation history;
3. structured long-term memory;
4. raw source history.

This distinction allows Aevum to preserve evidence while maintaining concise, normalized memories for retrieval.

### Historical Aevum decisions and principles

Durable personal memory lives in Aevum storage and is retrieved into the model context; it is not created by continuously retraining the model.

Memory should be:

- compact;
- source-backed;
- user-correctable;
- editable/deletable;
- temporally aware;
- selectively retrieved.

The historical plan introduced **temporal truth**. Personal facts can be true during a period and later change. A current preference can supersede an older preference without erasing that the older state was historically true.

Core lifecycle concepts included:

- `ACTIVE`;
- `SUPERSEDED`;
- `ARCHIVED`;
- deletion as an explicit user/data action.

A **change** is different from a **correction**. Supersession preserves a previously true historical state; an incorrect extraction should be corrected/removed rather than preserved as false history.

Repeated evidence may reinforce an existing memory rather than creating duplicates. Memory may have multiple sources, and one source may support multiple memories.

Memory write paths have different authority:

- manual user-created memory;
- explicit "remember this";
- normal automatic extraction;
- user correction.

Explicit "do not remember this" must prevent durable extraction while still allowing the immediate conversation to function. Storing memories and using saved memories in chat are separate controls.

V1 should favor explicit user statements over speculative inference. Rigid psychological interpretation and overly broad ontologies were discouraged.

The memory system should use embeddings and RAG for future retrieval, but retrieval must select only the smallest useful personal context.

StoryOfMe and decision support should be built as grounded views over Aevum's existing personal context rather than separate disconnected stores.

### Long-term loop established

```text
capture
→ preserve raw source
→ extract candidates
→ validate/compare
→ create / update / supersede
→ embed
→ store
→ retrieve
→ context builder
→ LLM response
→ correction/feedback
```

This conceptual loop directly motivated the Phase 3B Memory Architecture.

### Expected outcome

Aevum has a coherent definition of long-term AI memory and the lifecycle, provenance, temporal, privacy, retrieval, and user-control principles required to build it safely.

### Deferred / unresolved for later SPEC

- exact memory schema and taxonomy;
- detailed authority/confidence representation;
- formal memory scopes/domains;
- retention policy;
- exact extraction thresholds;
- exact lifecycle service/API contracts.

### Historical completion criterion

The phase was complete once Aevum could describe a compact, source-backed, temporally aware, user-correctable memory system and the full loop connecting capture to future grounded retrieval.

---

## Phase 3A historical outcome

Phase 3A completed the conceptual AI foundation needed for Aevum Core System Design:

```text
LLM
+ prompting/context engineering
+ token/context budgets
+ embeddings/vector retrieval
+ RAG
+ controlled tools
+ restrained agents
+ structured machine-facing outputs
+ application-level memory
```

The track does **not** authorize implementation by itself. Any code work derived from these concepts must later be converted into a scoped PSB phase with concrete functional/technical requirements, acceptance criteria, tests, and Definition of Done.

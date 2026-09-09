# AI Architecture

## Role of AI in Aevum

AI is a foundational Aevum capability intended to make accumulated personal context easier to retrieve, connect, summarize, and reason about over time.

AI must not become an unbounded replacement for application logic or an authority allowed to invent personal facts.

## Baseline architecture principles

### Explicit responsibilities

Every AI-enabled feature should define whether AI is being used for:

- retrieval or ranking;
- classification/extraction;
- summarization;
- generation;
- reasoning over supplied context;
- structured-output generation;
- another explicitly specified role.

### Deterministic boundaries

Authentication, authorization, data ownership, persistence rules, validation, and other core correctness constraints should remain deterministic application responsibilities unless an approved design explicitly states otherwise.

### Grounding and provenance

Where product behavior depends on factual personal context, AI outputs should be grounded in known Aevum data. The system should preserve enough separation to distinguish stored source information from model-generated interpretation when necessary.

### Semantic data

PostgreSQL + pgvector is the approved V1 foundation for semantic/vector functionality.

### Privacy boundary

A phase using an external model must specify what personal context may leave the Aevum application boundary, what is retained, and what user/security controls are required.

## Historical Phase 3 relationship

Historical **Phase 3 — AI Fundamentals** contains two planning tracks:

- Phase 3A.1 through 3A.11
- Phase 3B.1 through 3B.8

Those sub-phase identities are preserved in `docs/phases/PHASE-03A.md` and `docs/phases/PHASE-03B.md`.

Where exact historical sub-phase content has not yet been faithfully migrated, it is marked as a migration gap and is not BUILD-authoritative.

## Not finalized in Baseline v1

- model/provider choice;
- embedding model/provider choice;
- prompt/context persistence policy;
- local versus hosted inference boundary;
- model fallback strategy;
- evaluation framework;
- cost controls;
- streaming behavior;
- agent/tool architecture.

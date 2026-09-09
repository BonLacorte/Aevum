# Data Architecture

## Primary system of record

Aevum V1 uses **PostgreSQL** as its primary durable relational data store.

## Vector capability

Aevum uses **pgvector** as the approved V1 direction for vector storage and similarity operations associated with semantic/AI features.

The baseline intentionally avoids introducing a separate vector database without a later demonstrated requirement and approved decision.

## Data principles

1. Structured application facts remain explicit relational data when practical.
2. Embeddings supplement source data; they do not replace the underlying authoritative record.
3. Generated AI summaries or interpretations should be distinguishable from original user-provided or deterministic application data where correctness requires it.
4. Schema changes must be migration-controlled once implementation begins.
5. Identifiers and relationships should support long-term evolution without depending on display labels.
6. Sensitive data handling must follow `SECURITY-PRIVACY.md` and phase-specific requirements.

## Phase-level responsibilities

Each phase that changes persistence must specify, as applicable:

- entities/tables affected;
- relationships;
- constraints and validation;
- indexes;
- migrations;
- vector dimensions/model coupling if embeddings are involved;
- deletion/retention implications;
- backfill behavior;
- test data requirements.

## Not finalized in Baseline v1

The following are not yet canonical:

- complete entity model;
- exact table names and columns;
- embedding model and vector dimensionality;
- retention schedules;
- backup topology;
- cloud synchronization schema;
- data import/export format.

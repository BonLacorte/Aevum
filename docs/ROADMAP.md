# Roadmap

## Baseline status

Historical Aevum planning is preserved through **Phase 3B.8**. Further phase-by-phase historical roadmap expansion is intentionally halted while the project executes through repository-based PSB implementation cycles.

The historical roadmap represents planning structure. A historical phase is not automatically a single future Codex BUILD unit.

Historical planning lives under `docs/phases/`. Real implementation contracts live under `docs/implementation/`.

A backend-stack migration correction restored Aevum's historical backend from the incorrectly imported Java + Spring Boot entry to **NestJS + TypeScript**. This correction does not change the roadmap hierarchy.

## Historical planning hierarchy

```text
Phase 1
├─ Phase 1.2
├─ Phase 2
└─ Phase 3 — AI Fundamentals
   ├─ Phase 3A
   │  ├─ 3A.1
   │  ├─ 3A.2
   │  ├─ 3A.3
   │  ├─ 3A.4
   │  ├─ 3A.5
   │  ├─ 3A.6
   │  ├─ 3A.7
   │  ├─ 3A.8
   │  ├─ 3A.9
   │  ├─ 3A.10
   │  └─ 3A.11
   └─ Phase 3B
      ├─ 3B.1
      ├─ 3B.2
      ├─ 3B.3
      ├─ 3B.4
      ├─ 3B.5
      ├─ 3B.6
      ├─ 3B.7
      └─ 3B.8
```

## Historical phase roles

| Phase | Purpose in the historical plan | Repository treatment |
|---|---|---|
| Phase 1 | Establish the Aevum product foundation, vision, target use, and early product direction. | Preserve as foundational historical planning; implementation slices inherit its durable context. |
| Phase 1.2 | Refine the product model toward general-purpose life organization and away from a developer-centric Projects model. | Superseding product refinement inherited by implementation work. |
| Phase 2 | Establish the V1 architecture and core technology direction. | Durable stack/architecture decisions constrain implementation phases; backend corrected to NestJS + TypeScript; not one automatic code release. |
| Phase 3 | AI Fundamentals parent track. | Historical planning context; implementation must be converted into appropriately scoped contracts. |
| Phase 3A.1–3A.11 | AI-engineering fundamentals and durable principles. | Preserved inside `docs/phases/PHASE-03A.md`; not automatic BUILD units. |
| Phase 3B.1–3B.8 | Aevum core-system/AI architecture planning. | Preserved inside `docs/phases/PHASE-03B.md`; not automatic BUILD units. |

## Historical dependency direction

The historical planning sequence is:

```text
Phase 1 → Phase 1.2 → Phase 2 → Phase 3A → Phase 3B
```

This sequence is supporting planning context, not the executable BUILD sequence.

## Implementation execution track

Real implementation phases are independently scoped through PSB and tracked under `docs/implementation/`.

| Implementation phase | Purpose | Current state |
|---|---|---|
| Implementation Phase 1 — Executable Application Foundation | Establish and verify the locally runnable Next.js + TypeScript → NestJS + TypeScript → PostgreSQL + pgvector foundation. | `CLOSED` — all 42 acceptance criteria and Definition of Done passed; merged into `main`. |
| Implementation Phase 2 — Identity & Ownership Foundation | Establish the minimum deterministic identity, authentication, and ownership foundation required before Aevum stores user-owned personal life data. | PLAN `PLAN_APPROVED`; SPEC `NOT_STARTED`; `NOT_READY_FOR_BUILD`; BUILD `NOT_STARTED`. |

Canonical contracts:

- `docs/implementation/PHASE-01.md` — closed implementation record.
- `docs/implementation/PHASE-02.md` — active approved PLAN.

Implementation Phase 2 was selected by dependency order rather than historical phase numbering. It establishes the authenticated ownership prerequisite before durable personal-content domains such as Goals, Journal, Memories, or Chat.

The approved reusable ownership invariant is:

> **Authenticated server-side application context determines the Aevum owner.**

Future implementation phases continue to be created through PSB rather than inferred automatically from the historical hierarchy.

## Next roadmap action

The next PSB stage is the detailed SPEC for **Implementation Phase 2 — Identity & Ownership Foundation**, but SPEC remains `NOT_STARTED` at this checkpoint.

The authentication provider/mechanism is intentionally unresolved. The Phase 2 SPEC must define the identity-to-internal-user mapping/reconciliation boundary and minimize persisted authentication data before the phase may become `READY_FOR_BUILD`.

Do not begin a product-domain implementation or Phase 2 BUILD from PLAN approval alone.

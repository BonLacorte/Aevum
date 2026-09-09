# Roadmap

## Baseline status

Historical Aevum planning is preserved through **Phase 3B.8**. Further phase-by-phase historical roadmap expansion is intentionally halted while the project executes through repository-based PSB implementation cycles.

The historical roadmap represents planning structure. A historical phase is not automatically a single future Codex BUILD unit.

Historical planning lives under `docs/phases/`. Real implementation contracts live under `docs/implementation/`.

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
| Phase 2 | Establish the V1 architecture and core technology direction. | Durable stack/architecture decisions constrain implementation phases; not one automatic code release. |
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
| Implementation Phase 1 — Executable Application Foundation | Prove the locally runnable Next.js + TypeScript → Spring Boot → PostgreSQL + pgvector foundation without implementing major Aevum product features. | `PLAN_APPROVED` / `NOT_READY_FOR_BUILD` |

Canonical contract:

- `docs/implementation/PHASE-01.md`

Future implementation phases must be created through the PSB process rather than inferred automatically from the historical hierarchy.

## Next roadmap action

Do not create Phase 3B.9 as part of this checkpoint.

The next implementation action is to prepare the SPEC for **Implementation Phase 1 — Executable Application Foundation** only after explicit PSB instruction.

The phase must not enter BUILD until its SPEC passes review and the canonical implementation contract is explicitly marked `READY_FOR_BUILD`.

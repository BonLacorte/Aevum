# Roadmap

## Baseline status

Historical Aevum planning is preserved through **Phase 3B.8**. Further phase-by-phase roadmap expansion is intentionally halted while the project transitions to repository-based PSB execution.

The historical roadmap represents planning structure. A historical phase is not automatically a single future Codex BUILD unit.

## Hierarchy

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
| Phase 1 | Establish the Aevum product foundation, vision, target use, and early product direction. | Preserve as foundational planning; convert into a concrete first implementation contract before BUILD. |
| Phase 1.2 | Refine the product model toward general-purpose life organization and away from a developer-centric Projects model. | Treated as a superseding product refinement inherited by later work. |
| Phase 2 | Establish the V1 architecture and core technology direction. | Extract durable decisions into architecture documents; do not treat as one automatic code release. |
| Phase 3 | AI Fundamentals parent track. | Preserve as planning context; implementation must be converted into appropriately scoped BUILD contracts. |
| Phase 3A.1–3A.11 | Historical AI Fundamentals sub-phases. | Identities preserved inside `PHASE-03A.md`; exact unmigrated detail is marked as a migration gap. |
| Phase 3B.1–3B.8 | Historical AI Fundamentals sub-phases. | Identities preserved inside `PHASE-03B.md`; exact unmigrated detail is marked as a migration gap. |

## High-level dependency direction

The historical planning sequence is:

```text
Phase 1 → Phase 1.2 → Phase 2 → Phase 3A → Phase 3B
```

This is a planning sequence, not a guarantee that every internal sub-phase has a strict runtime dependency on the immediately preceding item. Exact implementation dependencies must be confirmed when the relevant phase is migrated to SPEC.

## Next roadmap action

Do not create Phase 3B.9 during Baseline v1.

The next development action is to turn the first implementation slice derived from historical Phase 1 into a complete PSB phase specification and move it to `READY_FOR_BUILD`.

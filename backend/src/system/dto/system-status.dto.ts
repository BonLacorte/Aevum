export type SystemStatusDto =
  | { status: "READY"; database: "UP"; pgvector: "AVAILABLE" }
  | { status: "NOT_READY"; database: "DOWN"; pgvector: "UNKNOWN" }
  | { status: "NOT_READY"; database: "UP"; pgvector: "UNAVAILABLE" };

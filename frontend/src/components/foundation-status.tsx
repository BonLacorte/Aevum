"use client";

import { useCallback, useEffect, useState } from "react";
import { getSystemStatus, type SystemStatusResult } from "../lib/api/system-status";

type ViewState = { kind: "checking" } | SystemStatusResult;

export function FoundationStatus() {
  const [state, setState] = useState<ViewState>({ kind: "checking" });

  const checkStatus = useCallback(async () => {
    setState({ kind: "checking" });
    setState(await getSystemStatus());
  }, []);

  useEffect(() => {
    void getSystemStatus().then(setState);
  }, []);

  if (state.kind === "checking") {
    return (
      <section className="foundation-card" aria-live="polite">
        <h1>Aevum</h1>
        <p>Checking application foundation…</p>
      </section>
    );
  }

  if (state.kind === "ready") {
    return (
      <section className="foundation-card" aria-live="polite">
        <h1>Aevum</h1>
        <p>Aevum application foundation is ready.</p>
        <StatusDetails database="UP" pgvector="AVAILABLE" />
      </section>
    );
  }

  if (state.kind === "not-ready") {
    return (
      <section className="foundation-card" aria-live="polite">
        <h1>Aevum</h1>
        <p>Aevum application foundation is not ready.</p>
        <StatusDetails database={state.value.database} pgvector={state.value.pgvector} />
        <button type="button" onClick={() => void checkStatus()}>Retry</button>
      </section>
    );
  }

  return (
    <section className="foundation-card" aria-live="polite">
      <h1>Aevum</h1>
      <p>Aevum backend is unavailable.</p>
      <StatusDetails database="UNKNOWN" pgvector="UNKNOWN" backend="DOWN" />
      <button type="button" onClick={() => void checkStatus()}>Retry</button>
    </section>
  );
}

function StatusDetails({
  backend = "UP",
  database,
  pgvector,
}: {
  backend?: "UP" | "DOWN";
  database: "UP" | "DOWN" | "UNKNOWN";
  pgvector: "AVAILABLE" | "UNAVAILABLE" | "UNKNOWN";
}) {
  return (
    <dl>
      <dt>Backend:</dt><dd>{backend}</dd>
      <dt>Database:</dt><dd>{database}</dd>
      <dt>pgvector:</dt><dd>{pgvector}</dd>
    </dl>
  );
}

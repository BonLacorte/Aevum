export type SystemStatusResponse =
  | { status: "READY"; database: "UP"; pgvector: "AVAILABLE" }
  | { status: "NOT_READY"; database: "DOWN"; pgvector: "UNKNOWN" }
  | { status: "NOT_READY"; database: "UP"; pgvector: "UNAVAILABLE" };

export type SystemStatusResult =
  | { kind: "ready"; value: Extract<SystemStatusResponse, { status: "READY" }> }
  | { kind: "not-ready"; value: Exclude<SystemStatusResponse, { status: "READY" }> }
  | { kind: "unavailable" };

function configuredApiBaseUrl(): string | undefined {
  const rawValue = process.env.NEXT_PUBLIC_AEVUM_API_BASE_URL;
  if (!rawValue) {
    return undefined;
  }

  try {
    const url = new URL(rawValue);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return undefined;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

function isExactStatusResponse(value: unknown): value is SystemStatusResponse {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  if (keys.length !== 3 || keys.join(",") !== "database,pgvector,status") {
    return false;
  }

  return (
    (record.status === "READY" && record.database === "UP" && record.pgvector === "AVAILABLE") ||
    (record.status === "NOT_READY" && record.database === "DOWN" && record.pgvector === "UNKNOWN") ||
    (record.status === "NOT_READY" && record.database === "UP" && record.pgvector === "UNAVAILABLE")
  );
}

export async function getSystemStatus(): Promise<SystemStatusResult> {
  const baseUrl = configuredApiBaseUrl();
  if (!baseUrl) {
    return { kind: "unavailable" };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(`${baseUrl}/api/system/status`, {
      cache: "no-store",
      signal: controller.signal,
    });
    const payload: unknown = await response.json();

    if (!isExactStatusResponse(payload)) {
      return { kind: "unavailable" };
    }

    if (response.status === 200 && payload.status === "READY") {
      return { kind: "ready", value: payload };
    }

    if (response.status === 503 && payload.status === "NOT_READY") {
      return { kind: "not-ready", value: payload };
    }

    return { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  } finally {
    window.clearTimeout(timeout);
  }
}

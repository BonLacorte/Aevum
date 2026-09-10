import { z } from "zod";

export type Environment = {
  NODE_ENV: "development" | "test" | "production";
  AEVUM_API_PORT: number;
  AEVUM_CORS_ORIGIN: string;
  DATABASE_URL: string;
  AEVUM_DB_CONNECTION_TIMEOUT_MS: number;
};

const integerFromEnvironment = (minimum: number, fallback: number) =>
  z.coerce.number().int().min(minimum).default(fallback);

const origin = z.string().default("http://localhost:3000").superRefine((value, context) => {
  try {
    const parsed = new URL(value);
    if (
      (parsed.protocol !== "http:" && parsed.protocol !== "https:") ||
      parsed.origin !== value ||
      value === "*"
    ) {
      context.addIssue({ code: "custom" });
    }
  } catch {
    context.addIssue({ code: "custom" });
  }
});

const databaseUrl = z.string().min(1).superRefine((value, context) => {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "postgres:" && parsed.protocol !== "postgresql:") {
      context.addIssue({ code: "custom" });
    }
  } catch {
    context.addIssue({ code: "custom" });
  }
});

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  AEVUM_API_PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  AEVUM_CORS_ORIGIN: origin,
  DATABASE_URL: databaseUrl,
  AEVUM_DB_CONNECTION_TIMEOUT_MS: integerFromEnvironment(1, 2000),
});

export function validateEnvironment(config: Record<string, unknown>): Environment {
  const parsed = environmentSchema.safeParse(config);
  if (parsed.success) {
    return parsed.data as Environment;
  }

  const variables = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0] ?? "environment")))];
  throw new Error(`Invalid environment configuration: ${variables.join(", ")}`);
}

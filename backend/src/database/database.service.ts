import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import type { Environment } from "../config/environment";

export type DatabaseReadiness =
  | { database: "DOWN"; pgvector: "UNKNOWN" }
  | { database: "UP"; pgvector: "AVAILABLE" | "UNAVAILABLE" };

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly pool: Pool;

  constructor(config: ConfigService<Environment, true>) {
    this.pool = new Pool({
      connectionString: config.get("DATABASE_URL", { infer: true }),
      connectionTimeoutMillis: config.get("AEVUM_DB_CONNECTION_TIMEOUT_MS", { infer: true }),
    });
  }

  async readiness(): Promise<DatabaseReadiness> {
    try {
      await this.pool.query("SELECT 1");
    } catch {
      return { database: "DOWN", pgvector: "UNKNOWN" };
    }

    try {
      const result = await this.pool.query(
        "SELECT 1 FROM pg_extension WHERE extname = 'vector' LIMIT 1",
      );
      return {
        database: "UP",
        pgvector: result.rowCount === 1 ? "AVAILABLE" : "UNAVAILABLE",
      };
    } catch {
      return { database: "UP", pgvector: "UNAVAILABLE" };
    }
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}

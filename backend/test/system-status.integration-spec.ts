import { Test } from "@nestjs/testing";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";
import request from "supertest";
import type { INestApplication } from "@nestjs/common";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { join } from "node:path";

const moduleLoader = createRequire(__filename);

const image = "pgvector/pgvector:0.8.6-pg18-trixie";
const readyDto = { status: "READY", database: "UP", pgvector: "AVAILABLE" };

async function createApplication(databaseUrl: string): Promise<INestApplication> {
  process.env.NODE_ENV = "test";
  process.env.AEVUM_API_PORT = "8080";
  process.env.AEVUM_CORS_ORIGIN = "http://localhost:3000";
  process.env.AEVUM_DB_CONNECTION_TIMEOUT_MS = "2000";
  process.env.DATABASE_URL = databaseUrl;

  const { AppModule } = moduleLoader("../src/app.module") as typeof import("../src/app.module");
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = module.createNestApplication();
  app.setGlobalPrefix("api");
  await app.init();
  return app;
}

describe("GET /api/system/status with real PostgreSQL + pgvector", () => {
  let container: StartedPostgreSqlContainer;
  let databaseUrl: string;
  let client: Client;

  beforeAll(async () => {
    container = await new PostgreSqlContainer(image).start();
    databaseUrl = container.getConnectionUri();
    client = new Client({ connectionString: databaseUrl });
    await client.connect();

    await expect(client.query("SELECT to_regclass('public.pgmigrations') AS table_name"))
      .resolves.toMatchObject({ rows: [{ table_name: null }] });

    execFileSync(process.execPath, [
      join(__dirname, "run-migrations.cjs"),
      databaseUrl,
      join(__dirname, "..", "migrations"),
    ], { stdio: "inherit" });
  });

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  it("proves PostgreSQL 18, pgvector 0.8.6, migration ownership, and READY", async () => {
    const version = await client.query<{ server_version: string }>("SHOW server_version");
    expect(version.rows[0].server_version).toMatch(/^18\./);

    await expect(client.query("SELECT name FROM public.pgmigrations"))
      .resolves.toMatchObject({ rows: [{ name: "001_enable_vector" }] });
    await expect(client.query("SELECT extversion FROM pg_extension WHERE extname = 'vector'"))
      .resolves.toMatchObject({ rows: [{ extversion: "0.8.6" }] });
    await expect(client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"))
      .resolves.toMatchObject({ rows: [{ tablename: "pgmigrations" }] });

    const app = await createApplication(databaseUrl);
    try {
      const response = await request(app.getHttpServer()).get("/api/system/status");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(readyDto);
    } finally {
      await app.close();
    }
  });

  it("returns pgvector-unavailable then restores the extension and READY", async () => {
    const app = await createApplication(databaseUrl);
    try {
      await expect(request(app.getHttpServer()).get("/api/system/status"))
        .resolves.toMatchObject({ status: 200, body: readyDto });

      await client.query("DROP EXTENSION vector");
      const unavailable = await request(app.getHttpServer()).get("/api/system/status");
      expect(unavailable.status).toBe(503);
      expect(unavailable.body).toEqual({
        status: "NOT_READY", database: "UP", pgvector: "UNAVAILABLE",
      });
    } finally {
      await client.query("CREATE EXTENSION IF NOT EXISTS vector");
      await expect(client.query("SELECT extversion FROM pg_extension WHERE extname = 'vector'"))
        .resolves.toMatchObject({ rows: [{ extversion: "0.8.6" }] });
      const recovered = await request(app.getHttpServer()).get("/api/system/status");
      expect(recovered.status).toBe(200);
      expect(recovered.body).toEqual(readyDto);
      await app.close();
    }
  });
});

describe("GET /api/system/status when PostgreSQL is unreachable", () => {
  it("returns the exact database-down DTO through a real pg failure", async () => {
    const app = await createApplication("postgres://aevum:aevum_local@127.0.0.1:65534/aevum");
    try {
      const response = await request(app.getHttpServer()).get("/api/system/status");
      expect(response.status).toBe(503);
      expect(response.body).toEqual({
        status: "NOT_READY", database: "DOWN", pgvector: "UNKNOWN",
      });
    } finally {
      await app.close();
    }
  });
});

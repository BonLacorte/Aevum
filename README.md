# Aevum

Aevum’s Phase 1 foundation is a minimal local application path:

```text
Browser → Next.js + TypeScript → NestJS + TypeScript → PostgreSQL + pgvector
```

It provides only a foundation-status screen and `GET /api/system/status`. No product domains, authentication, AI behavior, embeddings, or vector search are part of this phase. Implementation Phase 1 is `VERIFIED` and `CLOSED`.

## Toolchain

- Node.js `24.21.0` (supported range `>=24.21.0 <25`)
- pnpm `12.3.4`
- Next.js `16.3.3`, React `19.2.8`, TypeScript `5.9.3`
- NestJS `11.2.3` with TypeScript `5.9.3` and CommonJS output
- PostgreSQL `18` + pgvector `0.8.6`

The repository is one pnpm workspace with `frontend` and `backend`, plus a single root `pnpm-lock.yaml`.

## Local setup

Install the pinned Node and pnpm versions, then install dependencies from the lockfile:

```powershell
node --version
pnpm --version
pnpm install --frozen-lockfile
```

Create local configuration files from their committed safe examples:

```powershell
Copy-Item infra/.env.example infra/.env
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.local.example frontend/.env.local
```

The local files are ignored by Git. `backend/.env` holds the server-only `DATABASE_URL`; do not put it in frontend configuration.

## Run locally

Start PostgreSQL and wait for its `postgres` service to report healthy:

```powershell
docker compose --env-file infra/.env -f infra/compose.yaml up -d
docker compose --env-file infra/.env -f infra/compose.yaml ps
```

Apply the migration. It explicitly reads `backend/.env` through `--envPath .env`; no `DATABASE_URL` shell export is needed.

```powershell
pnpm --filter @aevum/backend db:migrate
```

Start the backend and frontend in separate terminals:

```powershell
pnpm --filter @aevum/backend dev
pnpm --filter @aevum/frontend dev
```

Open [http://localhost:3000](http://localhost:3000). A healthy foundation displays:

```text
Aevum application foundation is ready.
Backend: UP
Database: UP
pgvector: AVAILABLE
```

The backend listens on `http://localhost:8080`; its only Phase 1 endpoint is `GET /api/system/status`.

## Verification

Run the automated suite:

```powershell
pnpm --filter @aevum/frontend lint
pnpm --filter @aevum/frontend typecheck
pnpm --filter @aevum/frontend build
pnpm --filter @aevum/backend lint
pnpm --filter @aevum/backend typecheck
pnpm --filter @aevum/backend build
pnpm --filter @aevum/backend test
pnpm --filter @aevum/backend test:integration
pnpm verify
```

The integration suite uses a real `pgvector/pgvector:0.8.6-pg18-trixie` Testcontainers database, applies the production migration, checks PostgreSQL 18 and pgvector 0.8.6, and exercises ready, extension-absent, and database-unreachable status behavior.

For a clean local database check, remove the Compose volume, start it again, and run the migration twice:

```powershell
docker compose --env-file infra/.env -f infra/compose.yaml down -v
docker compose --env-file infra/.env -f infra/compose.yaml up -d
pnpm --filter @aevum/backend db:migrate
pnpm --filter @aevum/backend db:migrate
```

## Project governance

The Phase 1 closeout record is in [docs/implementation/PHASE-01.md](docs/implementation/PHASE-01.md). The Aevum PSB Guide marked the completed replacement BUILD `VERIFIED` and `CLOSED`. Historical documents under `docs/phases/` are archival and are not BUILD contracts.

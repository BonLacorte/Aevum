import { Test } from "@nestjs/testing";
import { DatabaseService } from "../database/database.service";
import { SystemService } from "./system.service";

describe("SystemService", () => {
  const database = { readiness: jest.fn() };
  let service: SystemService;

  beforeEach(async () => {
    database.readiness.mockReset();
    const module = await Test.createTestingModule({
      providers: [SystemService, { provide: DatabaseService, useValue: database }],
    }).compile();
    service = module.get(SystemService);
  });

  it("maps a ready database and vector extension to READY", async () => {
    database.readiness.mockResolvedValue({ database: "UP", pgvector: "AVAILABLE" });
    await expect(service.status()).resolves.toEqual({
      status: "READY", database: "UP", pgvector: "AVAILABLE",
    });
  });

  it("maps a database failure to NOT_READY", async () => {
    database.readiness.mockResolvedValue({ database: "DOWN", pgvector: "UNKNOWN" });
    await expect(service.status()).resolves.toEqual({
      status: "NOT_READY", database: "DOWN", pgvector: "UNKNOWN",
    });
  });

  it("maps a missing vector extension to NOT_READY", async () => {
    database.readiness.mockResolvedValue({ database: "UP", pgvector: "UNAVAILABLE" });
    await expect(service.status()).resolves.toEqual({
      status: "NOT_READY", database: "UP", pgvector: "UNAVAILABLE",
    });
  });
});

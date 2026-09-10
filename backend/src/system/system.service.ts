import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import type { SystemStatusDto } from "./dto/system-status.dto";

@Injectable()
export class SystemService {
  constructor(private readonly databaseService: DatabaseService) {}

  async status(): Promise<SystemStatusDto> {
    const readiness = await this.databaseService.readiness();
    if (readiness.database === "DOWN") {
      return { status: "NOT_READY", database: "DOWN", pgvector: "UNKNOWN" };
    }
    if (readiness.pgvector === "UNAVAILABLE") {
      return { status: "NOT_READY", database: "UP", pgvector: "UNAVAILABLE" };
    }
    return { status: "READY", database: "UP", pgvector: "AVAILABLE" };
  }
}

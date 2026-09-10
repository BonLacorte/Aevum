import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { SystemService } from "./system.service";

@Controller("system")
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get("status")
  async getStatus(@Res() response: Response): Promise<void> {
    const status = await this.systemService.status();
    response.status(status.status === "READY" ? 200 : 503).json(status);
  }
}

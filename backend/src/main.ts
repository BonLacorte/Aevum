import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import type { Environment } from "./config/environment";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: ["log", "warn", "error"] });
  const config = app.get(ConfigService<Environment, true>);

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: config.get("AEVUM_CORS_ORIGIN", { infer: true }),
    methods: ["GET", "OPTIONS"],
    credentials: false,
  });
  await app.listen(config.get("AEVUM_API_PORT", { infer: true }));
}

void bootstrap();

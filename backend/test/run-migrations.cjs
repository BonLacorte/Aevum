const { runner } = require("node-pg-migrate");

const [databaseUrl, migrationsDirectory] = process.argv.slice(2);

runner({
  databaseUrl,
  dir: migrationsDirectory,
  direction: "up",
  migrationsTable: "pgmigrations",
  migrationsSchema: "public",
}).catch(() => {
  console.error("Migration runner failed.");
  process.exitCode = 1;
});

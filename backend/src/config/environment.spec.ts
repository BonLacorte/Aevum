import { validateEnvironment } from "./environment";

const validEnvironment = {
  DATABASE_URL: "postgres://aevum:aevum_local@localhost:5432/aevum",
};

describe("validateEnvironment", () => {
  it("accepts the committed local example shape", () => {
    expect(validateEnvironment(validEnvironment)).toMatchObject({
      NODE_ENV: "development",
      AEVUM_API_PORT: 8080,
      AEVUM_CORS_ORIGIN: "http://localhost:3000",
      AEVUM_DB_CONNECTION_TIMEOUT_MS: 2000,
    });
  });

  it.each([
    [{}, "DATABASE_URL"],
    [{ DATABASE_URL: "not-a-url" }, "DATABASE_URL"],
    [{ ...validEnvironment, AEVUM_API_PORT: "70000" }, "AEVUM_API_PORT"],
    [{ ...validEnvironment, AEVUM_CORS_ORIGIN: "*" }, "AEVUM_CORS_ORIGIN"],
    [{ ...validEnvironment, AEVUM_DB_CONNECTION_TIMEOUT_MS: "0" }, "AEVUM_DB_CONNECTION_TIMEOUT_MS"],
  ])("rejects invalid configuration", (environment, variable) => {
    expect(() => validateEnvironment(environment)).toThrow(variable);
  });
});

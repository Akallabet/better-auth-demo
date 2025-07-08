import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: `postgres://test:test@localhost:5432/test`,
  }),
});

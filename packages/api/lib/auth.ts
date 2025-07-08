import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  basePath: "/auth",
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
  database: new Pool({
    connectionString: `postgres://test:test@localhost:5432/test`,
  }),
  plugins: [
    magicLink({
      // disableSignUp: true,
      expiresIn: 60 * 60,
      sendMagicLink: async ({ email, url }) => {
        console.log("Sending magic link to:", email);
        console.log("MAGIC LINK", url);

        if (process.env.PLT_ENVIRONMENT === "development") {
          return Promise.resolve();
        }
      },
    }),
  ],
});

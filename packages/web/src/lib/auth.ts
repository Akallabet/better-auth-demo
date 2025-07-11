import { createAuthClient } from "better-auth/react";
import { adminClient, jwtClient,magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [magicLinkClient(), adminClient(), jwtClient()],
});

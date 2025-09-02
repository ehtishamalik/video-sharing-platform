import { createAuthClient } from "better-auth/react";

const url =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const authClient = createAuthClient({
  baseURL: url as string,
});

import { auth } from "@/lib/auth";

export type SessionType = Awaited<ReturnType<typeof auth.api.getSession>>;

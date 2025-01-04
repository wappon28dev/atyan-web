import type { PrismaClient } from "@prisma/client";

export type Env = {
  DB: D1Database;
  AUTH0_ISSUER: string;
  AUTH0_AUDIENCE: string;
};

export type HonoType = {
  Variables: {
    prisma: PrismaClient;
  };
  Bindings: Env;
};

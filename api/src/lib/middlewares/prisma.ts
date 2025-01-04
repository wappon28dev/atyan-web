import type { HonoType } from "../consts";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { createMiddleware } from "hono/factory";

export const prismaInjector = createMiddleware<HonoType>(async (ctx, next) => {
  const adapter = new PrismaD1(ctx.env.DB);
  const prisma = new PrismaClient({ adapter });
  ctx.set("prisma", prisma);

  await next();
});

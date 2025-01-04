import type { HonoType } from "src/lib/consts";
import { Hono } from "hono";
import { prismaInjector } from "src/lib/middlewares/prisma";

export const v1 = new Hono<HonoType>()
  .use(prismaInjector)
  .get("/me", async (ctx) => ctx.json({}, 200));

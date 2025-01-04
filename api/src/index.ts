import type { HonoType } from "./lib/consts";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { v1 } from "./routes/v1";

const app = new Hono<HonoType>()
  .basePath("/api")
  // preflight
  .options("*", cors())
  .get("/", (ctx) => ctx.text("Hello, Hono!", 200))
  .route("/v1", v1);

export default app;
export type AppType = typeof app;

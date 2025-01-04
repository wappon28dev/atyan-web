import { handle } from "hono/cloudflare-pages";
// eslint-disable-next-line no-restricted-imports
import app from "../src/index";

export const onRequest = handle(app);

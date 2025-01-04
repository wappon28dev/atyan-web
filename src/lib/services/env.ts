import { INFO } from "@/lib/consts";
import { envsafe, str, type ValidatorSpec } from "envsafe";

export const ENV = envsafe(
  {
    MICROCMS_SERVICE_DOMAIN: str(),
    MICROCMS_API_KEY: str(),
    PUBLIC_MODE: str({
      devDefault: "development",
      choices: ["development", "preview", "production"],
    }) as ValidatorSpec<"development" | "preview" | "production">,
  },
);

export const mode = {
  development: "dev",
  preview: "preview",
  production: "prod",
} as const satisfies Record<typeof ENV.PUBLIC_MODE, string>;

export const modeOrigin = {
  development: "http://localhost:4321",
  preview: INFO.site.betaUrl,
  production: INFO.site.url,
} as const as Record<typeof ENV.PUBLIC_MODE, string>;

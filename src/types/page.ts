import type { Nullable } from "./utils";

export type PageManifest = {
  seo: {
    title?: Nullable<string>;
    description?: Nullable<string>;
    ogpImage?: Nullable<string>;
  };
};

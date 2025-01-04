import type { SWRHook } from "swr";
import { P } from "ts-pattern";

// pattern for swr
export const S = {
  Error: { error: P.nonNullable },
  Loading: P.union({ data: P.nullish, error: P.nullish, isLoading: false }, { isLoading: true }),
  Validating: { isValidating: true },
  Mutating: { isMutating: true },
  Success: { data: P.nonNullable },
} satisfies Record<string, P.Pattern<SWRHook>>;

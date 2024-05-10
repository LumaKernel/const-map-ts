import type { ConstMapStaticError } from "./types/const-map-static-error.ts";
import { ConstMapNotStringKeyError } from "./errors/not-string-key.ts";
import { ConstMapUndefinedKeyError } from "./errors/undefined-key.ts";
import type { IsConstEntries } from "./types/is-const-entries.ts";
import type { IsUnique } from "./types/is-unique.ts";
import type { MapGet0 } from "./types/map-get0.ts";
import type { EntriesMap } from "./types/entries-map.ts";

export type MakeConstMap<
  Arr extends ReadonlyArray<readonly [string, unknown]>,
> = IsConstEntries<Arr> extends false ? ConstMapStaticError<
    "ConstMap definition must be constant tuple. HINT: Use `as const` keyword?"
  >
  : IsUnique<MapGet0<Arr>> extends false
    ? ConstMapStaticError<"ConstMap definition must have unique keys">
  : () => <
    K extends Arr[number][0],
  >(
    k: K,
    // ) => FromEntries<Arr>[K];
  ) => EntriesMap<Arr, K>;

export const makeConstMap = <
  ConstMapDefinition extends ReadonlyArray<readonly [string, unknown]>,
>(
  arr: ConstMapDefinition,
): MakeConstMap<ConstMapDefinition> => {
  const init = () => {
    const vars = Array.from({ length: arr.length }, (_, i) => "v" + i);
    const map = new Function(
      ...vars,
      "E1",
      "E2",
      `return (k)=>{if(typeof k!=='string')throw new E1();switch(k){${
        arr.map(([k], i) => `case ${JSON.stringify(k)}:return v${i};`).join(
          "",
        )
      }default:throw new E2(k)}}`,
    )(
      ...arr.map(([, v]) => v),
      ConstMapNotStringKeyError,
      ConstMapUndefinedKeyError,
    );
    return map;
  };
  // deno-lint-ignore no-explicit-any
  return init as any;
};

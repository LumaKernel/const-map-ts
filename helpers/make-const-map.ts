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

/**
 * Creates a constant map from a constant entry array.
 * @param definition - A constant entry array.
 * @example
 * ```ts
 * const lookupInteger = makeConstMap(
 *   [
 *     ["one", 1],
 *     ["two", 2],
 *     ["three", 3],
 *   ] as const,
 * )();
 * const v1 = lookupInteger("one"); // Typed as 1
 * const v2 = lookupInteger("two"); // Typed as 2
 * const v3 = lookupInteger("one" as "one" | "three"); // Typed as 1 | 3
 * ```
 */
export const makeConstMap = <
  ConstMapDefinition extends ReadonlyArray<readonly [string, unknown]>,
>(
  definition: ConstMapDefinition,
): MakeConstMap<ConstMapDefinition> => {
  const init = () => {
    const vars = Array.from({ length: definition.length }, (_, i) => "v" + i);
    const map = new Function(
      ...vars,
      "E1",
      "E2",
      `return (k)=>{if(typeof k!=='string')throw new E1();switch(k){${
        definition.map(([k], i) => `case ${JSON.stringify(k)}:return v${i};`)
          .join(
            "",
          )
      }default:throw new E2(k)}}`,
    )(
      ...definition.map(([, v]) => v),
      ConstMapNotStringKeyError,
      ConstMapUndefinedKeyError,
    );
    return map;
  };
  // deno-lint-ignore no-explicit-any
  return init as any;
};

/**
 * Creates a constant map from a constant entry array.
 * This is almost the same as `makeConstMap`, but it allows you to specify the return type of the map.
 * This helps you to get a better completion when editing the values of entries.
 * Note that this should be called immediately after the type parameter supply.
 * @param definition - A constant entry array.
 * @example
 * ```ts
 * const lookupInteger = makeConstMapWithReturnType<'A' | 'B' | 'C'>()(
 *   [
 *     ["one", 'A'],
 *     ["two", 'B'],
 *     ["three", 'C'],
 *   ] as const,
 * )();
 * const v1 = lookupInteger("one"); // Typed as 'A'
 * const v2 = lookupInteger("two"); // Typed as 'B'
 * const v3 = lookupInteger("one" as "one" | "three"); // Typed as 'A' | 'C'
 * ```
 */
export const makeConstMapWithReturnType = <
  R = unknown,
>() =>
<
  ConstMapDefinition extends ReadonlyArray<readonly [string, R]>,
>(
  definition: ConstMapDefinition,
): MakeConstMap<ConstMapDefinition> => {
  return makeConstMap(definition);
};

// deno-lint-ignore-file no-explicit-any

/*
 * Converts a union type to an intersection type.
 * @example
 * type T0 = UnionToIntersection<'a' | 'b'>; // never
 * type T1 = UnionToIntersection<{ a: 1 } | { b: 2 }>; // { a: 1, b: 2 }
 */
type UnionToIntersection<T> =
  (T extends infer U ? (u: U) => void : never) extends (
    v: infer V,
  ) => void ? V
    : never;
// type IndicesWhoHasMe<T, Me> = T extends readonly [infer I, Me] ? I : never;
type IndicesWhoIntersectsWithMe<T, Me> = T extends readonly [infer I, infer V]
  ? (Me & V) extends never ? never : I
  : never;
type ArrToEntries<Arr> = {
  [K in keyof Arr]: [K, Arr[K]];
};
type H3<Arr> = {
  [K in keyof Arr]: [
    ArrToEntries<Arr> extends infer F extends readonly any[]
      ? UnionToIntersection<IndicesWhoIntersectsWithMe<F[number], Arr[K]>>
      : /* Unreachable */ never,
  ];
};
type NeverThenFalseOrNever<T> = T extends [never] ? false : never;
type H4<Arr> = H3<Arr> extends infer F extends readonly any[]
  ? NeverThenFalseOrNever<F[number]>
  : never;

/*
 * Checks if the input array has unique values.
 * Supporting branded types.
 * @example
 * type T0 = IsUnique<[]>; // true
 * type T1 = IsUnique<['a', 'b', 'a']>; // false
 * type T2 = IsUnique<['a', 'b']>; // true
 * type T2 = IsUnique<['a', 'a' & { brand: 'some' }]>; // false
 */
export type IsUnique<Entries> = H4<Entries> extends never ? true : false;

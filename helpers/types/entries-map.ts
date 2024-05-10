type FilterWhoHasMeAsKey<E, Me> = E extends readonly [Me, infer V] ? V : never;
export type EntriesMap<
  Entries extends ReadonlyArray<readonly [string, unknown]>,
  K,
> = FilterWhoHasMeAsKey<
  Entries[number],
  K
>;

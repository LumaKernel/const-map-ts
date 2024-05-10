declare const ORDINAL_BRAND: unique symbol;
const make = <T extends string>(t: T) =>
  t as T & Record<typeof ORDINAL_BRAND, never>;
export const ORDINAL_FIRST = make("first");
export const ORDINAL_SECOND = make("second");
export const ORDINAL_THIRD = make("third");

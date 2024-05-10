declare const TIME_BRAND: unique symbol;
const make = <T extends string>(t: T) =>
  t as T & Record<typeof TIME_BRAND, never>;
export const TIME_HOUR = make("hour");
export const TIME_MINUTE = make("minute");
export const TIME_SECOND = make("second");

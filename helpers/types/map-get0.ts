export type MapGet0<Arr extends ReadonlyArray<readonly [string, unknown]>> = {
  [K in keyof Arr]: Arr[K][0];
};

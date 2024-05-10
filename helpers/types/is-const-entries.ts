// deno-lint-ignore-file no-explicit-any
export type IsConstEntries<
  Arr extends ReadonlyArray<readonly [string, unknown]>,
> = Array<any> extends Arr ? false
  : string extends Arr[number][0] ? false
  : true;

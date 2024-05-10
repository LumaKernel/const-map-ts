import { makeConstMap } from "../mod.ts";

// Assume these branded type definitions are packaged in a specific module
// and are not allowed to be defined elsewhere.
const ONE = "one" as "one" & { NUMBER_BRAND: never };
const TWO = "two" as "two" & { NUMBER_BRAND: never };
const THREE = "three" as "three" & { NUMBER_BRAND: never };

const f = makeConstMap(
  [
    [ONE, 1],
    [TWO, 2],
    [THREE, 3],
  ] as const,
)();

// @ts-expect-error literal 'one' is not branded
f("one");

console.log(f(ONE)); // 1

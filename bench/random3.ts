import { makeConstMap } from "../mod.ts";

const assertEq = (a: unknown, b: unknown) => {
  if (a !== b) {
    throw new Error(`${a} !== ${b}`);
  }
};

const map = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
]);
const lookup = makeConstMap(
  [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ] as const,
)();
const obj = {
  one: 1,
  two: 2,
  three: 3,
} as const;
const switchMap = (key: string) => {
  switch (key) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    default:
      throw new Error(`Key "${key}" not found in the map`);
  }
};

const from = Array.from({ length: 1e6 }).flatMap(() =>
  [["one", 1], ["two", 2], ["three", 3], ["two", 2]] as const
).slice(0, 1e6);

Deno.bench("Map", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(map.get(from[i][0]), from[i][1]);
  }
});

Deno.bench("{obj}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(obj[from[i][0]], from[i][1]);
  }
});

Deno.bench("switch(){}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(switchMap(from[i][0]), from[i][1]);
  }
});

Deno.bench({
  name: "ConstMap",
  baseline: true,
  fn() {
    for (let i = 0; i < 1e6; i++) {
      assertEq(lookup(from[i][0]), from[i][1]);
    }
  },
});

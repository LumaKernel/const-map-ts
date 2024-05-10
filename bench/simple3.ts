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

Deno.bench("Map", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(map.get("one"), 1);
    assertEq(map.get("two"), 2);
    assertEq(map.get("three"), 3);
  }
});

Deno.bench("{obj}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(obj["one"], 1);
    assertEq(obj["two"], 2);
    assertEq(obj["three"], 3);
  }
});

Deno.bench("switch(){}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertEq(switchMap("one"), 1);
    assertEq(switchMap("two"), 2);
    assertEq(switchMap("three"), 3);
  }
});

Deno.bench({
  name: "ConstMap",
  baseline: true,
  fn() {
    for (let i = 0; i < 1e6; i++) {
      assertEq(lookup("one"), 1);
      assertEq(lookup("two"), 2);
      assertEq(lookup("three"), 3);
    }
  },
});

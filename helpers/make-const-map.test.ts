// deno-lint-ignore-file no-explicit-any,ban-ts-comment
import {
  assertEquals,
  assertThrows,
  assertType,
  type IsExact,
} from "../dev_deps.ts";
import { makeConstMap } from "./make-const-map.ts";
import type { ConstMapStaticError } from "./types/const-map-static-error.ts";

Deno.test("makeConstMap: basic case", () => {
  const f = makeConstMap(
    [
      ["one", 1],
      ["two", 2],
      ["three", 3],
      ["__proto__", -100],
      ["constructor", "I am a constructor"],
    ] as const,
  )();

  assertEquals(f("one"), 1);
  assertEquals(f("two"), 2);
  assertEquals(f("three"), 3);
  assertEquals(f("__proto__"), -100);
  assertEquals(f("constructor"), "I am a constructor");

  {
    const t = f("one");
    assertType<IsExact<typeof t, 1>>(true);
  }
  {
    const t = f("two");
    assertType<IsExact<typeof t, 2>>(true);
  }
  {
    const t = f("one" as "one" | "two" | "three");
    assertType<IsExact<typeof t, 1 | 2 | 3>>(true);
  }
  {
    const t = f("__proto__");
    assertType<IsExact<typeof t, -100>>(true);
  }

  // @ts-expect-error
  f("one" as string);

  assertThrows(
    () => f("four" as any),
    Error,
    'Key "four" not found in the map',
  );
});

Deno.test("makeConstMap: branded case", () => {
  const ONE = "one" as "one" & { brand: "NUMBER" };
  const TWO = "two" as "two" & { brand: "NUMBER" };
  const THREE = "three" as "three" & { brand: "NUMBER" };

  const f = makeConstMap(
    [
      [ONE, 1],
      [TWO, 2],
      [THREE, 3],
    ] as const,
  )();

  assertEquals(f(ONE), 1);
  assertEquals(f(TWO), 2);
  assertEquals(f(THREE), 3);

  {
    const t = f(ONE);
    assertType<IsExact<typeof t, 1>>(true);
  }
  {
    const t = f(TWO);
    assertType<IsExact<typeof t, 2>>(true);
  }
  {
    const t = f(ONE as typeof ONE | typeof TWO | typeof THREE);
    assertType<IsExact<typeof t, 1 | 2 | 3>>(true);
  }

  // @ts-expect-error
  f("one");

  // @ts-expect-error
  f("one" as string);

  assertThrows(
    () => f("four" as any),
    Error,
    'Key "four" not found in the map',
  );
});

Deno.test("makeConstMap: empty map", () => {
  const f = makeConstMap(
    [] as const,
  )();

  const v = "never" as never;

  assertThrows(() => f(v), Error, 'Key "never" not found in the map');
});

Deno.test("makeConstMap: static: not unique", () => {
  // @ts-expect-error
  makeConstMap(
    [
      ["one", 1],
      ["one", 1],
    ] as const,
  )();

  // @ts-expect-error
  makeConstMap(
    [
      ["one", 1],
      ["one", 2],
    ] as const,
  )();

  const f = makeConstMap(
    [
      ["one", 1],
      ["one", 2],
    ] as const,
  );
  assertType<
    IsExact<
      typeof f,
      ConstMapStaticError<"ConstMap definition must have unique keys">
    >
  >(true);
});

Deno.test("makeConstMap: static nagative: not const tuple", () => {
  // @ts-expect-error
  makeConstMap(
    [
      ["one", 1],
      ["two", 2],
    ],
  )();

  // @ts-expect-error
  makeConstMap(
    [
      ["one" as string, 1],
      ["two", 2],
    ] as const,
  )();

  // @ts-expect-error
  makeConstMap(
    [
      ["one" as "one" | "two", 1],
      ["two", 2],
    ] as const,
  )();

  const f = makeConstMap(
    [
      ["one", 1],
      ["two", 2],
    ],
  );
  assertType<
    IsExact<
      typeof f,
      ConstMapStaticError<
        "ConstMap definition must be constant tuple. HINT: Use `as const` keyword?"
      >
    >
  >(true);
});

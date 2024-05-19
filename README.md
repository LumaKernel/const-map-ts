# ConstMap

**ConstMap** is a TypeScript library that enables you to define constant mappings from strings to any kind of value in a type-safe way.

## Install (npm)

```sh
npx jsr add @luma/const-map
```

## Install (deno)

```sh
deno add @luma/const-map
```

## Basic Setup

```typescript
import { makeConstMap } from '@luma/const-map';

const lookupInteger = makeConstMap(
  [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ] as const,
)();

console.log(lookupInteger("one")); // 1
```

## Type-happy

ConstMap supports typing such that the return type is the minimal union of the input union.
If the input is a specific key of the map, its value is known at the type level.


```typescript
const k = "one";
const v = lookupInteger(k); // 1
```

If it is known only as one of the inputs, but not which one specifically, then it is typed as the union of all possible returned values.

```typescript
const k = "one" as "one" | "two" | "three";
const v = lookupInteger(k); // 1 | 2 | 3
```

This is done in a minimal way, ensuring that it returns only the minimal union of candidates.

```typescript
const k = "one" as "one" | "two";
const v = lookupInteger(k); // 1 | 2
```

## Why?

You might consider that this can be done in the following ways.

### vs. using object

You can use the object as the mapping to achieve this, but that's done only partially.

```typescript
const myMap = {
  "one": 1,
  "two": 2,
  "three": 3,
} as const;

const v1 = myMap["one"]; // typed as 1
const v2 = myMap["one" as "one" | "two"]; // typed as 1 | 2
```

This seems working well, but there're some corner cases.

**Con: some unregistered keys are lookup-able**

```typescript
const c1 = myMap["toString"]; // typed as () => string
```

**Con: Not foolproof for \_\_proto\_\_**

```typescript
const myMap = {
  "__proto__": 0,
} as const;

const v1 = myMap["__proto__"]; // typed as 0
console.log(v1); // but it's not 0
```

You can bypass this with rewriting with `["__proto__"]: 0`, but the problem is in such cases, it cannot be detected statically.


## vs. using switch statement

You may also come up with just using switch statement to return for each values.

```ts
const myMap = (k: "one" | "two" | "three") => {
  switch (k) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    default:
      throw new Error(`Key "${k}" not found in the map`);
  }
};

const k1 = "one" as "one" | "two" | "three";
const v1 = myMap(k1); // typed as 1 | 2 | 3
console.log(v1); // 1

const v2 = myMap("one"); // typed as 1 | 2 | 3
console.log(v2); // 1
```

This is also the strictly type-safe way, but not type-happy.
In first example (`v1`), the input is only known as one of the input candidates, so it's fine to be typed as `1 | 2 | 3` which is the all posibilities of return value.
In contrast, the second example (`v2`), it's known as the only possibly returned value is `1` but it's still typed as `1 | 2 | 3`.

## Still performant

ConstMap is still performant as fast as other ways, not only that, it's 2x-3x faster.
This is done by the dynamic construction of switch statement.

See more details on [PERFORMANCE](./PERFORMANCE.md)

## Branded Types Support

You can combine ConstMap and the TypeScript technique branded literal types, which's also referred as nominal typing.

```
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
```

## Known limitation

This library cannot detect the confliction of keys which uses the same key as nominal key.

For example,

```ts
// ordinals.ts
export const ORDINAL_FIRST = "first" as "first" & { BRAND: "ordinals" };
export const ORDINAL_SECOND = "second" as "second" & { BRAND: "ordinals" };
export const ORDINAL_THIRD = "third" as "third" & { BRAND: "ordinals" };

// time.ts
const TIME_HOUR = "hour" as "hour" & { BRAND: 'time' };
const TIME_MINUTE = "minute" as "minute" & { BRAND: 'time' };
const TIME_SECOND = "second" as "second" & { BRAND: 'time' };
```

With above defition, and if mixed `ORDINAL_SECOND` and `TIME_SECOND` into one ConstMap as different key, it wouldn't be notified, but cause runtime semantic mismatch as these are indistinguishable for runtime.

Instead, recommended to use unique symbol like following. This is also better because other file cannot create the "same" type in any way.

```ts
// ordinals.ts
declare const ORDINAL_BRAND: unique symbol;
const make = <T extends string>(t: T) =>
  t as T & Record<typeof ORDINAL_BRAND, never>;
export const ORDINAL_FIRST = make("first");
export const ORDINAL_SECOND = make("second");
export const ORDINAL_THIRD = make("third");

// time.ts
declare const TIME_BRAND: unique symbol;
const make = <T extends string>(t: T) =>
  t as T & Record<typeof TIME_BRAND, never>;
export const TIME_HOUR = make("hour");
export const TIME_MINUTE = make("minute");
export const TIME_SECOND = make("second");
```

## License

The codes of this repository is licensed under the [MIT](https://github.com/LumaKernel/const-map-ts?tab=MIT-2-ov-file) and [CC0](https://github.com/LumaKernel/const-map-ts?tab=CC0-1.0-1-ov-file).

## Contribution

Any kind of contribution, using this library, writing articles, creating issues/PRs are welcome.

Please keep deno.json version unchanged when creating the PRs.

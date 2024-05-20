import { makeConstMapWithReturnType } from "../mod.ts";

const lookupInteger = makeConstMapWithReturnType<"A" | "B" | "C">()(
  [
    ["one", "A"],
    ["two", "B"],
    ["three", "C"],
  ] as const,
)();

{
  const k = "one";
  const v = lookupInteger(k); // "A"
  console.log(v);
}
{
  const k = "one" as "one" | "two" | "three";
  const v = lookupInteger(k); // "A" | "B" | "C"
  console.log(v);
}
{
  const k = "one" as "one" | "two";
  const v = lookupInteger(k); // "A" | "B"
  console.log(v);
}

// @ts-expect-error "c" is not a valid value
makeConstMapWithReturnType<"A" | "B" | "C">()(
  [
    ["one", "A"],
    ["two", "B"],
    // @ts-expect-error "c" is not assignable to "A" | "B" | "C"
    ["three", "c"],
  ] as const,
)();

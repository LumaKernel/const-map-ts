import { makeConstMap } from "../mod.ts";

const lookupInteger = makeConstMap(
  [
    ["one", 1],
    ["two", 2],
    ["three", 3],
  ] as const,
)();

console.log(lookupInteger("one")); // 1

{
  const k = "one";
  const v = lookupInteger(k); // 1
  console.log(v);
}
{
  const k = "one" as "one" | "two" | "three";
  const v = lookupInteger(k); // 1 | 2 | 3
  console.log(v);
}
{
  const k = "one" as "one" | "two";
  const v = lookupInteger(k); // 1 | 2
  console.log(v);
}

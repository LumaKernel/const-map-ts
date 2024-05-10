const myMap = {
  "one": 1,
  "two": 2,
  "three": 3,
} as const;

const v1 = myMap["one"]; // typed as 1
const v2 = myMap["one" as "one" | "two"]; // typed as 1 | 2

const c1 = myMap["toString"]; // typed as () => string

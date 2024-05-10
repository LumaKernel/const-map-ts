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

declare const k1: "one" | "two" | "three";
const v1 = myMap(k1); // typed as 1 | 2 | 3
console.log(v1); // 1

const v2 = myMap("one"); // typed as 1 | 2 | 3
console.log(v2); // 1

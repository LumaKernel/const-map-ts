const myMap = {
  "__proto__": 0,
} as const;

const v1 = myMap["__proto__"]; // typed as 0
console.log(v1); // but it's not 0

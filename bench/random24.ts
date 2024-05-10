import { makeConstMap } from "../mod.ts";

const assertUnicodeEq = (a: { unicode: unknown }, b: unknown) => {
  if (a.unicode !== b) {
    throw new Error(`${a.unicode} !== ${b}`);
  }
};

const map = new Map([
  ["alpha", { index: 0, unicode: "α" }],
  ["beta", { index: 1, unicode: "β" }],
  ["gamma", { index: 2, unicode: "γ" }],
  ["delta", { index: 3, unicode: "δ" }],
  ["epsilon", { index: 4, unicode: "ε" }],
  ["zeta", { index: 5, unicode: "ζ" }],
  ["eta", { index: 6, unicode: "η" }],
  ["theta", { index: 7, unicode: "θ" }],
  ["iota", { index: 8, unicode: "ι" }],
  ["kappa", { index: 9, unicode: "κ" }],
  ["lambda", { index: 10, unicode: "λ" }],
  ["mu", { index: 11, unicode: "μ" }],
  ["nu", { index: 12, unicode: "ν" }],
  ["xi", { index: 13, unicode: "ξ" }],
  ["omicron", { index: 14, unicode: "ο" }],
  ["pi", { index: 15, unicode: "π" }],
  ["rho", { index: 16, unicode: "ρ" }],
  ["sigma", { index: 17, unicode: "σ" }],
  ["tau", { index: 18, unicode: "τ" }],
  ["upsilon", { index: 19, unicode: "υ" }],
  ["phi", { index: 20, unicode: "φ" }],
  ["chi", { index: 21, unicode: "χ" }],
  ["psi", { index: 22, unicode: "ψ" }],
  ["omega", { index: 23, unicode: "ω" }],
]);
const lookup = makeConstMap(
  [
    ["alpha", { index: 0, unicode: "α" }],
    ["beta", { index: 1, unicode: "β" }],
    ["gamma", { index: 2, unicode: "γ" }],
    ["delta", { index: 3, unicode: "δ" }],
    ["epsilon", { index: 4, unicode: "ε" }],
    ["zeta", { index: 5, unicode: "ζ" }],
    ["eta", { index: 6, unicode: "η" }],
    ["theta", { index: 7, unicode: "θ" }],
    ["iota", { index: 8, unicode: "ι" }],
    ["kappa", { index: 9, unicode: "κ" }],
    ["lambda", { index: 10, unicode: "λ" }],
    ["mu", { index: 11, unicode: "μ" }],
    ["nu", { index: 12, unicode: "ν" }],
    ["xi", { index: 13, unicode: "ξ" }],
    ["omicron", { index: 14, unicode: "ο" }],
    ["pi", { index: 15, unicode: "π" }],
    ["rho", { index: 16, unicode: "ρ" }],
    ["sigma", { index: 17, unicode: "σ" }],
    ["tau", { index: 18, unicode: "τ" }],
    ["upsilon", { index: 19, unicode: "υ" }],
    ["phi", { index: 20, unicode: "φ" }],
    ["chi", { index: 21, unicode: "χ" }],
    ["psi", { index: 22, unicode: "ψ" }],
    ["omega", { index: 23, unicode: "ω" }],
  ] as const,
)();
const obj = {
  alpha: { index: 0, unicode: "α" },
  beta: { index: 1, unicode: "β" },
  gamma: { index: 2, unicode: "γ" },
  delta: { index: 3, unicode: "δ" },
  epsilon: { index: 4, unicode: "ε" },
  zeta: { index: 5, unicode: "ζ" },
  eta: { index: 6, unicode: "η" },
  theta: { index: 7, unicode: "θ" },
  iota: { index: 8, unicode: "ι" },
  kappa: { index: 9, unicode: "κ" },
  lambda: { index: 10, unicode: "λ" },
  mu: { index: 11, unicode: "μ" },
  nu: { index: 12, unicode: "ν" },
  xi: { index: 13, unicode: "ξ" },
  omicron: { index: 14, unicode: "ο" },
  pi: { index: 15, unicode: "π" },
  rho: { index: 16, unicode: "ρ" },
  sigma: { index: 17, unicode: "σ" },
  tau: { index: 18, unicode: "τ" },
  upsilon: { index: 19, unicode: "υ" },
  phi: { index: 20, unicode: "φ" },
  chi: { index: 21, unicode: "χ" },
  psi: { index: 22, unicode: "ψ" },
  omega: { index: 23, unicode: "ω" },
} as const;
const switchMap = (key: string) => {
  switch (key) {
    case "alpha":
      return { index: 0, unicode: "α" };
    case "beta":
      return { index: 1, unicode: "β" };
    case "gamma":
      return { index: 2, unicode: "γ" };
    case "delta":
      return { index: 3, unicode: "δ" };
    case "epsilon":
      return { index: 4, unicode: "ε" };
    case "zeta":
      return { index: 5, unicode: "ζ" };
    case "eta":
      return { index: 6, unicode: "η" };
    case "theta":
      return { index: 7, unicode: "θ" };
    case "iota":
      return { index: 8, unicode: "ι" };
    case "kappa":
      return { index: 9, unicode: "κ" };
    case "lambda":
      return { index: 10, unicode: "λ" };
    case "mu":
      return { index: 11, unicode: "μ" };
    case "nu":
      return { index: 12, unicode: "ν" };
    case "xi":
      return { index: 13, unicode: "ξ" };
    case "omicron":
      return { index: 14, unicode: "ο" };
    case "pi":
      return { index: 15, unicode: "π" };
    case "rho":
      return { index: 16, unicode: "ρ" };
    case "sigma":
      return { index: 17, unicode: "σ" };
    case "tau":
      return { index: 18, unicode: "τ" };
    case "upsilon":
      return { index: 19, unicode: "υ" };
    case "phi":
      return { index: 20, unicode: "φ" };
    case "chi":
      return { index: 21, unicode: "χ" };
    case "psi":
      return { index: 22, unicode: "ψ" };
    case "omega":
      return { index: 23, unicode: "ω" };
    default:
      throw new Error(`Key "${key}" not found in the map`);
  }
};

const from = Array.from({ length: 1e6 }).flatMap(
  () =>
    [
      ["alpha", "α"],
      ["zeta", "ζ"],
      ["omega", "ω"],
      ["alpha", "α"],
      ["mu", "μ"],
      ["beta", "β"],
      ["epsilon", "ε"],
      ["iota", "ι"],
      ["kappa", "κ"],
      ["gamma", "γ"],
      ["rho", "ρ"],
      ["psi", "ψ"],
      ["omega", "ω"],
      ["alpha", "α"],
      ["sigma", "σ"],
      ["tau", "τ"],
      ["upsilon", "υ"],
      ["nu", "ν"],
      ["delta", "δ"],
      ["theta", "θ"],
      ["eta", "η"],
      ["pi", "π"],
      ["xi", "ξ"],
      ["omicron", "ο"],
    ] as const,
).slice(0, 1e6);

Deno.bench("Map", () => {
  for (let i = 0; i < 1e6; i++) {
    assertUnicodeEq(map.get(from[i][0])!, from[i][1]);
  }
});

Deno.bench("{obj}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertUnicodeEq(obj[from[i][0]], from[i][1]);
  }
});

Deno.bench("switch(){}", () => {
  for (let i = 0; i < 1e6; i++) {
    assertUnicodeEq(switchMap(from[i][0]), from[i][1]);
  }
});

Deno.bench({
  name: "ConstMap",
  baseline: true,
  fn() {
    for (let i = 0; i < 1e6; i++) {
      assertUnicodeEq(lookup(from[i][0]), from[i][1]);
    }
  },
});

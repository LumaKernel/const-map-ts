// deno-lint-ignore-file no-explicit-any
import { assertType } from "../../dev_deps.ts";
import type { IsConstEntries } from "./is-const-entries.ts";

Deno.test({
  name: "IsConstTuple: basic cases",
  fn(): void {
    assertType<
      IsConstEntries<[]>
    >(true);
    assertType<
      IsConstEntries<readonly []>
    >(true);
    assertType<
      IsConstEntries<readonly [["a", 2]]>
    >(true);
    assertType<
      IsConstEntries<readonly [readonly ["a", 2]]>
    >(true);
    assertType<
      IsConstEntries<readonly [["a", string]]>
    >(true);
    assertType<
      IsConstEntries<[string, unknown][]>
    >(false);
    assertType<
      IsConstEntries<readonly [string, unknown][]>
    >(false);
    assertType<
      IsConstEntries<[["a", 2], ["b", 3]]>
    >(true);
    assertType<
      IsConstEntries<[readonly ["a", 2], ["b", 3]]>
    >(true);
    assertType<
      IsConstEntries<readonly [readonly ["a", 2], ["b", 3]]>
    >(true);
    assertType<
      IsConstEntries<[[string, 2], ["b", 3]]>
    >(false);
    assertType<
      IsConstEntries<[[any, 2], ["b", 3]]>
    >(false);
  },
});

Deno.test({
  name: "IsConstTuple: corner cases",
  fn(): void {
    assertType<
      IsConstEntries<[[never, 2], ["b", 3]]>
    >(true);
    assertType<
      IsConstEntries<[["a" | "c", 2], ["b", 3]]>
    >(true);
    assertType<
      IsConstEntries<[["a" & { brand: "a" }, 2]]>
    >(true);
  },
});

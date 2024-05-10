import { assertType } from "../../dev_deps.ts";
import type { IsUnique } from "./is-unique.ts";

Deno.test({
  name: "IsUnique: basic cases",
  fn(): void {
    assertType<IsUnique<[]>>(true);
    assertType<IsUnique<["a"]>>(true);
    assertType<IsUnique<["a", "b"]>>(true);
    assertType<IsUnique<["a", "a"]>>(false);
    assertType<IsUnique<["a" & { brand: "some" }, "a"]>>(false);
    assertType<IsUnique<["a" & { brand: "some" }, "b" & { brand: "some" }]>>(
      true,
    );
    assertType<IsUnique<["a", "a" & { __brand: "some" }]>>(false);
    assertType<IsUnique<readonly ["a", "a"]>>(false);
    assertType<IsUnique<["a", "b", "a"]>>(false);

    assertType<
      IsUnique<["a" & { some_brand: never }, "a" & { other_brand: never }]>
    >(
      false,
    );
  },
});

Deno.test({
  name: "IsUnique: special cases",
  fn(): void {
    assertType<IsUnique<["a", "a" | "b"]>>(false);
    assertType<IsUnique<["a", "b" | "c"]>>(true);
    assertType<IsUnique<[never]>>(true);
    assertType<IsUnique<["a", never]>>(true);
    assertType<IsUnique<[never, never]>>(true);
  },
});

Deno.test({
  name: "IsUnique: unsupported cases",
  ignore: true,
  fn(): void {
    assertType<IsUnique<["a" & { brand: "some" }, "a" & { brand: "other" }]>>(
      // @ts-expect-error TODO: Cannot detect the confliction of branded types whose brand is different with the same key.
      false,
    );
  },
});

import { makeConstMap } from "../../mod.ts";
import { ORDINAL_SECOND } from "./ordinal.ts";
import { TIME_HOUR, TIME_MINUTE, TIME_SECOND } from "./time.ts";

// @ts-expect-error Nominal types with different keys are correctly detected as invalid setup.
makeConstMap(
  [
    [TIME_HOUR, 3600],
    [TIME_MINUTE, 60],
    [TIME_SECOND, 1],
    [ORDINAL_SECOND, "2nd"],
  ] as const,
)();

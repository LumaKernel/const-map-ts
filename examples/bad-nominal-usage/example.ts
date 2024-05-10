import { makeConstMap } from "../../mod.ts";
import { ORDINAl_SECOND } from "./ordinal.ts";
import { TIME_HOUR, TIME_MINUTE, TIME_SECOND } from "./time.ts";

const map = makeConstMap(
  [
    [TIME_HOUR, 3600],
    [TIME_MINUTE, 60],
    [TIME_SECOND, 1],
    [ORDINAl_SECOND, "2nd"],
  ] as const,
)();

const v1 = map(TIME_SECOND);
const v2 = map(ORDINAl_SECOND);

void v1, v2;

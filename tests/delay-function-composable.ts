import { ExecutionComposable } from "../src";
import { DelayFunctionResponse } from "./delay-function";

export type DelayFunctionComposable = ExecutionComposable<
  DelayFunctionResponse,
  [key: string, result?: boolean]
>;

import { describe } from "vitest";
import { delayFunction, onDelayFunctionSuccess } from "../delay-function";
import { specUseExecutionReference } from "./spec/use-execution-reference-spec";
import { usePipelineExecution } from "../../dist";

const dataFn = usePipelineExecution(delayFunction, {
  onSuccess: onDelayFunctionSuccess,
}).get();

describe("composable use-execution-reference", () =>
  specUseExecutionReference(dataFn));

import { describe } from "vitest";
import { specUseExecutionReference } from "./spec/use-execution-reference-spec";
import {
  delayFunction,
  getDelayFunctionStatus,
  getDelayFunctionError,
} from "../delay-function";
import { specUseStatusReference } from "./spec/use-status-reference-spec";
import { usePipelineExecution } from "../../src";

const dataFn = usePipelineExecution(delayFunction).status({
  getResult: (resp) => resp.result,
  getStatus: getDelayFunctionStatus,
  getError: getDelayFunctionError,
});

describe("composable use-status-reference-execution", () =>
  specUseExecutionReference(dataFn));
describe("composable use-status-reference", () =>
  specUseStatusReference(dataFn));

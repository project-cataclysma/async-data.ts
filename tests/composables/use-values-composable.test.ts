import { describe, expect, it } from "vitest";
import {
  DelayFunctionReference,
  DelayFunctionResponse,
  delayFunction,
} from "../delay-function";
import { PipelineWithParameters, usePipelineExecution } from "../../src";

type DelayFunctionArgs = [key: string, result?: boolean];
type DelayFunctionPipeline = PipelineWithParameters<
  DelayFunctionReference,
  DelayFunctionResponse,
  DelayFunctionArgs,
  string,
  [result?: boolean]
>;

const pipeline = usePipelineExecution(delayFunction) as DelayFunctionPipeline;
const dataFn = pipeline.values("test code", false);
describe("injected values", () => {
  it("returns test code and false", async () => {
    const { execute } = dataFn();
    const data = await execute();
    expect(data.key).toEqual("test code");
    expect(data.result).toBeFalsy();
  });
});

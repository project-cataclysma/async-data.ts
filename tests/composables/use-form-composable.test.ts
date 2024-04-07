import { describe, expect, it } from "vitest";
import { delayFunction } from "../delay-function";
import { usePipelineExecution } from "../../dist";

const dataFn = usePipelineExecution(delayFunction).form("test code");

describe("injected value", () => {
  it("returns test code and updated test code", async () => {
    const { execute, form } = dataFn();
    const data = await execute();
    expect(data.key).toEqual("test code");
    form.value = "updated test code";
    const data2 = await execute();
    expect(data2.key).toEqual("updated test code");
  });
});

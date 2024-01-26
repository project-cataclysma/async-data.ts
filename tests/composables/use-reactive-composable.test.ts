import { describe, expect, it } from "vitest";
import { delayFunction } from "../delay-function";
import { usePipelineExecution } from "../../dist";
import { ref } from "vue";

const form = ref("test code");
const dataFn = usePipelineExecution(delayFunction).reactive(form).get();

describe("injected value", () => {
  it("returns test code and updated test code", async () => {
    const { execute } = dataFn();
    const data = await execute();
    expect(data.key).toEqual("test code");
    form.value = "updated test code";
    const data2 = await execute();
    expect(data2.key).toEqual("updated test code");
  });
});

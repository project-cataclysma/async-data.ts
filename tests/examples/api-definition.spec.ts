import { describe, it, expect } from "vitest";
import { ReferenceBuilder } from "../../src/pipe/reference-builder";
import { ExecutionBuilder } from "../../src/pipe/execution-builder";
import { statusReferenceTransformer } from "../../src/references/status-reference-transformer";
import { ExecutionReference } from "../../src/types";

describe("api definition example", () => {
  type DoThingArgs = [name: string, id: number, mode: 'cat1' | 'cat2'];
  type DoThingOut = { code: number, data: string };
  function doThingAsync(
    name: string,
    id: number,
    mode: "cat1" | "cat2",
  ): Promise<DoThingOut> {
    return Promise.resolve({
      data: mode === "cat1" ? `${name}/${id}` : `${name}-${id}`,
      code: Math.max(0, id),
    });
  }
  const doThingPipeline = (new ExecutionBuilder(doThingAsync)).composable<DoThingArgs, []>(e => e).reference().then(
    (r) => statusReferenceTransformer<[], DoThingOut, ExecutionReference<[], DoThingOut>, string>(r, (output) => output.data),
  ).build();

  const api = {
    // TODO, make the following inject the status callbacks and reactivity.
    // doThing: doThingPipeline.status({
    //   getResult: (resp) => resp,
    // }).execute(),
    doThing: doThingPipeline,
  };
  it("can run from the original async function", async () => {
    const user1 = await doThingAsync("user", 1, "cat1");
    const user2 = await doThingAsync("user", 2, "cat2");
    expect(user1.data).toBe("user/1");
    expect(user2.data).toBe("user-2");
  });
  it("can be ran as a pipeline with little modification", async () => {
    // DONE #1, api.doThing() needs to look more like: api.doThing('user', :id, :mode)
    // DONE #2, we need a way to automatically schedule execution so we can remove execution aliasing
    // TODO #3, we need a way to be able to nest pipeline actions. Such as running value, status and execute.
    const { executed: executed1, execute: execute1, result: result1 } = api.doThing(
      "user",
      1,
      "cat1");
    const e1 = execute1();
    const { executed: executed2, execute: execute2, result: result2 } = api.doThing(
      "user",
      2,
      "cat2");
    const e2 = execute2();
    await e1;
    await e2;
    // TODO, let's see if there is a better way we can watch for variable changes
    // Perhaps we create a watch around executed/stage, then compare. Else Fail
    let tries = 0;
    // Code found by Chat GPT. Otherwise I'd give credit to it's owner.
    // I believe it was scrapped from a post on stack overflow by Romalex
    // https://stackoverflow.com/questions/76915177/wait-for-the-nexttick-before-asserting-with-vitest
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    for (let i = 0; i < 3; i++) {
      if (executed1.value && executed2.value) break;
      await delay(100);
    }
    expect(result1.value).toBe("user/1");
    expect(result2.value).toBe("user-2");
  })
});

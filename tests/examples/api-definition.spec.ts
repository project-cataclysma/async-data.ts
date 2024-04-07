import { describe, it, expect } from "vitest";
import { ExecutionBuilder } from "../../src/pipe/execution-builder";
import { statusReferenceTransformer } from "../../src/references/status-reference-transformer";
import { ExecutionReference, StatusReference } from "../../src/types";
import { watchedReferenceTransformer } from "../../src/references/watched-reference-transformer";
import { usePipe } from "../../src/pipe/use-pipe";

/**
 * TODO, improve transformer implementation. Transformer decleration in then-clauses should not require type parameters
 */
describe("api definition example", () => {
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
  const doThingPipeline = usePipe(doThingAsync).composableAll().reference().then(
    (r) => statusReferenceTransformer<[], DoThingOut, ExecutionReference<[], DoThingOut>, string>(r, (output) => output?.data),
  ).then(
    (r) => watchedReferenceTransformer<DoThingOut, StatusReference<[], DoThingOut, ExecutionReference<[], DoThingOut>, string>>(r),
  ).build();

  const api = {
    doThing: doThingPipeline,
  };
  it("can run from the original async function", async () => {
    const user1 = await doThingAsync("user", 1, "cat1");
    const user2 = await doThingAsync("user", 2, "cat2");
    expect(user1.data).toBe("user/1");
    expect(user2.data).toBe("user-2");
  });
  it("can be ran as a pipeline with little modification", async () => {
    const { executed: executed1, result: result1 } = api.doThing(
      "user",
      1,
      "cat1");
    const { executed: executed2, result: result2 } = api.doThing(
      "user",
      2,
      "cat2");
    // TODO, let's see if there is a better way we can watch for variable changes
    // Perhaps we create a watch around executed/stage, then compare. Else Fail
    // Code improved from an example found by Chat GPT. Otherwise I'd give credit to it's owner.
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

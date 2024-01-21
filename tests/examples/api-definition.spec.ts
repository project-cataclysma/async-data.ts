import { describe, it, expect } from "vitest";
import { usePipelineExecution } from "../../dist";

describe("api definition example", () => {
  function doThingAsync(
    name: string,
    id: number,
    mode: "cat1" | "cat2",
  ): Promise<string> {
    return Promise.resolve(mode === "cat1" ? `${name}/${id}` : `${name}-${id}`);
  }
  const doThingPipeline = usePipelineExecution<
    string,
    [name: string, id: number, mode: "cat1" | "cat2"]
  >(doThingAsync);
  const api = {
    // TODO, make the following inject the status callbacks and reactivity.
    // doThing: doThingPipeline.status({
    //   getResult: (resp) => resp,
    // }).execute,
    doThing: doThingPipeline.execute,
  };
  it("can run from the original async function", async () => {
    const user1 = await doThingAsync("user", 1, "cat1");
    const user2 = await doThingAsync("user", 2, "cat2");
    expect(user1).toBe("user/1");
    expect(user2).toBe("user-2");
  });
  it("can be ranas a pipeline with little modification", async () => {
    // DONE #1, api.doThing() needs to look more like: api.doThing('user', :id, :mode)
    // DONE #2, we need a way to automatically schedule execution so we can remove execution aliasing
    // TODO #3, we need a way to be able to nest pipeline actions. Such as running value, status and execute.
    const { response: user1, executing: executing1 } = api.doThing(
      "user",
      1,
      "cat1",
    );
    const { response: user2, executing: executing2 } = api.doThing(
      "user",
      2,
      "cat2",
    );
    // TODO, let's see if there is a better way we can watch for variable changes
    // Perhaps we create a watch around executing/stage, then compare. Else Fail
    let tries = 0;
    // Code found by Chat GPT. Otherwise I'd give credit to it's owner.
    // I believe it was scrapped from a post on stack overflow by Romalex
    // https://stackoverflow.com/questions/76915177/wait-for-the-nexttick-before-asserting-with-vitest
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    while (!(executing1 && executing2) || tries < 3) {
      await delay(100);
      tries++;
    }
    expect(user1.value).toBe("user/1");
    expect(user2.value).toBe("user-2");
  });
});

import { describe, it, expect } from "vitest";
import { usePipe } from "../../src/pipe/use-pipe";

describe.skip("api definition example", () => {
  let id = 0;
  class Post {
    public constructor(
      public message?: string,
      public id: number = 0,
    ) {}
  }
  async function updateModel<T extends Post>(
    ctor: new (message?: string, id?: number) => T,
    data: T,
  ): Promise<T> {
    const model = new ctor(data.message, ++id);
    return Promise.resolve(model);
  }
  const doThingPipeline = usePipe(updateModel);
  // const api = {
  //   doThing: doThingPipeline.form(new Post()),
  // };
  // it("can run from the original async function", async () => {
  //   const post = new Post("posted");
  //   const submit = await updateModel(Post, post);
  //   expect(submit.id).toBeGreaterThan(0);
  // });
  // it("can be ranas a pipeline with little modification", async () => {
  //   const { form, execute: submit } = api.doThing();
  //   form.value = new Post("ayo");
  //   const result1 = await submit();
  //   expect(result1.message).toEqual("ayo");
  // });
});

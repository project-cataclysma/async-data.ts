import { describe, it, expect } from "vitest";
import { usePipe } from "../../src/pipe/use-pipe";

describe.skip("api definition example", () => {
  function submitForm(data: {
    email: string;
    password: string;
  }): Promise<boolean> {
    return Promise.resolve(data.email === data.password);
  }
  const doThingPipeline = usePipe(submitForm);
  const api = {
     //doThing: doThingPipeline.reference().form({ email: "", password: "" }),
  };
  // it("can run from the original async function", async () => {
  //   const submitBad = await submitForm({ email: "a", password: "b" });
  //   const submitSuccess = await submitForm({ email: "a", password: "b" });
  //   expect(submitBad).toBe(false);
  //   expect(submitSuccess).toBe(false);
  // });
  // it("can be ranas a pipeline with little modification", async () => {
  //   const { form, execute: submit } = api.doThing();
  //   expect(await submit()).toBeFalsy();
  //   form.value = { email: "a", password: "b" };
  //   expect(await submit()).toBeFalsy();
  //   form.value = { email: "a", password: "a" };
  //   expect(await submit()).toBeTruthy();
  // });
});

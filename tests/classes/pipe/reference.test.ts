import { describe, expect, it } from "vitest";
import { usePipe } from '../../../src/pipe/use-pipe'
import { watchedReferenceTransformer } from "../../../src";

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = usePipe(asyncMethod);

    it('allows reference creation', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(5, 2, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        // expect(reference.executed.value).toBeTruthy();
    })

    it('allows reference encapsulation', async () => {
        const reference = pipeline.with(exec => () => exec(10, 4, 'apple'), exec => () => exec(10, 4, 'apple')).reference().then(watchedReferenceTransformer).build();

        // TODO, let's see if there is a better way we can watch for variable changes
        // Perhaps we create a watch around executed/stage, then compare. Else Fail
        // Code improved from an example found by Chat GPT. Otherwise I'd give credit to it's owner.
        // I believe it was scrapped from a post on stack overflow by Romalex
        // https://stackoverflow.com/questions/76915177/wait-for-the-nexttick-before-asserting-with-vitest
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
        for (let i = 0; i < 3; i++) {
            if (reference.executed.value) break;
            await delay(100);
        }
        expect(reference.output.value).toBe('apple')
    })
})

import { describe, it, expect } from "vitest";
import { usePipe } from "../../../src/pipe/use-pipe";
import { statusReferenceTransformer } from "../../../src/references/status-reference-transformer";
import { ExecutionReference } from "../../../src/types";

describe('piped composable', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = usePipe(asyncMethod)
        .composable<[a: number, b: number, c: string], [], []>(exec => exec)
        .reference();

    it('allows reference wrapping', async () => {
        const composable = pipeline.build();
        const reference = composable(5, 2, '3');
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute();
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        // expect(reference.executed.value).toBeTruthy();
    })

    it('allows parameter injection', async () => {
        const composable = pipeline.then(
            (r) => statusReferenceTransformer<[], string, ExecutionReference<[], string>, string>(r, (output) => output.toUpperCase()),
        ).build();
        const reference = composable(5, 2, 'apple');
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute();
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('apple')
        expect(reference.result.value).toBe('APPLE')
        // expect(reference.executed.value).toBeTruthy();
    })
})
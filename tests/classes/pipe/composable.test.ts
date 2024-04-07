import { describe, it, expect } from "vitest";
import { ExecutionBuilder } from "../../../src/pipe/execution-builder";
import { usePipe } from "../../../src/pipe/use-pipe";

describe('piped composable', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = usePipe(asyncMethod).composable<[a: number, b: number, c: string], []>(exec => exec);

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
        const composable = pipeline.with((exec) => {
            return (c: string) => exec(10, 4, c)
        }).build();
        const reference = composable();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('19')
        // expect(reference.executed.value).toBeTruthy();
    })
})
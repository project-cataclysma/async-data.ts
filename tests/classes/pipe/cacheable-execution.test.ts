import { describe, expect, it } from "vitest";
import { CacheableExecutionBuilder } from '../../../src'

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string): Promise<string> {
        return Promise.resolve(a > b ? c : 'other');
    }
    async function cacheAsyncMethod(...params: Parameters<typeof asyncMethod>): Promise<string> {
        return Promise.resolve(asyncMethod(params[1], params[0], params[2]));
    }

    const pipeline = (new CacheableExecutionBuilder(asyncMethod, cacheAsyncMethod)).with(
        exec => (b: number, c: string) => exec(5, b, c)
    );

    it('allows reference wrapping', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.forceExecute(2, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        expect(reference.executed.value).toBeTruthy();
    })

    it('allows parameter injection', async () => {
        const reference = pipeline.with((exec) => {
            return (c: string) => exec(1, c)
        }).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.forceExecute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('19')
        expect(reference.executed.value).toBeTruthy();
    })
})
import { describe, expect, it } from "vitest";
import { CacheableExecutionBuilder } from '../../../src'

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string): Promise<string> {
        return Promise.resolve(a > b ? c : 'other');
    }
    /** param 1 at 0..4 results in using the 'cache', 5..param[0] results without using cache, else returns other */
    async function cacheAsyncMethod(...params: Parameters<typeof asyncMethod>): Promise<string|undefined> {
        return params[1] < 5 ? `cached: ${params[2]}` : undefined;
    }

    const pipeline = (new CacheableExecutionBuilder(asyncMethod, cacheAsyncMethod)).with(
        exec => (b: number, c: string) => exec(10, b, c)
    );

    it('allows reference wrapping', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(1, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('cached: 3')
        expect(reference.executed.value).toBeTruthy();
        await reference.forceExecute(1, '19');
        expect(reference.output.value).toBe('19')
    })

    it('allows parameter injection', async () => {
        const reference = pipeline.with((exec) => {
            return (c: string) => exec(2, c)
        }).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('cached: 19')
        expect(reference.executed.value).toBeTruthy();
        await reference.forceExecute('19');
        expect(reference.output.value).toBe('19')
    })

    it('allows reference wrapping and relies on force execution', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(6, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        expect(reference.executed.value).toBeTruthy();
    })

    it('allows parameter injection and relies on force execution', async () => {
        const reference = pipeline.with((exec) => {
            return (c: string) => exec(7, c)
        }).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('19')
        expect(reference.executed.value).toBeTruthy();
    })
})
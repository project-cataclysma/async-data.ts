import { describe, expect, it } from "vitest";
import { usePipe } from '../../../src/pipe/use-pipe'

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = usePipe(asyncMethod);

    it('allows reference wrapping', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(5, 2, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3')
        // expect(reference.executed.value).toBeTruthy();
    })

    it('allows parameter injection', async () => {
        const reference = pipeline.with((exec) => {
            return (c: string) => exec(10, 4, c)
        }).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('19')
        // expect(reference.executed.value).toBeTruthy();
    })
})
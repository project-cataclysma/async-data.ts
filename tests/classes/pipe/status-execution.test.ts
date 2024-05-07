import { describe, expect, it } from "vitest";
import { StatusExecutionBuilder } from '../../../src'
import { ExtensionBuilder } from "../../../src/pipe/extension-builders/extensions-builder";

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string): Promise<string> {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipeline = (new StatusExecutionBuilder(asyncMethod, new ExtensionBuilder({
        builder: () => ({}),
        updater: () => ({}),
    }), {
        getResult(ouput) {
            return ouput.toLowerCase() !== 'other';
        },
    }))
    // .with(
    //     exec => (b: number, c: string) => exec(10, b, c)
    // );

    it('allows reference wrapping', async () => {
        const reference = pipeline.build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute(10, 1, '3');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('3');
        // expect(reference.result.value).toBeTruthy();
    })

    it('allows parameter injection', async () => {
        const reference = pipeline.with(
            (exec) => (c: string) => exec(10, 2, c),
            (exec) => (c: string) => exec(10, 2, c),
        ).build();
        expect(reference.executed.value).toBeFalsy();
        expect(reference.executing.value).toBeFalsy();
        await reference.execute('19');
        expect(reference.executing.value).toBeFalsy();
        expect(reference.output.value).toBe('19');
        // expect(reference.result.value).toBeTruthy();
    })
})

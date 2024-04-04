import { describe, it } from "vitest";
import { usePipe } from '../../../src/pipe/use-pipe'

describe('piped execution', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const pipelineG = usePipe(asyncMethod);
    const pipelineS = pipelineG.with((exec) => {
        return (c: string) => exec(5, 10, c)
    });

    it.skip('allows reference wrapping', () => {

    })

    it.skip('allows parameter injection', () => {

    })
})
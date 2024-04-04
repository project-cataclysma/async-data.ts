import { describe, it } from "vitest";
import { Execution } from "../../../src/pipe/execution";

describe('piped composable', () => {
    async function asyncMethod(a: number, b: number, c: string) {
        return Promise.resolve(a > b ? c : 'other');
    }

    const executionG = new Execution(asyncMethod);
    const executionS = executionG.with((exec) => (b: number, c: string) => exec(1, b, c));
    const pipelineG = executionS.compose();
    const pipelineS = pipelineG.with<[b: number, c: string], []>((exec) => {
        return () => exec(5, '')
    });
    const composable = pipelineG.with2<[b: number, c: string], []>(exec => exec);
    const reference = composable.reference()(2, '');

    it.skip('allows reference wrapping', () => {

    })

    it.skip('allows parameter injection', () => {

    })
})
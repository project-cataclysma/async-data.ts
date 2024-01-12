import { it, expect, vi } from 'vitest';
import { MethodStage } from '../../../src/types/method-stage';
import { DelayFunctionReference } from '../../delay-function';

export function specUseExecutionReference (dataFn: () => DelayFunctionReference) {
    it('is executing until released', () => specTracksExecuting(dataFn));
    it('is executed after excution', () => specTracksExecuted(dataFn));
    it('has stage to simplify execution tracking', () => specTracksExecutionStage(dataFn));
    it('tracks execution time', () => specTracksExecutionLastCompletedTime(dataFn));
    it('has the correct response', () => specTracksExecutionResponse(dataFn));
}

export async function specTracksExecuting(dataFn: () => DelayFunctionReference): Promise<void> {
    const data = dataFn();
    const promise = data.execute('executing');
    expect(data.executing.value, 'returns executing while executing').toBeTruthy();
    await promise;
    expect(data.executing.value, 'returns false once execution is completed').toBeFalsy();
}

export async function specTracksExecuted(dataFn: () => DelayFunctionReference): Promise<void> {
    const data = dataFn();
    const promise = data.execute('executed');
    expect(data.executed.value, 'returns false until after execution has completed').toBeFalsy();
    await promise;
    expect(data.executed.value, 'returns true once execution is completed').toBeTruthy();
}
export async function specTracksExecutionStage(dataFn: () => DelayFunctionReference): Promise<void> {
    const data = dataFn();
    expect(data.stage.value, 'return local if not executing and not executed').toEqual(MethodStage.Local);
    const promise = data.execute('stage');
    expect(data.stage.value, 'return local if executing and not executed').toEqual(MethodStage.Executing);
    await promise;
    expect(data.stage.value, 'return local if not executing and executed').toEqual(MethodStage.Remote);
    data.execute('stage');
    expect(data.stage.value, 'return local if executing and executed').toEqual(MethodStage.Reexecuting);
}

export async function specTracksExecutionLastCompletedTime(dataFn: () => DelayFunctionReference): Promise<void> {
    const data = dataFn();
    const before = new Date();
    await data.execute('last-executed');
    const after = new Date();
    expect(+data.lastExecuted.value, 'timestamp should be newer than execution start time').toBeGreaterThanOrEqual(+before);
    expect(+data.lastExecuted.value, 'timestamp should be older than current time').toBeLessThanOrEqual(+after);
}

export async function specTracksExecutionResponse(dataFn: () => DelayFunctionReference): Promise<void> {
    const data = dataFn();
    const promise = data.execute('response');
    expect(data.response.value, 'returns null until execution is completed').toBeNull();
    expect(promise, 'execution callback returns response').resolves.toEqual({
        key: 'response',
        result: true,
    });
    await promise;
    expect(data.response.value, 'returns the response once execution is completed').toEqual({
        key: 'response',
        result: true,
    })
}
import { it, expect } from 'vitest';
import { ExecutionStatusType } from '../../../src/types/status-type';
import { DelayStatusFunctionComposable } from '../../delay-status-function-composable';

export function specUseStatusReference (dataFn: DelayStatusFunctionComposable) {
    it('extracts results', () => specExtractsResult(dataFn));
    it('extracts status', () => specExtractsStatus(dataFn));
    it('extracts error', () => specExtractsError(dataFn));
}

export async function specExtractsResult(dataFn: DelayStatusFunctionComposable): Promise<void> {
    const data = dataFn();
    expect(data.result.value).toBeNull();
    await data.execute('result');
    expect(data.result.value).toBeTruthy();
}

export async function specExtractsStatus(dataFn: DelayStatusFunctionComposable) {
    const data = dataFn();
    expect(data.status.value).toBeNull();
    await data.execute('errored');
    expect(data.status.value).toEqual({
        type: ExecutionStatusType.Errored,
        code: -8000,
        message: 'error',
    });
    try {
        await data.execute('errored-hard');
    }catch (_) {}
    expect(data.status.value).toEqual({
        type: ExecutionStatusType.Errored,
        code: -8000,
        message: 'error',
    });
    await data.execute('failed');
    expect(data.status.value).toEqual({
        type: ExecutionStatusType.Failed,
        code: 8000,
        message: 'failure',
    });
    await data.execute('success');
    expect(data.status.value).toEqual({
        type: ExecutionStatusType.Successful,
        code: 0,
        message: 'success',
    });
}

export async function specExtractsError(dataFn: DelayStatusFunctionComposable) {
    const data = dataFn();
    expect(data.error.value).toBeNull();
    await data.execute('success');
    expect(data.error.value, 'success to not raise an error').toBeNull();
    await data.execute('errored');
    expect(data.error.value?.message, 'error to appear').toEqual('bad');
    await data.execute('success');
    expect(data.error.value, 'error to be cleared').toBeNull();
    expect(data.execute('errored-hard'), 'hard error to be raised').rejects.toThrow('bad bad');
}
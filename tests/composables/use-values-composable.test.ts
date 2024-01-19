import { describe, expect, it } from 'vitest';
import { delayFunction } from '../delay-function';
import { useExecutionReference, useValuesComposable } from '../../src';

const dataFn = useValuesComposable(useExecutionReference, delayFunction, {}, 'test code', false)
describe('injected values', () => {
    it('returns test code and false', async () => {
        const { execute } = dataFn();
        const data = await execute();
        expect(data.key).toEqual('test code')
        expect(data.result).toBeFalsy()
    })
})
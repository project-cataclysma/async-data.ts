import { describe, expect, it } from 'vitest';
import { delayFunction } from '../delay-function';
import { useExecutionReference, useValuesReference } from '../../src';


describe('injected values', () => {
    it('returns test code and false', async () => {
        const { execute } = useValuesReference(useExecutionReference, delayFunction, 'test code', false);
        const data = await execute();
        expect(data.key).toEqual('test code')
        expect(data.result).toBeFalsy()
    })
})